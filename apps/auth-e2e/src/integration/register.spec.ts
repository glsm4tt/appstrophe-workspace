
import {
    getTitle,
    getInputEmail,
    getInputPassword,
    getInputPasswordConfirm,
    getSubmit
} from '../support/register.po';

describe('auth/register', () => {
    beforeEach(() => cy.visit('/auth/register'));

    it('should display the register page', () => {
        // the page should have the title 'Register Page'
        getTitle().should('be.visible').contains('Register');

        // the page should have the input text 'email' visible and empty
        getInputEmail().should('have.value', '');

        // the page should have the input text 'password' visible and empty
        getInputPassword().should('have.value', '');

        // the page should have the input text 'password confirm' visible and empty
        getInputPasswordConfirm().should('have.value', '');

        // the page should have the submit button visible and disabled 
        getSubmit().should('be.visible').should('be.disabled').contains('Register');
    });

    it('should have a form input email required and email validation', () => {
        const dummyPassword = '123';
        const notAnEmail = '123';
        const validEmail = 'test@test.abc';

        // Fill both the password input and the password confirm input so the password validation part is ok
        // and we can focus on the email input behaviour
        getInputPassword().type(dummyPassword);
        getInputPasswordConfirm().type(dummyPassword);

        // the page should have the input text 'email' visible and empty
        getInputEmail().should('have.value', '');

        // the page should have the submit button and disabled 
        getSubmit().should('be.disabled');

        // Fill the email input with an invalid email
        getInputEmail().type(notAnEmail);

        // the submit button should still be disabled 
        getSubmit().should('be.disabled');

        // Fill the email input with a valid email
        getInputEmail().type(validEmail);

        // the submit button should not be disabled 
        getSubmit().should('not.be.disabled');
    });

    it('should have a form input password and a form input paswword confirmation both required for validation', () => {
        const dummyPassword = '123';
        const validEmail = 'test@test.abc';

        // Fill the email input so the email part validation is ok
        // and we can focus on the password input behaviour
        getInputEmail().type(validEmail);

        // the page should have the input text 'password' visible and empty
        getInputPassword().should('have.value', '');

        // the page should have the submit button and disabled 
        getSubmit().should('be.disabled');

        // Fill the password input with a dummy password
        getInputPassword().type(dummyPassword);

        // the submit button should not be disabled 
        getSubmit().should('be.disabled');

        // Fill the password confirmation input with a dummy password
        getInputPasswordConfirm().type(dummyPassword);

        // the submit button should not be disabled 
        getSubmit().should('not.be.disabled');
    });
});