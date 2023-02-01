import {
  ARTICLE_TEST_ID,
  getTooltip,
  getArticleDetailAuthorAvatar,
  getArticleDetailAuthorFullname,
  getArticleDetailTwitterButton,
  getArticleDetailLinkedInButton,
  getArticleDetailCopyLinkButton,
  getCopiedTooltip
} from '../support/article.po';

describe('/blog/articles', () => {
  beforeEach(() => cy.visit(`/blog/article/${ARTICLE_TEST_ID}`));

  describe('The header section', () => {
    it('should display the name and the avatar of the author', () => {
      getArticleDetailAuthorAvatar()
        .should('have.attr', 'src')
        .should('include', 'assets/img/W9aoBmrb_400x400.jpeg');

      getArticleDetailAuthorFullname().should('have.text', 'Sylvain Dedieu');
    });

    it('should display a twitter share icon', () => {
      getArticleDetailTwitterButton()
      .should('be.visible')
      .rightclick();

      getTooltip()
      .should('have.text', 'Share on Twitter');
      
      getArticleDetailTwitterButton().invoke('removeAttr', 'target').click()

      cy.url()
      .should('include', encodeURI('https://twitter.com/intent/tweet?url='));
    });

    it('should display a LinkedIn share icon', () => {
      getArticleDetailLinkedInButton()
        .rightclick();

      getTooltip()
      .should('have.text', 'Share on LinkedIn');

      getArticleDetailLinkedInButton().invoke('removeAttr', 'target').click()

      cy.url()
      .should(
        'include',
        encodeURI('https://www.linkedin.com/')
      );
    });
  });

  it('should display an url copy link icon', () => {
    getArticleDetailCopyLinkButton()
    .should('be.visible')
    .rightclick();

    getTooltip()
    .should('have.text', 'Copy link');

    getArticleDetailCopyLinkButton().click()

    getCopiedTooltip()
    .should('have.text', 'Copied !');

    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.include(`/blog/article/${ARTICLE_TEST_ID}`);
      });
    });
  });
});
