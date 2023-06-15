import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

const cypressJsonConfig = {
  defaultCommandTimeout: 5000,
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  video: true,
  videosFolder: '../../dist/cypress/apps/auth-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/auth-e2e/screenshots',
  chromeWebSecurity: false,
  specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'src/support/e2e.ts',
  setupNodeEvents(on: any, config: unknown) {
    on('before:browser:launch', (browser: unknown = {}, launchOptions: any) => {
        // Add localhost:8080, the Firestore emulator host:port when running locally, to the Chrome proxy bypass
        // So Cypress doesn't jack with it
        launchOptions.args.push('--proxy-bypass-list=<-loopback>,localhost:8080,localhost:9099,localhost:9199,localhost:5001');
        /*
        // Options that provide marginal memory improvement in Chrome, but seem to break headed mode
        // Leaving them out for now as I don't fully understand them and the improvement is marginal
        launchOptions.args.push('--ChromeOSMemoryPressureHandling');
        launchOptions.args.push('--renderer-process-limit=1');
        launchOptions.args.push('--single-process');
        launchOptions.args.push('--disable-dev-shm-usage');
        */
      return launchOptions;
    });
  },
};
export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...cypressJsonConfig,
    /**
     * TODO(@nx/cypress): In Cypress v12,the testIsolation option is turned on by default.
     * This can cause tests to start breaking where not indended.
     * You should consider enabling this once you verify tests do not depend on each other
     * More Info: https://docs.cypress.io/guides/references/migration-guide#Test-Isolation
     **/
    testIsolation: false,
  },
});
