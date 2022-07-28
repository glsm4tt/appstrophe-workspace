// ***********************************************
// This error-handler.ts is here to deal with 
// the uncaught errors or exceptions from the
// tests
//
// You can read more here:
// https://docs.cypress.io/guides/references/error-messages#Uncaught-exceptions-from-your-application
// ***********************************************

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    if (err.message.includes('Cannot use \'import.meta\' outside a module')) {
        return false
      }
  })