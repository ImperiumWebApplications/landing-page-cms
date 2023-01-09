describe('Funnel > Appointment', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/create-lead*', {
      statusCode: 200,
    }).as('createLead');
  });

  it('should successfully submit appointment request', () => {
    cy.visitWithConsentCookie('/termin');

    /** Step 1 */

    cy.get('[data-progress-panel] > button')
      .should('have.length', 3)
      .should('be.disabled')
      .first()
      .should('have.text', '1. Terminart');

    cy.get('[data-selection-panel] > h1').should(
      'have.text',
      'Wo soll Ihr Termin statt finden?',
    );
    cy.get('[data-selection-panel] > p').should(
      'have.text',
      'In wenigen Schritten zum persönlichen Gespräch',
    );

    cy.get('[data-testid="location-picker-submit"]').should('be.disabled');

    cy.get('[role="radiogroup"] > div > div')
      .should('have.length', 4)
      .first()
      .should('have.text', 'Zuhause')
      .click();

    cy.get('[data-testid="location-picker-submit"]')
      .should('not.be.disabled')
      .click();

    /** Step 2 */

    cy.get('[data-selection-panel] > h1').should(
      'have.text',
      'Was sind Ihre Wunschtermine?',
    );
    cy.get('[data-selection-panel] > p').should(
      'have.text',
      'Planen Sie für unser persönliches Gespräch ca. 60 Minuten ein.',
    );

    cy.get('[data-progress-panel] > button')
      .first()
      .should('not.be.disabled')
      .click();

    cy.get('[role="radiogroup"] > div > div')
      .first()
      .should('have.class', 'bg-secondary')
      .should('have.attr', 'aria-checked', 'true');

    cy.get('[data-testid="location-picker-submit"]').click();

    cy.get('div[role="button"]').should('have.length', 3).first().click();

    cy.get('[role="dialog"] > div').last().should('be.visible');

    cy.get('.rdp-day_today').click();

    cy.get('[data-testid="time-picker"] > button').first().click();

    cy.get('div[role="button"]').first().should('contain.text', '09:00');

    cy.get('[data-testid="date-list-submit"]').click();

    /** Step 3 */

    cy.get('[data-testid="contact-details-form-submit"]').should('be.disabled');

    cy.get('[data-selection-panel] > h1').should('have.text', 'Kontaktdaten');
    cy.get('[data-testid="Frau"]').click();
    cy.get('[aria-label="Vorname"]').type('John');
    cy.get('[aria-label="Nachname"]').type('Due');
    cy.get('[aria-label="Telefonnummer"]').type('0123456789');
    cy.get('[aria-label="E-Mail Adresse"]').type('john.due@test.com');
    cy.get('#acceptedTerms').click();

    cy.get('[data-testid="contact-details-form-submit"]')
      .should('not.be.disabled')
      .click();

    cy.wait('@createLead').then((ctx) => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const formattedMonth = month < 10 ? '0' + month : month;
      const day = today.getDate();
      const formattedDay = day < 10 ? '0' + day : day;
      expect(ctx.request.body).to.deep.equal({
        domain: 'localhost:3000',
        contact: {
          salutation: 'Frau',
          firstName: 'John',
          lastName: 'Due',
          phone: '0123456789',
          email: 'john.due@test.com',
          acceptedTerms: true,
        },
        appointmentRequests: [
          {
            date: `${year}-${formattedMonth}-${formattedDay}T08:00:00.000Z`,
            location: 'Zuhause',
            duration: 60,
          },
        ],
      });

      cy.get('[data-selection-panel] > h1').should('have.text', 'Vielen Dank!');
    });

    /** Back to Home */
    cy.get('[data-testid="button"]').click();
    cy.get('[data-selection-panel] > h1').should(
      'have.text',
      'Wo soll Ihr Termin statt finden?',
    );
    cy.get('[data-progress-panel] > button')
      .first()
      .should('have.class', 'bg-primary')
      .should('be.disabled');
    cy.get('[role="radiogroup"] > div > div')
      .first()
      .should('have.attr', 'aria-checked', 'false');
  });
});
