declare namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      login(email: string, password: string, redirectPath: string): Promise<UserCredential>;
      logout(): Promise<void>;
    }
}