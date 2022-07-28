import {
  getArticleCards
} from '../support/article.po';

describe('auth', () => {
  beforeEach(() => cy.visit('/'));

  it('should redirect to the article search page', () => {
    // the page <root>/blog/articles should have 8 cards
    getArticleCards().should('have.length', 8)
  });
});