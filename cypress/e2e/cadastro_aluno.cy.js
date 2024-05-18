/// <reference types="Cypress" />

import { alunos } from '../fixtures/alunos.json'
import { faker } from '@faker-js/faker'

describe('Casos de teste para cadastro de aluno', () => {

  beforeEach(() => {
    cy.efetuarLogin('admin', 'admin@123');

    //entra na tela de cadastro
    cy.get('.sc-dIUfKc').click();
  });

  it('Deve cadastrar o aluno quando dados forem validos', () => {
    let numeroAluno = 0;
    const listaDeAlunos = [];

    alunos.forEach(aluno => {
      const nomeAluno = faker.lorem.words(3).toUpperCase();

      //cadastra o aluno
      cy.get('#name').type(nomeAluno);
      cy.get('#cpf').type(aluno.cpf);
      cy.get('#email').type(aluno.email);
      cy.get('#phone').type(aluno.telefone);
      cy.get('#classe').select(aluno.turma);
      cy.get('.sc-fKFygU').click();

      //guarde as informacoes de para verificar se ele foi cadastrado
      listaDeAlunos[numeroAluno] = {nomeAluno: nomeAluno, email: aluno.email};
    });

    //volta para a tela de consulta
    cy.get('.sc-iJuWdM > a').click();

    //assert
    listaDeAlunos.forEach(aluno => {
      cy.contains(aluno.nomeAluno).should('be.visible');
      cy.contains(aluno.email).should('be.visible');
    })
  });
});
