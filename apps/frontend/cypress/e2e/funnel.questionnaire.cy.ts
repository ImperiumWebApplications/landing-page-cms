// describe('Funnel > Questionnaire', () => {
//   beforeEach(() => {
//     cy.intercept('POST', '/api/create-lead*', {
//       statusCode: 200,
//     })
//       .as('createLead')
//       .intercept('POST', '/api/postal-codes*', {
//         statusCode: 200,
//         body: {
//           success: true,
//           data: [
//             {
//               country_code: 'DE',
//               zipcode: '22303',
//               place: 'Hamburg Winterhude',
//               state: 'Hamburg',
//               state_code: 'HH',
//               province: '',
//               province_code: '00',
//               community: 'Hamburg, Freie und Hansestadt',
//               community_code: '02000',
//               latitude: '53.5953',
//               longitude: '10.0122',
//             },
//           ],
//         },
//       });
//   });

//   it('should successfully submit questionnaire', () => {
//     cy.visitWithConsentCookie('/fragebogen');

//     cy.get('header a.button')
//       .should('not.exist')
//       .get('[aria-label="question"] > h1')
//       .should('have.text', 'Was suchen Sie?')
//       .get('[aria-label="question"] > div')
//       .children()
//       .should('have.length', 3)
//       .should('have.attr', 'data-selected', 'false')
//       .first()
//       .click();

//     cy.assertUrl('/fragebogen/fliesen-1')
//       .get('[aria-label="question"] > h1')
//       .should('have.text', 'Was möchten Sie fliesen?')
//       .get('[aria-label="question"] [role="button"]')
//       .should('have.length', 4)
//       .get('[aria-label="question"] > div')
//       .children()
//       .first()
//       .should('have.attr', 'data-selected', 'false')
//       .click()
//       .get('[data-testid="questionnaire-progress-bar"]')
//       .should('have.attr', 'style', 'width: 25%;')
//       .get('[data-testid="questionnaire-back-button"]')
//       .should('have.length', 1)
//       .click()
//       .get('[data-testid="questionnaire-progress-bar"]')
//       .should('have.attr', 'style', 'width: 0%;')
//       .get('[aria-label="question"] > div')
//       .children()
//       .first()
//       .should('have.attr', 'data-selected', 'true')
//       .get('[aria-label="question"] > div')
//       .children()
//       .last()
//       .click()
//       .get('[aria-label="question"] > div')
//       .children()
//       .first()
//       .click();

//     cy.get('[autocomplete="one-time-code"]')
//       .type('22303')
//       .get('[data-testid="postal-code-confirmation-button"]')
//       .click()
//       .get('[data-testid="Frau"]')
//       .click()
//       .get('form input[name="firstName"]')
//       .type('first name')
//       .get('form input[name="lastName"]')
//       .type('last name')
//       .get('form input[name="email"]')
//       .type('test@test.de')
//       .get('form input[name="phone"]')
//       .type('1234567890')
//       .get('form input[name="acceptedTerms"]')
//       .click()
//       .get('[data-testid="contact-details-form-submit"]')
//       .click();

//     cy.wait('@createLead').then((ctx) => {
//       expect(ctx.request.body).to.deep.equal({
//         domain: 'localhost:3000',
//         contact: {
//           postalCode: '22303',
//           city: 'Hamburg Winterhude',
//           salutation: 'Frau',
//           firstName: 'first name',
//           lastName: 'last name',
//           email: 'test@test.de',
//           phone: '1234567890',
//           acceptedTerms: true,
//         },
//         questionnaireResults: [
//           {
//             question: 'Was möchten Sie fliesen?',
//             answer: 'Sonstiges',
//           },
//           {
//             question: 'Ist das Objekt im Neubauzustand?',
//             answer: 'Ja',
//           },
//         ],
//       });

//       cy.get('h1').should(
//         'have.text',
//         'Ihre Anfrage wurde erfolgreich übermittelt.',
//       );
//     });
//   });
// });
