import { logger, firestore, EventContext, auth, https } from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import * as admin from "firebase-admin";
import { DocumentData, DocumentSnapshot } from "firebase-admin/firestore";

export interface AppStropher {
    alias: string
}

initializeApp();

const db = admin.firestore();

export const view = https.onCall(async (data) => {
    logger.info(`-- Function called with articleId: ${data.articleId} --`);
    try {
        const article = await db.doc(`articles/${data.articleId}`).get();
        if (article.exists) {
            return db.doc(`articles/${data.articleId}`).update({ views: (article.data()?.views ?? 0) + 1 })
        } else {
            throw new https.HttpsError("not-found", `The article ${data.articleId} does not exist`);
        }
    } catch (err) {
        logger.error(`${err}`)
        throw err;
    }
});

export const onCommentCreate = firestore
    .document("articles/{articleId}/comments/{commentId}")
    .onCreate(async (snap, context: EventContext<{ articleId: string, commentId: string }>) => {
        const comment = snap.data()
        logger.info(`-- Function called with snap: ${JSON.stringify(comment)} --`);
        logger.info(`-- Function called with context: ${JSON.stringify(context)} --`);

        try {
            const authorRef: DocumentSnapshot<DocumentData> = await db.doc(`users/${comment.author?.id}`).get();
            const author = authorRef.data() as AppStropher
            await db.doc(`articles/${context.params.articleId}/comments/${context.params.commentId}`).update({
                author: {
                    id: authorRef.id,
                    alias: author.alias
                },
                date: admin.firestore.Timestamp.now()
            });
        } catch (err) {
            logger.error(`An error occured: ${err}`);
        }
    });

export const onCommentLikeCreate = firestore
    .document("articles/{articleId}/comments/{commentId}/reactions/{reactionId}")
    .onCreate(async (snap, context: EventContext<{ articleId: string, commentId: string, reactionId: string }>) => {
        logger.info(`-- Function called with snap: ${JSON.stringify(snap.data())} --`);
        logger.info(`-- Function called with context: ${JSON.stringify(context)} --`);

        try {
            await db.doc(`articles/${context.params.articleId}/comments/${context.params.commentId}/reactions/${context.params.reactionId}`).update({
                date: admin.firestore.Timestamp.now()
            });
        } catch (err) {
            logger.error(`An error occured: ${err}`);
        }
    });

export const onUserDeleted = auth.user().onDelete(async user => {
    logger.info(`-- Function called with user: ${JSON.stringify(user)} --`);

    try {
        await db.doc(`users/${user.uid}`).delete();
    } catch (err) {
        logger.error(`An error occured: ${err}`);
    }
})
