// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// **********************

import { initializeApp, getApp } from "firebase/app";
import { signInWithEmailAndPassword, getAuth, connectAuthEmulator, initializeAuth, signOut, browserLocalPersistence, browserPopupRedirectResolver, } from "firebase/auth";
import firebaseConfig from '../../firebase.config.json';

initializeApp(firebaseConfig);
const auth = initializeAuth(getApp(), {
  persistence: browserLocalPersistence,
  popupRedirectResolver: browserPopupRedirectResolver,
})
connectAuthEmulator(auth, 'http://localhost:9099')

//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password, redirectPath = '/') => {
  signInProgrammatically({ email, password });

  cy.visit(redirectPath);
});

function signInProgrammatically({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const auth = getAuth();

  const signIn = signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return cy.wrap(signIn);
};

Cypress.Commands.add('logout', () =>
  signOut(auth)
)
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
