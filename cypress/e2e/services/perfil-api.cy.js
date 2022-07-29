/// <reference types="cypress" />
import perfil from "../../fixtures/perfil.json";

describe('Funcionalidade: Perfil via API', () => {
let token
    beforeEach(() => {
       cy.getToken('ana@p.com', 'teste@123').then((tkn) => {
            token = tkn
       })
    });
  
    it('Deve criar um perfil com sucesso', () => {
        cy.request({
            method: 'POST', 
            url: 'api/profile', 
            headers: {
                Cookie: token
            }, 
            body: perfil
                  
        }).should((response) =>{
            expect(response.status).to.equal(200)
            expect(response.body.company).to.equal(perfil.company)
            //expect(response).to.equal('Perfil do usuário atualizado')
        })
    });

    Cypress.Commands.add('criarPerfil', (perfil) => {
        cy.request({
            method: 'POST', 
            url: 'api/profile', 
            headers: {
                Cookie: token
            }, 
            body: perfil
                  
        }).should((response) =>{
            expect(response.status).to.equal(200)
        })
    });

    it.skip('Deve deletar perfil com sucesso', () => {
        cy.criarPerfil(perfil)
        .then((response) => {
            let id = response.body._id

            cy.request({
                method: 'DELETE', 
                url: 'api/profile', 
                headers: {
                    Cookie: token
                }
                      
            }).should((response) =>{
                expect(response.status).to.equal(200)
                //expect(response).to.equal('Perfil do usuário atualizado')
            })
        })
        
    });

});