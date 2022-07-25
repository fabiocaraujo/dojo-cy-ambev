/// <reference types="cypress" />
const faker = require('faker-br');
import dataFake from "../support/utils/faker";

describe('Funcionalidade: Cadastro', () => {
    beforeEach(() => {
        cy.visit('cadastrar')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it.skip('Deve fazer o cadastro com sucesso', () => {
        cy.get('[data-test="register-name"]').type('Ana')
        cy.get('[data-test="register-email"]').type('ana@ambev.com')
        cy.get('[data-test="register-password"]').type('teste@123')
        cy.get('[data-test="register-password2"]').type('teste@123')
        cy.get('[data-test="register-submit"]').click()

        cy.get('[data-test="dashboard-welcome"]').should('contain', ' Bem-vindo Ana')
    });

    it('Deve fazer o cadastro com sucesso - Faker', () => {
        let nome = faker.name.findName();
        let email = faker.internet.email(nome);

        cy.get('[data-test="register-name"]').type(nome)
        cy.get('[data-test="register-email"]').type(email)
        cy.get('[data-test="register-password"]').type('teste@123')
        cy.get('[data-test="register-password2"]').type('teste@123')
        cy.get('[data-test="register-submit"]').click()
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo ' + nome)
    });

    it('Deve fazer o cadastro com sucesso - Comando Customizado', () => {
        cy.cadastro(dataFake.nome(), dataFake.email(), 'teste@123', 'teste@123')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Deve validar erro quando cadastrar com email repetido', () => {
        let nome = dataFake.nome()
        let email = dataFake.email()

        cy.cadastro(nome, email, 'teste@123', 'teste@123')
        
        cy.get('[data-test="navbar-logout"]').click()
        cy.visit('cadastrar')
        
        cy.cadastro(nome, email, 'teste@123', 'teste@123')
        cy.get('[data-test="alert"]').should('contain', 'Usuário já registrado')
    });

    it('Deve validar msg de erro de email com formato inválido', () => {
        cy.cadastro('Fábio', 'email_invalido', 'teste@123', 'teste@123')
        cy.get('.MuiFormHelperText-root').should('contain', 'Digite um email válido')
    });
});

