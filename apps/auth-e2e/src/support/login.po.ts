
export const getTitle = () => cy.get('[data-cy="title"]')
export const getInputEmail = () => cy.get('input[data-cy="input-email"]')
export const getInputPassword = () => cy.get('input[data-cy="input-password"]')
export const getSubmit = () => cy.get('[data-cy="submit"]')

export const getPasswordRetrieveLink = () => cy.get('[data-cy="password-retrieve-link"]')
export const getRegisterLinkContainer = () => cy.get('[data-cy="register-link-container"]')
export const getRegisterLink = () => cy.get('[data-cy="register-link"]')