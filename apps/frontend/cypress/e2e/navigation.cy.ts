describe('Navigation', () => {
  beforeEach(() => {
    cy.viewport('iphone-x').visitWithConsentCookie('/');
  });

  it('should navigate via header', () => {
    cy.get('[aria-label="Toggle Navigation"]')
      .click()
      .get('header [role="menu"]')
      .should('be.visible')
      .get('header [role="menu"] a[role="menuitem"]')
      .last()
      .click()
      .assertUrl('/#faq')
      .get('#faq')
      .should('be.visible');
  });

  it('should navigate via footer', () => {
    cy.get('footer nav > a')
      .last()
      .click()
      .assertUrl('/datenschutz')
      .get('#privacy')
      .should('be.visible');
  });
});
