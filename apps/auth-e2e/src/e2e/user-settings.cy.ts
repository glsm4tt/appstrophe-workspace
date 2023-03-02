import {
  getTitle,
  getAlias,
  getUserPicture
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
    // the page should update the user picture
    getUserPicture()
      .get('input[type=file]')
      .selectFile('src/fixtures/W9aoBmrb_400x400.jpeg', {force: true});

    // the user picture should have been updated
    getUserPicture()
      .get('img')
      .should('have.attr', 'src')
      .should('include', 'assets/img/empty_user.png');
  });
});
