import './commands';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      visitWithConsentCookie(value: string): Chainable<AUTWindow>;
      assertUrl(path: string): Chainable<string>;
    }
  }
}
