/// <reference types="Cypress" />

describe('Caso de teste para Tips', () => {

    beforeEach(() => {
        cy.efetuarLogin('admin', 'admin@123');
        cy.get(':nth-child(4) > .sc-eCstZk > span').click();
    });
    
    it('Simular quando o backend retona um erro.', () => {
        const mensagemDeErro = 'Error to fetch!!';
        
        cy.intercept('GET', 'https://api.adviceslip.com/advice', {
            statusCode: 500,
        }).as('stubTips');
        
        cy.get('.sc-AzfvX').click();
        cy.wait('@stubTips');

        //assert
        cy.get('.sc-khAlqs').should('have.value', mensagemDeErro);
    });

    it('Deve exibir Dica QUANDO backend retornar 200 OK', () => {
        const minhaDica = 'Trablhe duro e bem!!';
        
        cy.intercept('GET', 'https://api.adviceslip.com/advice', {
            statusCode: 200,
            body: {"slip": 
                    { 
                        "id": 88, 
                        "advice": minhaDica
                    }
                }
        }).as('stubTips');

        cy.get('.sc-AzfvX').click();
    
        //assert
        cy.wait('@stubTips').its('response.body.slip.advice').should('eq', minhaDica);
        cy.get('.sc-khAlqs').should('have.value', minhaDica);
    });
});