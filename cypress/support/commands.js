Cypress.Commands.add( 'efetuarLogin', (name, pass) => {
    cy.visit('https://projeto38.vercel.app/');
    cy.get('#name').type(name);
    cy.get('#pass').type(pass);
    cy.get('.sc-bBrOHt').click();
});
