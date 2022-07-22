
import {
    getTitle,
    getInputEmail,
    getInputPassword,
    getSubmit,
    getPasswordRetrieveLink,
    getRegisterLinkContainer,
    getRegisterLink
} from '../support/login.po';

describe('auth/login', () => {
    beforeEach(() => cy.visit('/auth/login'));

    it('should display the login page', () => {
        // the page should have the title 'Login Page'
        getTitle().should('be.visible').contains('Sign in');

        // the page should have the input text 'email' visible and empty
        getInputEmail().should('have.value', '');

        // the page should have the input text 'password' visible and empty
        getInputPassword().should('have.value', '');

        // the page should have the submit button visible and disabled 
        getSubmit().should('be.visible').should('be.disabled').contains('Sign in');
    });

    it('should have a form input email required and email validation', () => {
        const dummyPassword = '123';
        const notAnEmail = '123';
        const validEmail = 'test@test.abc';

        // Fill the password input so the password part validation is ok
        // and we can focus on the email input behaviour
        getInputPassword().type(dummyPassword);

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

    it('should have a form input password required validation', () => {
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
        getSubmit().should('not.be.disabled');
    });

    it('should have a forgot password link that redirect to the password-retrieve page', () => {
        // The page should have a password retrieve link
        getPasswordRetrieveLink().contains('Forgot password?');

        // click on the password retrieve link
        getPasswordRetrieveLink().click()

        // the url should now be the password retrieve page url: <root>/auth/password-retrieve
        cy.url().should('include', '/auth/password-retrieve')
    });

    it('should have a register link that redirect to the register page', () => {
        // The page should have a register link area
        getRegisterLinkContainer().contains('New to this blog? Create an account')
            .get('[data-cy="register-link"]').contains('Create an account')

        // click on the register link
        getRegisterLink().click()

        // the url should now be the register page url: <root>/auth/register
        cy.url().should('include', '/auth/register')
    });
});