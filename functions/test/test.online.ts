import * as firebaseConfig from "../firebase.config.json";
import * as firebaseFunctionsTest from "firebase-functions-test"
import * as admin from "firebase-admin";
import { assert } from "chai";
 
process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099"
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080"

const test = firebaseFunctionsTest({projectId: firebaseConfig.projectId}, "./serviceAccountKey.json");

import * as functions from "../src/index";

const db = admin.firestore();

describe("appstrophe cloud functions api", () => {
    const articleId = "article_1";
    const commentId = "lFWv2p7kheOkCstn8sRE";

    it("should add the author and the date to the comment when onCommentCreate is called", async () => {
        
        const expected = {
            author: {
                alias: "@test_user_read",
                id: "Ki3WFGMtnDGTHB0ArzV0XNbNyOt5"
            },
            date: admin.firestore.Timestamp.now(),
            text: "Some comment"
        };

        const wrapped = test.wrap(functions.onCommentCreate);
        await wrapped({text: "Some random text"}, {
            auth: {
                uid: "Ki3WFGMtnDGTHB0ArzV0XNbNyOt5"
            },
            params: {
                articleId, 
                commentId
            }
        })
        const docRef = await db.doc(`articles/${articleId}/comments/${commentId}`).get();
        const data = docRef.data();
        assert.deepEqual(data?.author, expected.author);
        assert.equal(data?.text, expected.text);
        assert.isBelow(data?.date.seconds - expected.date.seconds, 5);
    })
});