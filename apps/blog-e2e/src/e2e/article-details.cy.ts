import {
  ARTICLE1_TEST_ID,
  getTooltip,
  getArticleDetailAuthorAvatar,
  getArticleDetailAuthorFullname,
  getArticleDetailTwitterButton,
  getArticleDetailLinkedInButton,
  getArticleDetailCopyLinkButton,
  getCopiedTooltip,
  getArticleComments,
  getArticleCommentCard,
  getArticleInputNewComment,
  getArticleNewCommentSubmitButton
} from '../support/article.po';

const LOGGED_USER_MOCK = {
  email: 'test_user_read@fake-domain.net',
  password: 'test_user_read'
}
const ARTICLE_STORAGE_KEY = '_article_';

describe('/blog/article:articleId', () => {
  describe('The header section', () => {
    beforeEach(() => cy.visit(`/blog/article/${ARTICLE1_TEST_ID}`));
  
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
          expect(text).to.include(`/blog/article/${ARTICLE1_TEST_ID}`);
        });
      });
    });
  });

  describe('The comments section un-signed', () => {
    beforeEach(() => cy.visit(`/blog/article/${ARTICLE1_TEST_ID}`));

    it('should have 2 comments by default', () => {
      getArticleCommentCard()
        .should('have.length', 2)
    });

    it('should not be possible to focus the textarea if user is not logged', () => {
      getArticleInputNewComment()
        .focus()

      getArticleInputNewComment()
        .should('not.be.focused')
    });
  });
  
  describe('The comments section signed-in', () => {
    beforeEach(() => {
      cy.login(LOGGED_USER_MOCK.email, LOGGED_USER_MOCK.password, `/blog/article/${ARTICLE1_TEST_ID}`);
    });

    it('should be possible to focus the textarea if user is logged', () => {
      getArticleInputNewComment()
        .focus()

      getArticleInputNewComment()
        .should('be.focused')
    });
   
    it('should not be possible to add an empty comment', () => {
      getArticleInputNewComment()
        .clear()
        .blur()

      getArticleNewCommentSubmitButton().should('not.exist')

      getArticleCommentCard()
        .should('have.length', 2)

      // An error indication should be displayed
      getArticleInputNewComment().should('have.attr', 'aria-errormessage').then(
        id => {
          cy.get(`#${id}`)
            .find('span')
            .should('be.visible')
            .should('have.text', 'Comment cannot be empty')
            .should('have.css', 'color', 'rgb(249, 115, 22)')
        })
    });

    it('should not be possible to add a comment with more than 255 characters', () => {
      getArticleInputNewComment()
        .type('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?')
        .blur()

      getArticleNewCommentSubmitButton().should('be.disabled')

      getArticleCommentCard()
        .should('have.length', 2)

      getArticleComments()
      .contains('2')

      // An error indication should be displayed
      getArticleInputNewComment().should('have.attr', 'aria-errormessage').then(
        id => {
          cy.get(`#${id}`)
            .find('span')
            .should('be.visible')
            .should('have.text', 'Comment must not exceed 255 characters')
            .should('have.css', 'color', 'rgb(249, 115, 22)')
        })
    });

    it('should be possible to add a comment', () => {
      getArticleInputNewComment()
        .type('Another comment')
        .blur()

      getArticleNewCommentSubmitButton().should('not.be.disabled').click()

      getArticleCommentCard()
        .should('have.length', 3)

      // An error indication should not be displayed
      getArticleInputNewComment().should('have.attr', 'aria-errormessage').then(
        id => {
          cy.get(`#${id}`)
            .find('span')
            .should('not.exist')
      });

      getArticleInputNewComment().should('have.value', '');

      cy.clearLocalStorage(`${ARTICLE_STORAGE_KEY}${ARTICLE1_TEST_ID}`)

      cy.visit(`/blog/article/${ARTICLE1_TEST_ID}`)

      getArticleComments()
      .contains('3')
    });
  });
});
