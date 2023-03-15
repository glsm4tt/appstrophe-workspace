import { logger, firestore, EventContext, auth, https } from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import * as admin from "firebase-admin";

initializeApp();

const db = admin.firestore();

export const view = https.onCall(async (data, context) => {
    logger.info(`-- Function called with data: ${data} --`);
    logger.info(`-- Function called with context: ${context} --`);
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
        logger.info(`-- Function called with snap: ${snap.data} --`, { structuredData: true });
        logger.info(`-- Function called with context: ${context.auth} --`, { structuredData: true });

        try {
            await db.doc(`articles/${context.params.articleId}/comments/${context.params.commentId}`).update({
                author: {
                    alias: "@test_user_read",
                    id: context.auth?.uid ?? ""
                },
                date: admin.firestore.Timestamp.now()
            });
        } catch (err) {
            logger.error(`An error occured: ${err}`, { structuredData: true });
        }
    });

export const onCommentLikeCreate = firestore
    .document("articles/{articleId}/comments/{commentId}/reactions/{reactionId}")
    .onCreate(async (snap, context: EventContext<{ articleId: string, commentId: string, reactionId: string }>) => {
        logger.info(`-- Function called with snap: ${snap.data} --`, { structuredData: true });
        logger.info(`-- Function called with context: ${context.auth} --`, { structuredData: true });

        try {
            await db.doc(`articles/${context.params.articleId}/comments/${context.params.commentId}/reactions/${context.params.reactionId}`).update({
                date: admin.firestore.Timestamp.now()
            });
        } catch (err) {
            logger.error(`An error occured: ${err}`, { structuredData: true });
        }
    });

export const onUserDeleted = auth.user().onDelete(async user => {
    logger.info(`-- Function called with user: ${user} --`, { structuredData: true });

    try {
        await db.doc(`users/${user.uid}`).delete();
    } catch (err) {
        logger.error(`An error occured: ${err}`, { structuredData: true });
    }
})
