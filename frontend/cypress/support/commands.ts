const baseUrl = Cypress.config().baseUrl as string;

Cypress.Commands.add('visitWithConsentCookie', (path: string) => {
  return cy.setCookie('lq-pages-cc', 'true').visit(path);
});

Cypress.Commands.add('assertUrl', (path: string) => {
  return cy.url().should('eq', `${baseUrl}${path}`);
});
