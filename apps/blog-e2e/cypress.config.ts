import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

const cypressJsonConfig = {
  defaultCommandTimeout: 5000,
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  video: true,
  videosFolder: '../../dist/cypress/apps/blog-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/blog-e2e/screenshots',
  chromeWebSecurity: false,
  specPattern: [
    'src/e2e/app.cy.ts',
    'src/e2e/article-list.cy.ts',
    'src/e2e/article-details.cy.ts',
  ],
  supportFile: 'src/support/e2e.ts'
};
export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...cypressJsonConfig,
    /**
    * TODO(@nrwl/cypress): In Cypress v12,the testIsolation option is turned on by default. 
    * This can cause tests to start breaking where not indended.
    * You should consider enabling this once you verify tests do not depend on each other
    * More Info: https://docs.cypress.io/guides/references/migration-guide#Test-Isolation
    **/
    testIsolation: false,
 },
});
