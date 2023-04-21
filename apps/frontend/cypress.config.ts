import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  fixturesFolder: false,
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    retries: {
      runMode: 3,
    },
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        const REDUCE = 1;
        if (browser.family === 'firefox') {
          launchOptions.preferences['ui.prefersReducedMotion'] = REDUCE;
        }
        if (browser.family === 'chromium') {
          launchOptions.args.push('--force-prefers-reduced-motion');
        }
        return launchOptions;
      });
    },
  },
});
