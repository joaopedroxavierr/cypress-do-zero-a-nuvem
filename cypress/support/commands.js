Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
        firstName: 'Carlos',
        lastName: 'Xavier',
        email: 'Carlos@tat.com',
        text: 'Teste.'
      }) => {
    cy.get('input[name="firstName"]').type(data.firstName);
    cy.get('input[name="lastName"]').type(data.lastName);
    cy.get('input#email[name="email"]').type(data.email);
    cy.get('textarea[name="open-text-area"]').type(data.text);
    cy.contains('button','Enviar').click();
})