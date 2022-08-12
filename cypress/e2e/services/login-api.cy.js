/// <reference types="cypress" />

describe('Funcionalidade: Login via API', () => {
    it('Deve fazer login com sucesso e gerar token de acesso', () => {
        cy.request({
            method: 'POST', 
            url: 'api/auth', 
            body: {
                "email": "fabio@teste.com",
                "password": "teste@123"
            }
        }).should((response) =>{
            //cy.log(response.body.jwt)
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('jwt')
            expect(response.duration).be.lessThan(400)
            expect(response.statusText).to.eq('OK')
        })
    });

    it.only('Login usando Comando customizado', () => {
        cy.loginApi('fabio@teste.com', 'teste@123')
    });
});