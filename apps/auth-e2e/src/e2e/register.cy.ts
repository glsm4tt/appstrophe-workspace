import {
  getTitle,
  getInputEmail,
  getInputPassword,
  getInputPasswordConfirm,
  getInputTermsAndConditions,
  getSubmit,
  getInputAlias,
  getToaster,
  getTermsAndConditionsFileLink,
} from '../support/register.po';

describe('auth/register', () => {
  beforeEach(() => cy.visit('/auth/register'));

  it('should display the register page', () => {
    // the page should have the title 'Register Page'
    getTitle().should('be.visible').contains('Register');

    // the page should have the input text 'email' visible and empty
    getInputEmail().should('have.value', '');

    // the page should have the input text 'alias' visible and empty
    getInputAlias().should('have.value', '');

    // the page should have the input text 'password' visible and empty
    getInputPassword().should('have.value', '');

    // the page should have the input text 'password confirm' visible and empty
    getInputPasswordConfirm().should('have.value', '');

    // the page should have the submit button visible and disabled
    getSubmit().should('be.visible').should('be.disabled').contains('Register');
  });

  it('should have a form input email required and email validation', () => {
    const dummyPassword = '123456';
    const validAlias = 'test_alias';
    const notAnEmail = '123';
    const validEmail = 'test@test.abc';

    // Fill inputs so every parts of the form but the email are ok
    // so we can focus on this particular behaviour
    getInputPassword().type(dummyPassword);
    getInputPasswordConfirm().type(dummyPassword);
    getInputAlias().type(validAlias);
    getInputTermsAndConditions().check();

    // the page should have the input text 'email' visible and empty
    getInputEmail().should('have.value', '');

    // the input is described by a text
    getInputEmail().should('have.attr', 'aria-describedby').then(
      id => cy.get(`#${id}`)
        .should('be.visible')
        .should('have.text', 'We\'ll never share your email with anyone else.')
        .should('have.css', 'color', 'rgb(75, 85, 99)')
    )

    // the page should have the submit button visible and disabled
    getSubmit().should('be.disabled');

    // Fill the email input with nothing
    getInputEmail().clear().blur();

    // the submit button should still be disabled
    getSubmit().should('be.disabled');

    // An error indication should be displayed
    getInputEmail().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('be.visible')
          .should('have.text', 'This field is required')
          .should('have.css', 'color', 'rgb(249, 115, 22)')
      })

    // Fill the email input with an invalid email
    getInputEmail().clear().type(notAnEmail);

    // the submit button should still be disabled
    getSubmit().should('be.disabled');

    // An error indication should be displayed
    getInputEmail().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('be.visible')
          .should('have.text', 'This is not a valid email address')
          .should('have.css', 'color', 'rgb(249, 115, 22)')
      })

    // Fill the email input with a valid email
    getInputEmail().clear().type(validEmail);

    // None error indication should be displayed
    getInputEmail().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('not.exist')
      })

    // the submit button should not be disabled
    getSubmit().should('not.be.disabled');
  });

  it('should have a form input alias required unique for validation', () => {
    const dummyPassword = '123456';
    const validEmail = 'test@test.abc';
    const notValidAlias = '@"alias';
    const alreadyTakenAlias = 'test_user_read';
    const wayTooLongAlias = 'test_user_really_way_too_long_alias';
    const validAlias = 'test_alias';

    // Fill inputs so every parts of the form but the alias are ok
    // so we can focus on this particular behaviour
    getInputEmail().type(validEmail);
    getInputPassword().type(dummyPassword);
    getInputPasswordConfirm().type(dummyPassword);
    getInputTermsAndConditions().check();

    // the page should have the input text 'alias' visible and empty
    getInputAlias().should('have.value', '');

    // the input is described by a text
    getInputAlias().should('have.attr', 'aria-describedby').then(
      id => cy.get(`#${id}`)
        .should('be.visible')
        .should('have.text', 'This will be your alias in appstrophe. Alias are unique and cannot be changed.')
        .should('have.css', 'color', 'rgb(75, 85, 99)')
    )

    // the page should have the submit button visible and disabled
    getSubmit().should('be.disabled');

    // Fill the alias input with nothing
    getInputAlias().clear().blur();

    // An error indication should be displayed
    getInputAlias().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('be.visible')
          .should('have.text', 'This field is required')
          .should('have.css', 'color', 'rgb(249, 115, 22)')
      })

    // the submit button should be disabled
    getSubmit().should('be.disabled');

    // Fill the alias input with some not valid characters
    getInputAlias().clear().type(notValidAlias);

    // An error indication should be displayed
    getInputAlias().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('be.visible')
          .should('have.text', 'Alias must contains only numbers or lowercase letters')
          .should('have.css', 'color', 'rgb(249, 115, 22)')
      })

    // the submit button should be disabled
    getSubmit().should('be.disabled');

    // Fill the alias input with some not valid characters
    getInputAlias().clear().type(alreadyTakenAlias);

    // An error indication should be displayed
    getInputAlias().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('be.visible')
          .should('have.text', 'Sorry, this alias has already been taken')
          .should('have.css', 'color', 'rgb(249, 115, 22)')
      })

    // the submit button should be disabled
    getSubmit().should('be.disabled');

    // Fill the alias input with a too many characters alias
    getInputAlias().clear().type(wayTooLongAlias);

    // An error indication should be displayed
    getInputAlias().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('be.visible')
          .should('have.text', 'Alias must not exceed 18 characters')
          .should('have.css', 'color', 'rgb(249, 115, 22)')
      })

    // the submit button should be disabled
    getSubmit().should('be.disabled');

    // Fill the alias input with a valid alias
    getInputAlias().clear().type(validAlias);

    // An error indication should be displayed
    getInputAlias().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('not.exist')
      })

    // the submit button should be disabled
    getSubmit().should('not.be.disabled');

  });

  it('should have a form input password and a form input pasword confirmation both required for validation', () => {
    const tooShortPassword = '123';
    const dummyPassword = '123456';
    const validEmail = 'test@test.abc';
    const validAlias = 'test_alias';

    // Fill inputs so every parts of the form but the passwords are ok
    // so we can focus on this particular behaviour
    getInputEmail().type(validEmail);
    getInputAlias().type(validAlias);
    getInputTermsAndConditions().check();

    // the page should have the input text 'password' visible and empty
    getInputPassword().should('have.value', '');

    // the input is described by a text
    getInputPassword().should('have.attr', 'aria-describedby').then(
      id => cy.get(`#${id}`)
        .should('be.visible')
        .should('have.text', 'Make a strong password for better security.')
        .should('have.css', 'color', 'rgb(75, 85, 99)')
    )

    // the page should have the submit button visible and disabled
    getSubmit().should('be.disabled');

    // Fill the password input with nothing
    getInputPassword().clear().blur();

    // the page should have the submit button visible and disabled
    getSubmit().should('be.disabled');

    // An error indication should be displayed
    getInputPassword().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('be.visible')
          .should('have.text', 'This field is required')
          .should('have.css', 'color', 'rgb(249, 115, 22)')
      })

    // Fill the password input with a too short password
    getInputPassword().clear().type(tooShortPassword);

    // the page should have the submit button visible and disabled
    getSubmit().should('be.disabled');

    // An error indication should be displayed
    getInputPassword().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('be.visible')
          .should('have.text', 'Password must have at least 6 characters')
          .should('have.css', 'color', 'rgb(249, 115, 22)')
      })

    // Fill the password input with a dummy password
    getInputPassword().clear().type(dummyPassword);

    // the submit button should be disabled
    getSubmit().should('be.disabled');

    // Fill the password confirmation input with another password
    getInputPasswordConfirm().clear().type(tooShortPassword).blur();

    // the submit button should be disabled
    getSubmit().should('be.disabled');

    // An error indication should be displayed
    getInputPasswordConfirm().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('be.visible')
          .should('have.text', 'Password and confirmation does not match')
          .should('have.css', 'color', 'rgb(249, 115, 22)')
      })

    // Fill the password confirmation input with a dummy password
    getInputPasswordConfirm().clear().type(dummyPassword);

    // the submit button should not be disabled
    getSubmit().should('not.be.disabled');
  });

  it('should have a required form input checkbox for the terms and conditions', () => {
    const dummyPassword = '123456';
    const validEmail = 'test@test.abc';
    const validAlias = 'test_alias';

    // Fill inputs so every parts of the form but the passwords are ok
    // so we can focus on this particular behaviour
    getInputEmail().type(validEmail);
    getInputAlias().type(validAlias);
    getInputPassword().type(dummyPassword);
    getInputPasswordConfirm().type(dummyPassword);

    // the page should have the input text 'terms and conditions' visible and empty
    getInputTermsAndConditions().should('not.be.checked');

    // the page should have the submit button visible and disabled
    getSubmit().should('be.disabled');
    
    // Check and uncheck the input to display an error message
    getInputTermsAndConditions().check().uncheck().blur();
    getInputTermsAndConditions().should('not.be.checked');

    // An error indication should be displayed
    getInputTermsAndConditions().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('be.visible')
          .should('have.text', 'You have to accept the terms and conditions to continue')
          .should('have.css', 'color', 'rgb(249, 115, 22)')
      })

    /** TOFIX
    // The label should contains a link to the terms and conditions PDF file
    getTermsAndConditionsFileLink().click();
    cy.url().should('include', 'terms-and-conditions.pdf');
    cy.go('back');


    // Fill inputs so every parts of the form but the passwords are ok
    // so we can focus on this particular behaviour
    getInputEmail().type(validEmail);
    getInputAlias().type(validAlias);
    getInputPassword().type(dummyPassword);
    getInputPasswordConfirm().type(dummyPassword);
    **/

    // Check the input validate the form
    getInputTermsAndConditions().check();
    getInputTermsAndConditions().should('be.checked');

    // the submit button should not be disabled
    getSubmit().should('not.be.disabled');
  });

  it('should register a new user and navigate to the login page when form is submitted', () => {
    const dummyPassword = '123456';
    const validEmail = 'test@test.abc';
    const validAlias = 'test_alias';

    // Fill all inputs with valid informations
    getInputEmail().type(validEmail);
    getInputAlias().type(validAlias);
    getInputPassword().type(dummyPassword)
    getInputPasswordConfirm().type(dummyPassword)
    getInputTermsAndConditions().check()

    // the submit button should not be disabled
    getSubmit().should('not.be.disabled').click();

    getToaster().should('be.visible')
      .should('have.css', 'background-color', 'rgb(244, 244, 245)')
      .find('span')
      .should('have.text', 'User successfully created')

    cy.url().should('include', '/auth/login')
  })
});