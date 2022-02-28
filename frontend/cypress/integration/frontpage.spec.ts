describe('Frontpage', () => {
  beforeEach(() => {
    cy.viewport('iphone-x').visitWithConsentCookie('/');
  });

  it('should navigate correctly', () => {
    cy.get('.burger')
      .click()
      .get('.sidebar')
      .should('be.visible')
      .get('.sidebar > nav > a')
      .first()
      .should('have.class', 'active')
      .get('.burger')
      .click()
      .get('.sidebar')
      .should('not.be.visible')
      .get('footer nav > a')
      .last()
      .click()
      .assertUrl('/datenschutz')
      .get('#privacy')
      .should('be.visible');
  });

  it('should display critical elements', () => {
    cy.get('h1')
      .should('be.visible')
      .get('.questionnaires')
      .should('be.visible')
      .get('.questionnaires [href="/fragebogen/fliesen-1"]')
      .should('be.visible')
      .get('.questionnaires [href="/fragebogen/maler-2"]')
      .should('be.visible')
      .get('.questionnaires [href="/fragebogen/trocken-und-innenausbau-5"]')
      .should('be.visible')
      .get('#steps')
      .scrollIntoView()
      .get('#steps .step')
      .should('be.visible')
      .get('#video')
      .scrollIntoView()
      .get('#video .video')
      .should('be.visible')
      .get('#video .description a')
      .should('be.visible')
      .get('#statistics')
      .scrollIntoView()
      .get('#statistics .number')
      .should('be.visible')
      .get('#call-to-action')
      .scrollIntoView()
      .get('#call-to-action .buttons')
      .should('be.visible')
      .get('#services')
      .scrollIntoView()
      .get('#services .services-header')
      .should('be.visible')
      .get('#services .services-content')
      .should('be.visible')
      .get('#services .services-content .title')
      .should('contain.text', 'Fliesenleger')
      .get('#services .services-header button')
      .last()
      .click()
      .get('#services .services-content .title')
      .should('contain.text', 'Trockenbau- / Innenausbau')
      .get('#reviews')
      .scrollIntoView()
      .get('#reviews .swiper')
      .should('be.visible')
      .get('#images')
      .scrollIntoView()
      .get('#images .buttons')
      .should('be.visible')
      .get('#questions')
      .scrollIntoView()
      .get('#questions .questions')
      .children()
      .first()
      .should('have.class', 'active')
      .get('#questions .answer')
      .should('contain.text', 'Nach Ihrer Anfrage erhalten')
      .get('#questions .questions')
      .children()
      .last()
      .click()
      .should('have.class', 'active')
      .get('#questions .answer')
      .should('contain.text', 'Auch wenn Sie gerne einen Handwerker');
  });
});
