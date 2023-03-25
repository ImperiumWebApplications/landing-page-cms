// describe('Navigation', () => {
//   beforeEach(() => {
//     cy.viewport('iphone-x').visitWithConsentCookie('/');
//   });

//   it('should navigate correctly', () => {
//     cy.get('[aria-label="Mobile Navigation Toggle"]')
//       .click()
//       .get('[aria-label="sidebar"]')
//       .should('be.visible')
//       .get('[aria-label="sidebar"] nav > a')
//       .first()
//       .should('have.class', 'text-secondary')
//       .get('[aria-label="Mobile Navigation Toggle"]')
//       .click()
//       .get('[aria-label="sidebar"]')
//       .should('not.be.visible')
//       .get('footer nav > a')
//       .last()
//       .click()
//       .assertUrl('/datenschutz')
//       .get('#privacy')
//       .should('be.visible');
//   });
// });
