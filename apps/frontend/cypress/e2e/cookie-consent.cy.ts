const COOKIE_CONSENT_NAME = 'lq-pages-cc';

Cypress.Cookies.debug(true, { verbose: false });

describe('Cookie Banner', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show cookie banner on page load', () => {
    cy.get('[data-testid="cookie-consent-modal"]')
      .should('be.visible')
      .getCookie(COOKIE_CONSENT_NAME)
      .should('not.exist');
  });

  it('should set cookie on accept and hide banner', () => {
    cy.getCookie(COOKIE_CONSENT_NAME)
      .should('not.exist')
      .get('#rcc-confirm-button')
      .click()
      .getCookie(COOKIE_CONSENT_NAME)
      .should('have.property', 'value', 'true')
      .get('.CookieConsent')
      .should('have.length', 0);
  });

  it('should set cookie on decline and hide banner', () => {
    cy.getCookie(COOKIE_CONSENT_NAME)
      .should('not.exist')
      .get('#rcc-decline-button')
      .click()
      .getCookie(COOKIE_CONSENT_NAME)
      .should('have.property', 'value', 'false')
      .get('.CookieConsent')
      .should('have.length', 0);
  });
});
