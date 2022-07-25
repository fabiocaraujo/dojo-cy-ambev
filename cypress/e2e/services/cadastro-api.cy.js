/// <reference types="cypress" />
import dadosFake from "../../support/utils/faker";

describe('Funcionalidade: Cadastro via API', () => {
   
    it.only('Deve fazer cadastro com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'api/users',
            body: {
                "name": "ana lucia",
                "email": "ana@p.com",
                "password": "teste@123"
            }
        }).should((response) => {
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property('jwt')
            expect(response.duration).be.lessThan(500)
        })
    });

    it('Deve fazer cadastro com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'api/users',
            body: {
                "name": dadosFake.nome(),
                "email": dadosFake.email(),
                "password": "teste@123"
            }
        }).should((response) => {
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property('jwt')
            expect(response.duration).be.lessThan(500)
        })
    });
});