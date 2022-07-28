describe('auth', () => {
  beforeEach(() => cy.visit('/'));

  it('should redirect to the article search page', () => {
    // the url should be the blog page url: <root>/blog/articles
    cy.url().should('include', 'blog/articles')
  });
});