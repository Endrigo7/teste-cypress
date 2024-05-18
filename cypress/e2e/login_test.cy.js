/// <reference types="Cypress" />

describe('Casos de teste para Login', () => {

  beforeEach(() => {
    cy.visit('https://projeto38.vercel.app/');
  });

  /*
  * GIVEN um usuario e senha valida
  * WHEN estiver na pagina de login 
  * AND clicar em ENTRAR
  * THEN deve realizar login
  * AND redirecionar para a pagina de consulta de alunos 
  */
  it('DEVE logar QUANDO usuario e senha forem validos', () => {
    cy.get('#name').type('admin');
    //cy.get('input[id="name"]').type('admin');

    cy.get('#pass').type('admin@123');
    //cy.get('input[id="pass"]').type('admin@123');

    cy.get('.sc-bBrOHt').click();
    //cy.get('.eAeqVi').click();

    //assetion
    cy.get('.sc-dQpIV').should('be.visible');
  });

  /*
  *
  */
  it('DEVE informar ao usuario senha deve ser preenchinda', () => {
    cy.get('#name').type('admin');
    cy.get('.sc-bBrOHt').click();

    //assertion
    cy.contains('(é necessário informar a senha)').should('be.visible');
  });

  /*
  *
  */
  it('DEVE informar usuario ou senha invalida QUANDo usuario ou senha for invalido', () => {
    cy.get('#name').type('admin');
    cy.get('#pass').type('xpto');
    cy.get('.sc-bBrOHt').click();

    //assertion
    cy.contains('(senha incorreta)').should('be.visible');
  });

  /*
  *
  */
  it('DEVE informar usuario e senha devem ser preenchidos', () => {
    cy.get('.sc-bBrOHt').click();

    //assertion
    cy.get('#name').should('be.empty');
    cy.get('#pass').should('be.empty');

    cy.contains('(é necessário informar o nome)').should('be.visible');
    cy.contains('(é necessário informar a senha)').should('be.visible');
  });
});