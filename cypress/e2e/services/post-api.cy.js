/// <reference types="cypress" />

import txt from "../../fixtures/posts.json";
import dadosFake from "../../support/utils/faker";

describe('Funcionalidade: Post via API', () => {
let token
    beforeEach(() => {
       cy.getToken('ana@p.com', 'teste@123').then((tkn) => {
            token = tkn
       })
    });
    it('Deve criar um post com sucesso', () => {
        let texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        cy.request({
            method: 'POST', 
            url: 'api/posts', 
            headers: {
                Cookie: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkZTFkZWIzMGJlZTcwMDE1MzM4YmViIn0sImlhdCI6MTY1ODk4MTc2MiwiZXhwIjoxNjU4OTg1MzYyfQ._lidlkzYGCqkGmFlvkuEFeRwJDpbJARL39e7A4N4y8k"
            }, 
            body: {
                text: texto
            }
        }).should((response) =>{
            expect(response.status).to.equal(201)
            expect(response.body.text).to.equal(texto)
        })
    });

    it('Deve criar um post com sucesso - Token dinâmico e texto faker', () => {

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

    it('Deve criar um post com sucesso - Massa aleatória do json', () => {
        // https://docs.cypress.io/api/utilities/_
        var randon = Cypress._.random(txt.length -1)
        cy.log(txt[randon].textos)

       cy.request({
            method: 'POST', 
            url: 'api/posts', 
            headers: {
                Cookie: token
            }, 
            body: {
                text: txt[randon].textos
              }
        }).should((response) =>{
            expect(response.status).to.equal(201)
            expect(response.body.text).to.equal(txt[randon].textos)
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

    it.only('Deve deletar um post com sucesso', () => {
        cy.criarPost(token, 'texto para deletar')
        .then((resp) =>{
            let id = resp.body._id
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

    it.only('Deve curtir um post com sucesso', () => {
        cy.criarPost(token, 'texto para Curtir')
        .then((resp) =>{
            let id = resp.body._id
            cy.request({
                method: 'PUT', 
                url: `api/posts/like/${id}`,
                headers: {
                    Cookie: token
                }
            }).should((resp) =>{
                expect(resp.status).to.equal(200)
                expect(resp.body.msg).contains('Post curtido')
                //aqui vai dar erro pq a documentação diz uma coisa e aplicação faz outra na msg
            })
        })
    });
});