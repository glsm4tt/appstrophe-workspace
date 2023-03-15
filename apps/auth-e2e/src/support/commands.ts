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
import { signInWithEmailAndPassword, getAuth, connectAuthEmulator, initializeAuth, browserSessionPersistence } from "firebase/auth";
import firebaseConfig from '../../firebase.config.json';


initializeApp(firebaseConfig);
const auth = initializeAuth(getApp(), {
  persistence: browserSessionPersistence,
  popupRedirectResolver: undefined,
})
connectAuthEmulator(auth, 'http://localhost:9099')

//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password, redirectPath = '/') => {
  cy.session([email, password],
    () => {
      signInProgrammatically({email, password});
    }
  );

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
  )
  .catch((e) => {
    cy.log(`User could not sign in programmatically!`);
    console.error(e);
  });

  return cy.wrap(signIn);
};

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
