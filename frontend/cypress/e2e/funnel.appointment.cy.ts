describe('Funnel > Appointment', () => {
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

  it('should successfully submit appointment request', () => {
    cy.visitWithConsentCookie('/termin');
  });
});
