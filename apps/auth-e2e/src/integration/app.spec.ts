Cypress.on('uuncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log('here', err)
  return false
})

describe('auth', () => {
  beforeEach(() => cy.visit('/'));

  it('should redirect to the login page', () => {
    // the url should be the login page url: <root>/auth/login
    cy.url().should('include', '/auth/login')
  });
});
