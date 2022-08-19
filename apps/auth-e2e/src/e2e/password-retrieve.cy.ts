import {
  getTitle,
  getInputEmail,
  getSubmit,
} from '../support/password-retrieve.po';

describe('auth/password-retrieve', () => {
  beforeEach(() => cy.visit('/auth/password-retrieve'));

  it('should display the password-retrieve page', () => {
    // the page should have the title 'Reset your password'
    getTitle().should('be.visible').contains('Reset your password');

    // the page should have the input text 'email' visible and empty
    getInputEmail().should('have.value', '');

    // the page should have the submit button visible and disabled
    getSubmit()
      .should('be.visible')
      .should('be.disabled')
      .contains('Send the password reset email');
  });

  it('should have a form input email required and email validation', () => {
    const notAnEmail = '123';
    const validEmail = 'test@test.abc';

    // the page should have the input text 'email' visible and empty
    getInputEmail().should('have.value', '');

    // the page should have the submit button disabled
    getSubmit().should('be.disabled');

    // Fill the email input with a valid email
    getInputEmail().type(notAnEmail);

    // the page should still have the submit button disabled
    getSubmit().should('be.disabled');

    // Fill the email input with a valid email
    getInputEmail().type(validEmail);

    // the submit button should not be disabled
    getSubmit().should('not.be.disabled');
  });
});
