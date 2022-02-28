const baseUrl = Cypress.config().baseUrl as string;
const tileSelector = '[aria-label=question] > div';

describe('Questionnaire Funnel', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/create-lead*', {
      statusCode: 200,
    })
      .as('createLead')
      .setCookie('lq-pages-cc', 'true')
      .visit('/');
  });

  it('should successfully submit questionnaire', () => {
    cy.get('header a.button').click();

    cy.url()
      .should('eq', `${baseUrl}/fragebogen`)
      .get('header a.button')
      .should('not.exist')
      .get('[aria-label=question] > h1')
      .should('have.text', 'Was suchen Sie?')
      .get(tileSelector)
      .children()
      .should('have.length', 3)
      .should('have.attr', 'data-selected', 'false')
      .first()
      .click();

    cy.url()
      .should('eq', `${baseUrl}/fragebogen/fliesen-1`)
      .get('[aria-label=question] > h1')
      .should('have.text', 'Was möchten Sie fliesen?')
      .get('[aria-label=question] div.icon svg')
      .should('have.length', 4)
      .get(tileSelector)
      .children()
      .first()
      .should('have.attr', 'data-selected', 'false')
      .click()
      .get('.progress-bar')
      .should('have.attr', 'style', 'width: 25%;')
      .get('#questionnaire .header > div')
      .should('have.length', 1)
      .click()
      .get('.progress-bar')
      .should('have.attr', 'style', 'width: 0%;')
      .get(tileSelector)
      .children()
      .first()
      .should('have.attr', 'data-selected', 'true')
      .get(tileSelector)
      .children()
      .last()
      .click()
      .get(tileSelector)
      .children()
      .first()
      .click();

    cy.get('input#postalCode')
      .type('22222')
      .get('.input > a')
      .click()
      .get('form label[for=salutation-Frau]')
      .click()
      .get('form #firstName')
      .type('first name')
      .get('form #lastName')
      .type('last name')
      .get('form #email')
      .type('test@test.de')
      .get('form #phone')
      .type('1234567890')
      .get('form button')
      .click()
      .get('span.error')
      .should('be.visible')
      .get('form label[for=acceptedTerms]')
      .click()
      .get('form button')
      .click();

    cy.wait('@createLead').then((ctx) => {
      expect(ctx.request.body).to.deep.equal({
        questionnaire: [
          {
            question: {
              id: 10,
              value: 'Was möchten Sie fliesen?',
            },
            answer: {
              id: 46,
              value: 'Sonstiges',
            },
          },
          {
            question: {
              id: 11,
              value: 'Ist das Objekt im Neubauzustand?',
            },
            answer: {
              id: 47,
              value: 'Ja',
            },
          },
        ],
        contact: {
          salutation: {
            type: 'radio',
            value: 'Frau',
            options: ['Frau', 'Herr'],
          },
          firstName: {
            type: 'text',
            label: 'Vorname',
            value: 'first name',
          },
          lastName: {
            type: 'text',
            label: 'Nachname',
            value: 'last name',
          },
          email: {
            type: 'email',
            label: 'E-Mail Adresse',
            value: 'test@test.de',
          },
          phone: {
            type: 'text',
            label: 'Telefonnummer',
            value: '1234567890',
          },
          postalCode: {
            type: 'text',
            label: 'Postleitzahl',
            value: '22222',
          },
          acceptedTerms: {
            type: 'checkbox',
            label:
              'Ja, ich stimme der Datenschutzerklärung zu. (Widerruf jederzeit möglich)',
            value: true,
          },
        },
      });
    });

    cy.get('#questionnaire h1').should(
      'have.text',
      'Ihre Anfrage wurde erfolgreich übermittelt.',
    );
  });
});
