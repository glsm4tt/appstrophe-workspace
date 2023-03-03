// ***********************************************
// This commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { initializeApp, getApp } from "firebase/app";
import { signInWithEmailAndPassword, connectAuthEmulator, initializeAuth, browserSessionPersistence } from "firebase/auth";
import firebaseConfig from '../../firebase.config.json';


initializeApp(firebaseConfig);
const auth = initializeAuth(getApp(), {
  persistence: browserSessionPersistence,
  popupRedirectResolver: undefined,
})
connectAuthEmulator(auth, 'http://localhost:9099')

//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
 signInWithEmailAndPassword(auth, email, password)
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
