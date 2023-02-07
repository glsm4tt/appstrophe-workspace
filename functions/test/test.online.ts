import * as firebaseConfig from '../firebase.config.json';
import * as firebaseFunctionsTest from 'firebase-functions-test'
import * as admin from 'firebase-admin';
import { assert } from 'chai';
 
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099'
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'

const test = firebaseFunctionsTest({projectId: firebaseConfig.projectId}, './serviceAccountKey.json');

import * as functions from '../src/index';

const db = admin.firestore();

describe('test', () => {
    const articleId = 'jlsyC5aJvhSdrKm0Yqxe';
    const commentId = 'CtCwOlzckDTI0oMtHclg';

    it('test onCommentCreate function', async () => {
        
        const expected = {
            author: {
              firstname: "bob",
              id: "",
              name: "Smith",
              photoUrl: ""
            },
            date: admin.firestore.Timestamp.now(),
            text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
        };

        const wrapped = test.wrap(functions.onCommentCreate);
        await wrapped({text: 'Some random text'}, {
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
