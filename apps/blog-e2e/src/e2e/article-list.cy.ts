import { getArticleCards } from '../support/article.po';

describe('/blog/articles', () => {
  beforeEach(() => cy.visit('/'));

  it('should have 8 articles cards displayed in the page', () => {
    // the page <root>/blog/articles should have 1 cards
    getArticleCards().should('have.length', 1);
  });

  it('should redirect to the article detail page on a card click', () => {
    // click on one card should redirect to the detail page
    getArticleCards()
      .first()
      .invoke('attr', 'id')
      .then(id => {
        const splitted = id.split('-');
        const articleId = splitted[splitted.length - 1]
        getArticleCards().first().click();
        cy.url().should('include', `/blog/article/${articleId}`);
    });
  });
});
