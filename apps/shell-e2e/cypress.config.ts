import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

const cypressJsonConfig = {
  defaultCommandTimeout: 5000,
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  video: true,
  videosFolder: '../../dist/cypress/apps/shell-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/shell-e2e/screenshots',
  chromeWebSecurity: false,
  specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'src/support/e2e.ts'
};
export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...cypressJsonConfig,
    setupNodeEvents(on, config): any {
      // inside config.browsers array each object has information like
      // {
      //   name: 'chrome',
      //   channel: 'canary',
      //   family: 'chromium',
      //   displayName: 'Canary',
      //   version: '80.0.3966.0',
      //   path:
      //    '/Applications/Canary.app/Contents/MacOS/Canary',
      //   majorVersion: 80
      // }
      return {
        browsers: config.browsers.filter(
          (b) => b.family === 'chromium' && b.name !== 'electron'
        ),
      }
    },
    /**
    * TODO(@nrwl/cypress): In Cypress v12,the testIsolation option is turned on by default. 
    * This can cause tests to start breaking where not indended.
    * You should consider enabling this once you verify tests do not depend on each other
    * More Info: https://docs.cypress.io/guides/references/migration-guide#Test-Isolation
    **/
    testIsolation: false,
 },
});
