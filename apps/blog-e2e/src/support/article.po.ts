export const ARTICLE1_TEST_ID = 'article_1';
export const ARTICLE2_TEST_ID = 'article_2';

export const getTooltip = () => cy.get('[data-cy="tooltip"]');
export const getCopiedTooltip = () => cy.get('[data-cy="copied-tooltip"]');

export const getInputSearch = () => cy.get('[data-cy="input-search"]');
export const getArticleCards = () => cy.get('[data-cy="article-card"]');

export const getArticleDetailAuthorAvatar = () => cy.get('[data-cy="author-avatar"]');
export const getArticleDetailAuthorFullname = () => cy.get('[data-cy="author-fullname"]');
export const getArticleDetailTwitterButton = () => cy.get('[data-cy="share-on-twitter"]');
export const getArticleDetailLinkedInButton = () => cy.get('[data-cy="share-on-linkedIn"]');
export const getArticleDetailCopyLinkButton = () => cy.get('[data-cy="copy-link"]');
export const getArticleDetailPublicationDate = () => cy.get('[data-cy="publication-date"]');
export const getArticleDetailTimeOfRead = () => cy.get('[data-cy="time-of-read"]');
export const getArticleDetailYoutubeButton = () => cy.get('[data-cy="watch-on-youtube"]');
export const getArticleComments = () => cy.get('[data-cy="article-card"]');
export const getArticleInputNewComment = () => cy.get('[data-cy="input-comment"]');
export const getArticleNewCommentSubmitButton = () => cy.get('[data-cy="submit"]');