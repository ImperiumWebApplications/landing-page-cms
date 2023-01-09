describe('Sections', () => {
  it('should display Hero section for questionnaire', () => {
    cy.visitWithConsentCookie('/?variant=questionnaire');

    cy.get('[data-testid="hero-description"]')
      .should('be.visible')
      .should(
        'have.text',
        'Ihr Projekt in guten Händen.Einfach. Machen. Lassen.Erfahrene Handwerker kümmern sich um Ihr Zuhause: Professionell, präzise und schnell. Jetzt Angebot einholen!',
      );

    cy.get('[data-testid="questionnaire-tiles-question"]')
      .should('be.visible')
      .should('have.text', 'Was suchen Sie?');

    cy.get('[data-testid="questionnaire-tiles-grid"] > a')
      .should('have.length', 3)
      .first()
      .should('contain.text', 'Trocken- & Innenausbau')
      .should('have.attr', 'href', '/fragebogen/trocken-und-innenausbau-5');
  });

  it('should display Steps section', () => {
    cy.visitWithConsentCookie('#steps');

    cy.get('[data-testid="step"]')
      .should('have.length', 3)
      .should('be.visible');
  });

  it('should display Video section and play video', () => {
    cy.visitWithConsentCookie('#video');

    cy.get('#video [data-testid="video-cta-button"]').should(
      'have.text',
      'Beratung starten',
    );

    cy.get('#video [data-testid="video-wrapper"]')
      .should('be.visible')
      .get('[aria-label="Play Video"]')
      .click();

    cy.get('video').should('have.prop', 'paused', false);
  });

  it('should display Statistics section', () => {
    cy.visitWithConsentCookie('#statistics');

    cy.get('#statistics [data-testid="statistics-number"]')
      .should('have.length', 4)
      .should('be.visible')
      .last()
      .should('have.text', 'Kundenzufriedenheit100%');
  });

  it('should display CallToAction section', () => {
    cy.visitWithConsentCookie('#call-to-action');

    cy.get(
      '#call-to-action [data-testid="call-to-action-button-funnel"]',
    ).should('have.attr', 'href', '/fragebogen');

    cy.get(
      '#call-to-action [data-testid="call-to-action-button-phone"]',
    ).should('have.attr', 'href', 'tel:+41 41 510 42 00');
  });

  it('should display Services section', () => {
    cy.visitWithConsentCookie('#services');

    cy.get('#services [data-testid="services-tab-header"]')
      .should('be.visible')
      .get('#services [data-testid="services-tab-content"]')
      .should('be.visible')
      .get('#services [data-testid="services-tab-content"] h2')
      .should('contain.text', 'Fliesenleger')
      .get('#services [data-testid="services-tab-header"] button')
      .last()
      .click()
      .get('#services [data-testid="services-tab-content"] h2')
      .should('contain.text', 'Trockenbau- / Innenausbau');
  });

  it('should display Reviews section', () => {
    cy.visitWithConsentCookie('#reviews');
    cy.get('#reviews .swiper').should('be.visible');
  });

  it('should display Images section', () => {
    cy.visitWithConsentCookie('#images');
    cy.get('#images').should('be.visible');
  });

  it('should display Questions section', () => {
    cy.visitWithConsentCookie('#questions');

    cy.get('#questions [data-testid="questions-tab-header"]')
      .children()
      .first()
      .should('have.class', 'bg-gray')
      .get('#questions [data-testid="questions-tab-content"]')
      .should('contain.text', 'Nach Ihrer Anfrage erhalten')
      .get('#questions [data-testid="questions-tab-header"]')
      .children()
      .last()
      .click()
      .should('have.class', 'bg-gray')
      .get('#questions [data-testid="questions-tab-content"]')
      .should('contain.text', 'Auch wenn Sie gerne einen Handwerker');
  });
});
