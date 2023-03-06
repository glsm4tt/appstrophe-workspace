import {
  getTitle,
  getAlias,
  getUserPicture,
  getUpdateUserEmailSection,
  getUpdateUserEmailInput,
  getUpdateUserEmailConfirmModal,
  getEmailConfirmModalCancelButton,
  getEmailConfirmModalValidateButton,
  getDeleteUserAccountSection,
  getAliasConfirmModal,
  getAliasConfirmModalCancelButton,
  getAliasConfirmModalValidateButton,
  getAliasConfirmModalInput
} from '../support/user-settings.po';

const LOGGED_USER_MOCK = {
  email: 'test_user_read@fake-domain.net',
  password: 'test_user_read'
}

const notAnEmail = '123';
const validEmail = 'test_user_read2@fake-domain.net';

describe('auth/user-settings page', () => {
  beforeEach(() => {
    cy.login(LOGGED_USER_MOCK.email, LOGGED_USER_MOCK.password)
    cy.visit('/auth/user-settings')
  });

  it('should display the user settings page', () => {
    // the page should have the title 'User Setting'
    getTitle().should('be.visible').contains('User Settings');

    // the page should display the user picture
    getUserPicture()
      .find('img')
      .should('have.attr', 'src')
      .should('include', 'assets/img/empty_user.png');

    // the page should display the user alias
    getAlias().contains('@test_user_read');
  });

  it('should update the user profile picture when a file is selected', () => {
    // the page should give the possibility to update the user picture
    getUserPicture()
      .find('input[type=file]')
      .selectFile('src/fixtures/W9aoBmrb_400x400.jpeg', { force: true });

    // the user picture should have been updated
    getUserPicture()
      .find('img')
      .should('have.attr', 'src')
      .should('include', 'http://localhost:9199/v0/b/appstrophe-test.appspot.com/o/users%2FKi3WFGMtnDGTHB0ArzV0XNbNyOt5?alt=media');
  });
});

describe('auth/user-settings email update', () => {
  beforeEach(() => {
    cy.login(LOGGED_USER_MOCK.email, LOGGED_USER_MOCK.password)
    cy.visit('/auth/user-settings')
  });

  it('should not update the user email address when the update your email button is clicked but not confirmed', () => {
    // the page should display a title for the update the user email section
    getUpdateUserEmailSection()
      .find('h2')
      .contains('Your email address');

    // the email input should contain the current logged user email address and the button should be disabled
    getUpdateUserEmailInput()
      .should('have.value', LOGGED_USER_MOCK.email);
    getUpdateUserEmailSection()
      .find('button')
      .contains('Change your email')
      .should('be.disabled');

    // it should not update the user email address when the update your email button is clicked but not confirmed
    getUpdateUserEmailInput()
      .clear()
      .type('test_user_read2@fake-domain.net');
    getUpdateUserEmailSection()
      .find('button')
      .contains('Change your email')
      .should('not.be.disabled')
      .click();
    getUpdateUserEmailConfirmModal()
      .find('h1')
      .contains('Are you sure you want to change your email ?');
    getEmailConfirmModalCancelButton()
      .contains('Cancel')
      .click()
    getUpdateUserEmailInput()
      .should('have.value', LOGGED_USER_MOCK.email);
  });

  it('should update the user email address when the update your email button is clicked and confirmed', () => {
    // the page should display a title for the update the user email section
    getUpdateUserEmailSection()
      .find('h2')
      .contains('Your email address');

    // the email input should contain the current logged user email address and the button should be disabled
    getUpdateUserEmailInput()
      .should('have.value', LOGGED_USER_MOCK.email);
    getUpdateUserEmailSection()
      .find('button')
      .contains('Change your email')
      .should('be.disabled');

    // the button should be disabled if email is empty
    getUpdateUserEmailInput()
      .clear()
      .blur();
    getUpdateUserEmailSection()
      .find('button')
      .contains('Change your email')
      .should('be.disabled');

    // An error indication should be displayed
    getUpdateUserEmailInput().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('be.visible')
          .should('have.text', 'This field is required')
          .should('have.css', 'color', 'rgb(202, 138, 4)')
      })

    // the button should be disabled if email is invalid
    getUpdateUserEmailInput()
      .clear()
      .type(notAnEmail)
      .blur();
    getUpdateUserEmailSection()
      .find('button')
      .contains('Change your email')
      .should('be.disabled');

    // An error indication should be displayed
    getUpdateUserEmailInput().should('have.attr', 'aria-errormessage').then(
      id => {
        cy.get(`#${id}`)
          .find('span')
          .should('be.visible')
          .should('have.text', 'This is not a valid email address')
          .should('have.css', 'color', 'rgb(202, 138, 4)')
      })
      
    // it should not update the user email address when the update your email button is clicked but not confirmed
    getUpdateUserEmailInput()
      .clear()
      .type(validEmail)
      .blur();
    getUpdateUserEmailSection()
      .find('button')
      .contains('Change your email')
      .should('not.be.disabled')
      .click();
    getUpdateUserEmailConfirmModal()
      .find('h1')
      .contains('Are you sure you want to change your email ?');
    getEmailConfirmModalValidateButton()
      .contains('Validate')
      .click()
    getUpdateUserEmailInput()
      .should('have.value', validEmail);
  });
});

describe('auth/user-settings account deletion', () => {
  beforeEach(() => {
    cy.login(validEmail, LOGGED_USER_MOCK.password)
    cy.visit('/auth/user-settings')
  });
  
  it('should not delete the user account when the delete your account button is clicked but not confirmed', () => {
    // the page should display a title for the delete the user account section
    getDeleteUserAccountSection()
      .find('h2')
      .contains('Delete account');

    // the page should display a warning for the delete the user account section
    getDeleteUserAccountSection()
      .find('p')
      .contains('Once you delete your account, there is no going back. Please be certain.');

    // the page should display a button for the delete the user account section
    getDeleteUserAccountSection()
      .find('button')
      .contains('Delete your account')
      .click();

    // after the delete the user account button clicked, the page should display a confirmation modal
    getAliasConfirmModal()
      .find('h1')
      .contains('Are you sure you want to delete your account ?')

    // after canceling the request, user should still exists and be logged
    getAliasConfirmModalCancelButton()
      .click()
    getUserPicture()
      .find('img')
      .should('have.attr', 'src')
      .should('include', 'http://localhost:9199/v0/b/appstrophe-test.appspot.com/o/users%2FKi3WFGMtnDGTHB0ArzV0XNbNyOt5?alt=media');
  });

  it('should delete the user account when the delete your account button is clicked and confirmed', () => {
    const badAlias = '@user_alias'
    const correctAlias = '@test_user_read'

    // the page should display a title for the delete the user account section
    getDeleteUserAccountSection()
      .find('h2')
      .contains('Delete account');

    // the page should display a warning for the delete the user account section
    getDeleteUserAccountSection()
      .find('p')
      .contains('Once you delete your account, there is no going back. Please be certain.');

    // the page should display a button for the delete the user account section
    getDeleteUserAccountSection()
      .find('button')
      .contains('Delete your account')
      .click();

    // after the delete the user account button clicked, the page should display a confirmation modal
    getAliasConfirmModal()
      .find('h1')
      .contains('Are you sure you want to delete your account ?')

    // if user alias input is empty, validate button should be disabled
    getAliasConfirmModalInput()
      .clear()
    getAliasConfirmModalValidateButton()
      .should('be.disabled')

    // if user alias input is filled with otherwise than the user alias, validate button should be disabled
    getAliasConfirmModalInput()
      .clear()
      .type(badAlias)
    getAliasConfirmModalValidateButton()
      .should('be.disabled')

    // after canceling the request, user should still exists and be logged
    getAliasConfirmModalInput()
      .clear()
      .type(correctAlias)
    getAliasConfirmModalValidateButton()
      .should('not.be.disabled')
      .click()
    getUserPicture()
      .should('not.exist');
  });
});
