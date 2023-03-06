import {
  getTitle,
  getAlias,
  getUserPicture,
  getDeleteUserAccountSection,
  getAliasConfirmModal,
  getAliasConfirmModalCancelButton,
  getAliasConfirmModalValidateButton,
  getAliasConfirmModalInput
} from '../support/user-settings.po';

describe('auth/user-settings', () => {
  beforeEach(() => {
    cy.login('test_user_read@fake-domain.net', 'test_user_read')
    cy.visit('/auth/user-settings')
  });

  it('should display the user settings page', () => {
    // the page should have the title 'User Setting'
    getTitle().should('be.visible').contains('User Settings');

    // the page should display the user picture
    getUserPicture()
      .get('img')
      .should('have.attr', 'src')
      .should('include', 'assets/img/empty_user.png');

    // the page should display the user alias
    getAlias().contains('@test_user_read');
  });

  it('should update the user profile picture when a file is selected', () => {
    // the page should give the possibility to update the user picture
    getUserPicture()
      .get('input[type=file]')
      .selectFile('src/fixtures/W9aoBmrb_400x400.jpeg', {force: true});

    // the user picture should have been updated
    getUserPicture()
      .get('img')
      .should('have.attr', 'src')
      .should('include', 'http://localhost:9199/v0/b/appstrophe-test.appspot.com/o/users%2FKi3WFGMtnDGTHB0ArzV0XNbNyOt5?alt=media');
  });

  it('should not delete the user account when the delete your account button is clicked but not confirmed', () => {
    // the page should display a title for the delete the user account section
    getDeleteUserAccountSection()
      .get('h2')
      .contains('Delete account');

    // the page should display a warning for the delete the user account section
    getDeleteUserAccountSection()
    .get('p')
    .contains('Once you delete your account, there is no going back. Please be certain.');

    // the page should display a button for the delete the user account section
    getDeleteUserAccountSection()
    .get('button')
    .contains('Delete your account')
    .click();

    // after the delete the user account button clicked, the page should display a confirmation modal
    getAliasConfirmModal()
    .get('h1')
    .contains('Are you sure you want to delete your account ?')

    // after canceling the request, user should still exists and be logged
    getAliasConfirmModalCancelButton()
    .click()
    getUserPicture()
    .get('img')
    .should('have.attr', 'src')
    .should('include', 'http://localhost:9199/v0/b/appstrophe-test.appspot.com/o/users%2FKi3WFGMtnDGTHB0ArzV0XNbNyOt5?alt=media');
  });

  it('should delete the user account when the delete your account button is clicked and confirmed', () => {
    const badAlias = '@user_alias'
    const correctAlias = '@test_user_read'
   
    // the page should display a title for the delete the user account section
    getDeleteUserAccountSection()
      .get('h2')
      .contains('Delete account');

    // the page should display a warning for the delete the user account section
    getDeleteUserAccountSection()
    .get('p')
    .contains('Once you delete your account, there is no going back. Please be certain.');

    // the page should display a button for the delete the user account section
    getDeleteUserAccountSection()
    .get('button')
    .contains('Delete your account')
    .click();

    // after the delete the user account button clicked, the page should display a confirmation modal
    getAliasConfirmModal()
    .get('h1')
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
