describe('Frontpage E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render front page', () => {
    expect(true).to.be.eq(true);
  });
});
