/// <reference types="cypress" />

describe('Funcionalidade: Criar perfil', () => {
    beforeEach(() => {
        cy.login('fabio@ambev.com', 'teste@123')
        //cy.loginApp('fabio@ambev.com', 'teste@123')
        cy.visit('criar-perfil')
    });
    
    it('Deve criar perfil com sucesso', () => {
        cy.get('#mui-component-select-status').click()
        cy.contains('Especialista em QA').click()
        cy.get('[data-test="profile-company"]').type('Via')
        cy.get('[data-test="profile-webSite"]').type('http://www.viahub.com')
        cy.get('[data-test="profile-location"]').type('São Paulo')
        cy.get('[data-test="profile-skills"]').type('c#, Java, JS, ruby')
        cy.get('[data-test="profile-gitHub"]').type('fabioaraujo')
        cy.get('[data-test="profile-bio"]').type('Olá, sou o Fábio...')
        //cy.get('[data-test="profile-socials"]').click()
        cy.get('[data-test="profile-submit"]').click()
        cy.get('[data-test="dashboard-editProfile"]').should('exist')
    });
});
