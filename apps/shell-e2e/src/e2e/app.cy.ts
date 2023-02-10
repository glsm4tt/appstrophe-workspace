describe('shell', () => {
  beforeEach(() => cy.visit('http://localhost:4200'));

  it('should redirect to the blog page', () => {
    // the url should be the blog page url: <root>/blog/articles
    cy.url().should('include', '/blog/articles');
  });
});
