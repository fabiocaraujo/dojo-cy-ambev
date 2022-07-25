/// <reference types="cypress" />
//import posts from "../../fixtures/posts.json";
import dadosFake from "../../support/utils/faker";

describe('Funcionalidade: Post via API', () => {
let token
    beforeEach(() => {
       cy.getToken('ana@p.com', 'teste@123').then((tkn) => {
            token = tkn
       })
    });
    it('Deve criar um post com sucesso', () => {
        cy.request({
            method: 'POST', 
            url: 'api/posts', 
            headers: {
                Cookie: "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkZTFkZWIzMGJlZTcwMDE1MzM4YmViIn0sImlhdCI6MTY1ODcyMzgyOCwiZXhwIjoxNjU4NzI3NDI4fQ.UWOHatXyaFOtkVXknmQSoggQyVUULEnKoqwJpChKxn0"
            }, 
            body: {
                text: "Texto para post"
              }
        }).should((response) =>{
            expect(response.status).to.equal(201)
            expect(response.body.text).to.equal("Texto para post")
        })
    });

    it('Deve criar um post com sucesso - Token dinâmico', () => {

        let texto = dadosFake.textosPosts()
        cy.request({
            method: 'POST', 
            url: 'api/posts', 
            headers: {
                Cookie: token
            }, 
            body: {
                text: texto
              }
        }).should((response) =>{
            expect(response.status).to.equal(201)
            expect(response.body.text).to.equal(texto)
        })
    });

    it('Deve deletar um post com sucesso', () => {
        cy.request('api/posts').then((resp) =>{
            let id = resp.body[0]._id
            cy.request({
                method: 'DELETE', 
                url: `api/posts/${id}`,
                headers: {
                    Cookie: token
                }
            }).should((resp) =>{
                expect(resp.status).to.equal(200)
                expect(resp.body.msg).contains('Post removido')
            })
        })
    });
});