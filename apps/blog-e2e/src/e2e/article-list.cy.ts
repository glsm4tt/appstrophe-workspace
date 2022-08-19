import { getArticleCards } from '../support/article.po';

describe('/blog/articles', () => {
  beforeEach(() => cy.visit('/'));

  it('should redirect to the article search page', () => {
    // the page <root>/blog/articles should have 8 cards
    getArticleCards().should('have.length', 8);
  });

  it('should redirect to the article detail page on a card click', () => {
    // click on one card should redirect to the detail page
    getArticleCards().first().click();
    cy.url().should('include', '/blog/article/1');
  });
});
