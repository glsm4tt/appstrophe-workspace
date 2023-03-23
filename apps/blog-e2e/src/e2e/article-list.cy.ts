import { getArticleCards, getInputSearch } from '../support/article.po';

const ARTICLES_STORAGE_KEY = '_articles_';

describe('/blog/articles', () => {
  beforeEach(() => cy.visit('/'));

  it('should have a search input displayed in the page', () => {
    // the page <root>/blog/articles should have 1 cards
    getInputSearch().should('have.attr', 'placeholder', 'Filter by name');
  });

  it('should have 2 articles cards displayed in the page', () => {
    // the page <root>/blog/articles should have 1 cards
    getArticleCards().should('have.length', 2);
  });

  it('should redirect to the article detail page on a card click', () => {
    // click on one card should redirect to the detail page
    getArticleCards()
      .first()
      .invoke('attr', 'id')
      .then(id => {
        const articleId = id.split('-').at(-1);
        getArticleCards().first().click();
        cy.url().should('include', `/blog/article/${articleId}`);
    });
  });

  it('should increase the view number of the article by one when it is visited', () => {
    // check view numbers on article 2
    getArticleCards()
      .eq(1)
      .find('[data-cy="article-views"]')
      .should('not.exist');
  
    getArticleCards()
      .eq(1)
      .click();

    cy.clearLocalStorage(ARTICLES_STORAGE_KEY);

    cy.go('back')
    // check again view numbers on article 2
    getArticleCards()
      .eq(1)
      .find('[data-cy="article-views"]')
      .contains('1')
  });
});
