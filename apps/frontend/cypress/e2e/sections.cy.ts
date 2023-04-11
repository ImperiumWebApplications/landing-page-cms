describe('Sections', () => {
  it('should display Hero section', () => {
    cy.visitWithConsentCookie('/');

    cy.get('[data-testid="hero-headline"]')
      .should('be.visible')
      .should('have.text', 'Erreichen Sie Ihre Werbeziele');

    cy.get('[data-testid="hero-subtitle"]')
      .should('be.visible')
      .should(
        'have.text',
        'Als lokale Online-Marketing-Agentur konzipieren und gestalten wir Online-Produkte für kleine und mittlere Unternehmen.',
      );

    cy.get('[data-testid="hero-tiles-question"]')
      .should('be.visible')
      .should('have.text', 'Welches Ziel möchten Sie erreichen?');

    cy.get('[data-testid="hero-tiles-grid"] > a')
      .should('have.length', 4)
      .first()
      .should('contain.text', 'Wintergarten')
      .should('have.attr', 'href', '/fragebogen/wintergarten-6');

    cy.get('[data-testid="hero-advantage-description"]')
      .should('have.length', 3)
      .should('be.visible')
      .first()
      .should('have.text', 'Formular ausfüllenund Bedarf festhalten');
  });

  it('should display Video section', () => {
    cy.visitWithConsentCookie('/');

    cy.scrollTo(0, 1000, { duration: 500 }).wait(500);

    cy.get('[data-testid="video-button"]').should(
      'have.text',
      'Beratung starten',
    );

    cy.get('[data-testid="video-statistic"]')
      .should('have.length', 4)
      .last()
      .should('have.text', '100%Kundenzufriedenheit');

    cy.get('[data-testid="video-wrapper"]')
      .should('be.visible')
      .get('[aria-label="Play Video"]')
      .click();

    cy.get('video').should('have.prop', 'paused', false);
  });

  it('should display Services section', () => {
    cy.visitWithConsentCookie('/');

    cy.scrollTo(0, 1900, { duration: 500 }).wait(500);

    cy.get('[data-testid="services-headline"]')
      .should('be.visible')
      .should('have.text', 'Unsere Mission');

    cy.get('[data-testid="services-headline"] ~ div.article')
      .should('be.visible')
      .should(
        'have.text',
        'Zielführendes Online-Marketing für regionale Unternehmen, einfach und effizient.',
      );

    cy.get('[data-testid="services-benefit"]')
      .should('be.visible')
      .should('have.length', 3)
      .first()
      .should(
        'have.text',
        'Kunden gewinnenWir haben eine Erfolgsbilanz, die für sich spricht, und wir sind stolz darauf, dass wir unseren helfen konnten, ihre Ziele zu erreichen. Kunden',
      );

    cy.scrollTo(0, 2100, { duration: 500 }).wait(500);

    cy.get('[data-testid="services-cta"]').should('be.visible');

    cy.get('[data-testid="services-cta"] > div')
      .first()
      .should(
        'have.text',
        'Wir helfen Ihnen unverbindlich und kostenlos, den besten Profi zu finden.',
      );

    cy.get('[data-testid="services-cta"] a')
      .last()
      .should('have.text', 'Beratung starten')
      .should('have.attr', 'href', '/fragebogen');
  });

  it('should display Reviews section', () => {
    cy.visitWithConsentCookie('/');
    cy.scrollTo(0, 3200, { duration: 500 }).wait(500);
    cy.get('[data-testid="reviews-slider"]').should('be.visible');
    cy.get('.swiper-pagination-bullets > span')
      .should('have.length', 2)
      .first()
      .should('have.class', 'swiper-pagination-bullet-active');

    cy.get('[data-testid="reviews-slider"] [aria-label="Weiter"]').click();

    cy.get('.swiper-pagination-bullets > span')
      .last()
      .should('have.class', 'swiper-pagination-bullet-active');

    cy.get('[data-testid="reviews-cta"] > div')
      .first()
      .should(
        'have.text',
        'Konnten wir Sie überzeugen?Lassen Sie sich beraten',
      );

    cy.get('[data-testid="reviews-cta"] a')
      .last()
      .should('have.text', 'Beratung starten')
      .should('have.attr', 'href', '/fragebogen');
  });

  it('should display Questions section', () => {
    cy.visitWithConsentCookie('/');

    cy.scrollTo('bottom', { duration: 500 }).wait(500);

    cy.get('[data-testid="questions-headline"]')
      .should('be.visible')
      .should('have.text', 'Häufig gestellte Fragen');

    cy.get('[data-testid="questions-answer"]').should('not.be.visible');

    cy.get('[data-testid="questions-question"]')
      .should('have.length', 4)
      .should('have.attr', 'aria-expanded', 'false')
      .first()
      .click()
      .should('have.attr', 'aria-expanded', 'true');

    cy.get('[data-testid="questions-answer"]')
      .should('be.visible')
      .should(
        'have.text',
        'Die genauen Kosten für eine professionelle Planung Ihres Gartens schwanken stark von Region zu Region und hängen natürlich auch vom Umfang der Planung ab. Wir empfehlen, sich zunächst mit unseren Experten in Verbindung zu setzen und im Rahmen der Bedarfsanalyse zu prüfen, ob Sie überhaupt einen Landschaftsbauer oder Architekten für Ihre Gartenplanung benötigen. Vieles lässt sich mit fachkundigem Rat und einem guten Online Gartenplaner heute alleine planen.',
      );
  });
});
