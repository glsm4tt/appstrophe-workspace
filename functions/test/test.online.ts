import * as firebaseConfig from "../firebase.config.json";
import * as firebaseFunctionsTest from "firebase-functions-test"
import * as admin from "firebase-admin";
import { assert } from "chai";
 
process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099"
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080"

const test = firebaseFunctionsTest({projectId: firebaseConfig.projectId}, "./serviceAccountKey.json");

import * as functions from "../src/index";
import { UserMetadata, UserRecord } from "firebase-admin/auth";

const db = admin.firestore();

describe("appstrophe cloud functions api", () => {
    const articleId = "article_1";
    const commentId = "lFWv2p7kheOkCstn8sRE";
    const reactionId = "5cPUb6FzyMjmoanEOvE66zbUxzAK";

    it("should add the author alias, the date to the created comment document and update the commentsCount on the article document when onCommentCreate is called", async () => {

        const expected = {
            author: {
                alias: "@test_user_read",
                id: "Ki3WFGMtnDGTHB0ArzV0XNbNyOt5"
            },
            date: admin.firestore.Timestamp.now(),
            text: "Some comment"
        };

        const wrapped = test.wrap(functions.onCommentCreate);
        await wrapped({data: () => ({text: "Some comment", author:{id: "Ki3WFGMtnDGTHB0ArzV0XNbNyOt5"}})}, {
            params: {
                articleId, 
                commentId
            }
        })
        const commentRef = await db.doc(`articles/${articleId}/comments/${commentId}`).get();
        const comment = commentRef.data();
        assert.deepEqual(comment?.author, expected.author);
        assert.equal(comment?.text, expected.text);
        assert.isBelow(comment?.date.seconds - expected.date.seconds, 5);
        const articleRef = await db.doc(`articles/${articleId}`).get();        
        const commentsRef = await db.collection(`articles/${articleId}/comments`).get();
        const commentsCount = commentsRef.size;
        const article = articleRef.data();
        assert.equal(article?.comments, commentsCount);
    });

    it("should update the commentsCount on the article document when onCommentDelete is called", async () => {
        
        const wrapped = test.wrap(functions.onCommentDelete);
        await wrapped({data: () => {}}, {
            params: {
                articleId, 
                commentId
            }
        });
        const commentsRef = await db.collection(`articles/${articleId}/comments`).get();
        const commentsCount = commentsRef.size;
        const articleRef = await db.doc(`articles/${articleId}`).get();
        const article = articleRef.data();
        assert.equal(article?.comments, commentsCount);
    });

    it("should add the date to the reaction document and update the likesCount of the article document when onArticleLikeCreate is called", async () => {
        
        const expected = {
            date: admin.firestore.Timestamp.now(),
            type: "like"
        };

        const wrapped = test.wrap(functions.onArticleLikeCreate);
        await wrapped({data: () =>({type: "like"})}, {
            params: {
                articleId,
                reactionId
            }
        })
        const docRef = await db.doc(`articles/${articleId}/reactions/${reactionId}`).get();
        const data = docRef.data();
        assert.equal(data?.type, expected.type);
        assert.isBelow(data?.date.seconds - expected.date.seconds, 5);
        const reactionsRef = await db.collection(`articles/${articleId}/reactions`).get();
        const reactionsCount = reactionsRef.size;
        const articleRef = await db.doc(`articles/${articleId}`).get();
        const article = articleRef.data();
        assert.equal(article?.likesCount, reactionsCount);
    });

    it("should add the date to the reaction document and update the likesCount of the comment document when onArticleLikeDelete is called", async () => {
        
        const wrapped = test.wrap(functions.onArticleLikeDelete);
        await wrapped({data: () =>({})}, {
            params: {
                articleId,
                reactionId
            }
        })
        const reactionsRef = await db.collection(`articles/${articleId}/reactions`).get();
        const reactionsCount = reactionsRef.size;
        const articleRef = await db.doc(`articles/${articleId}`).get();
        const article = articleRef.data();
        assert.equal(article?.likesCount, reactionsCount);
    });

    it("should add the date to the reaction document and update the likesCount of the comment document when onCommentLikeCreate is called", async () => {
        
        const expected = {
            date: admin.firestore.Timestamp.now(),
            type: "like"
        };

        const wrapped = test.wrap(functions.onCommentLikeCreate);
        await wrapped({data: () =>({type: "like"})}, {
            params: {
                articleId, 
                commentId,
                reactionId
            }
        })
        const docRef = await db.doc(`articles/${articleId}/comments/${commentId}/reactions/${reactionId}`).get();
        const data = docRef.data();
        assert.equal(data?.type, expected.type);
        assert.isBelow(data?.date.seconds - expected.date.seconds, 5);
        const reactionsRef = await db.collection(`articles/${articleId}/comments/${commentId}/reactions`).get();
        const reactionsCount = reactionsRef.size;
        const commentRef = await db.doc(`articles/${articleId}/comments/${commentId}`).get();
        const comment = commentRef.data();
        assert.equal(comment?.likesCount, reactionsCount);
    });

    it("should add the date to the reaction document and update the likesCount of the comment document when onCommentLikeDelete is called", async () => {
        
        const wrapped = test.wrap(functions.onCommentLikeDelete);
        await wrapped({data: () =>({})}, {
            params: {
                articleId, 
                commentId,
                reactionId
            }
        })
        const commentRef = await db.doc(`articles/${articleId}/comments/${commentId}`).get();
        const comment = commentRef.data();
        const reactionsRef = await db.collection(`articles/${articleId}/comments/${commentId}/reactions`).get();
        const reactionsCount = reactionsRef.size;
        assert.equal(comment?.likesCount, reactionsCount);
    });

    it("should delete the user firestore document when the auth user is deleted", async () => {
        const userRecord: UserRecord = {
            uid: "Ki3WFGMtnDGTHB0ArzV0XNbNyOt5",
            emailVerified: false,
            disabled: false,
            metadata: {} as UserMetadata,
            providerData: [],
            toJSON: function (): object {
                throw new Error("Function not implemented.");
            }
        }
        
        let userRef = await db.doc(`users/${userRecord.uid}`).get();

        assert.equal(userRef?.id, userRecord.uid);
        
        const wrapped = test.wrap(functions.onUserDeleted);
        await wrapped(userRef);
        userRef = await db.doc(`user/${userRecord.uid}`).get();
        assert.isFalse(userRef.exists);
    });

    it("should add a view on the concerned article when view is called", async () => {
        let docRef = await db.doc(`articles/${articleId}`).get();
        const expected = {
            ...docRef.data(),
            views: 1
        };
        const wrapped = test.wrap(functions.view);
        await wrapped({articleId})
        docRef = await db.doc(`articles/${articleId}`).get();
        const data = docRef.data();
        assert.deepEqual(data, expected);
    });
});