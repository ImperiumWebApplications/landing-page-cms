describe('Funnel > Questionnaire', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/create-lead*', {
      statusCode: 200,
    })
      .as('createLead')
      .intercept('POST', '/api/postal-codes*', {
        statusCode: 200,
        body: {
          success: true,
          data: [
            {
              country_code: 'DE',
              zipcode: '22303',
              place: 'Hamburg Winterhude',
              state: 'Hamburg',
              state_code: 'HH',
              province: '',
              province_code: '00',
              community: 'Hamburg, Freie und Hansestadt',
              community_code: '02000',
              latitude: '53.5953',
              longitude: '10.0122',
            },
          ],
        },
      });
  });

  it('should display header and footer of questionnaire', () => {
    cy.visitWithConsentCookie('/fragebogen');

    cy.get('[data-testid="questionnaire"] h1').should(
      'have.text',
      'Erreichen Sie Ihre Werbeziele',
    );

    cy.get('[data-testid="questionnaire-advantage"]')
      .should('have.length', 3)
      .first()
      .should(
        'have.text',
        'Persönliche Unterstützungrund um das Thema Immobilien',
      );
  });

  it('should successfully submit questionnaire', () => {
    cy.visitWithConsentCookie('/fragebogen');

    cy.get('[aria-label="question"] > h2')
      .should('have.text', 'Welches Ziel möchten Sie erreichen?')
      .get('[aria-label="question"] > div')
      .children()
      .should('have.length', 4)
      .should('have.attr', 'data-selected', 'false')
      .first()
      .click();

    cy.assertUrl('/fragebogen/terasse-7')
      .get('[aria-label="question"] > h2')
      .should('have.text', 'Was möchten Sie versichern?')
      .get('[aria-label="question"] [role="button"]')
      .should('have.length', 2)
      .get('[aria-label="question"] > div')
      .children()
      .first()
      .should('have.attr', 'data-selected', 'false')
      .click()
      .get('[data-testid="questionnaire-progress-bar"]')
      .should('have.attr', 'style', 'width: 40%;')
      .get('[data-testid="questionnaire-back-button"]')
      .should('have.length', 1)
      .click()
      .get('[data-testid="questionnaire-progress-bar"]')
      .should('have.attr', 'style', 'width: 20%;')
      .get('[aria-label="question"] > div')
      .children()
      .first()
      .should('have.attr', 'data-selected', 'true')
      .get('[aria-label="question"] > div')
      .children()
      .last()
      .click()
      .get('[aria-label="question"] > div')
      .children()
      .first()
      .click();

    cy.get('[autocomplete="one-time-code"]')
      .type('22303')
      .get('[data-testid="questionnaire-postal-code-button"]')
      .click()
      .get('[data-testid="radio-group-option-Frau"]')
      .click()
      .get('form input[name="firstName"]')
      .type('first name')
      .get('form input[name="lastName"]')
      .type('last name')
      .get('form input[name="email"]')
      .type('test@test.de')
      .get('form input[name="phone"]')
      .type('1234567890')
      .get('form input[name="acceptedTerms"]')
      .click()
      .get('[data-testid="contact-details-form-submit"]')
      .click();

    cy.wait('@createLead').then((ctx) => {
      expect(ctx.request.body).to.deep.equal({
        domain: 'localhost:3000',
        contact: {
          postalCode: '22303',
          city: 'Hamburg Winterhude',
          salutation: 'Frau',
          firstName: 'first name',
          lastName: 'last name',
          email: 'test@test.de',
          phone: '1234567890',
          acceptedTerms: true,
        },
        questionnaireResults: [
          {
            question: 'Was möchten Sie versichern?',
            answer: 'Nichts',
          },
          {
            question: 'Möchten Sie weiss, einfarbig oder mehrfarbig?',
            answer: 'Weiss',
          },
        ],
      });

      // cy.get('[data-testid="questionnaire-confirmation"] h2').should(
      //   'have.text',
      //   'Ihre Anfrage wurde erfolgreich übermittelt.',
      // );

      // cy.get('[data-testid="questionnaire-confirmation-phone"]')
      //   .should('have.text', '+49123456789')
      //   .should('have.attr', 'href', 'tel:+49123456789');

      // cy.location('search').should('eq', '?bestaetigung=1');
    });
  });
});
