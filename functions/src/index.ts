import { logger, firestore, EventContext } from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import * as admin from "firebase-admin";

initializeApp();

const db = admin.firestore();
/*
export const changeCommentReactionStatus = https.onCall(async (data, context) => {
    logger.info(`-- Function called with data: ${data} --`, {structuredData: true});
    logger.info(`-- Function called with context: ${context} --`, {structuredData: true});
    try {
     //   if(!context.auth) throw new https.HttpsError("unauthenticated", "You have to be logged in to perform this request")
        const comment = await db.doc(`articles/${data.articleId}/comments/${data.commentId}`).get();
        if(comment.exists) {
            const like = await db.doc(`articles/${data.articleId}/comments/${data.commentId}/likes/${context.auth?.uid}`).get();
            if(like.exists) {
                await db.doc(`articles/${data.articleId}/comments/${data.commentId}/likes/${context.auth?.uid}`).delete();
                logger.info(`Reaction "articles/${data.articleId}/comments/${data.commentId}/likes/${context.auth?.uid}" successfully removed`, {structuredData: true});
            }
            else {
                await db.doc(`articles/${data.articleId}/comments/${data.commentId}/likes/${context.auth?.uid}`).set({date: admin.firestore.Timestamp.now()});
                logger.info(`Reaction "articles/${data.articleId}/comments/${data.commentId}/likes/${context.auth?.uid}" successfully added`, {structuredData: true});
            }
        } else {
            throw new https.HttpsError("not-found", `The comment ${data.commentId} does not exist`);
        }
    } catch(err) {
        logger.error(`${err}`, {structuredData: true})
        throw err;
    }
});*/

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
