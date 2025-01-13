/// <reference types="cypress" />
it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./cypress-do-zero-a-nuvem/src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  });