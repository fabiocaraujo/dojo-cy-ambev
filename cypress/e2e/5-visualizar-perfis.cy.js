/// <reference types="cypress" />

describe('Funcionalidade: Visualizar perfis', () => {
    beforeEach(() => {
        cy.visit('perfis')
    });

    it('Deve visualizar o primeiro perfil de uma lista', () => {
        cy.get('[data-test="profile-viewMore"]').first().click()
        cy.get('[data-test="profileTop-avatar"]').should('exist') 
    });

    it('Deve visualizar o último perfil de uma lista', () => {
        cy.get('[data-test="profile-viewMore"]').last().click()
        cy.get('[data-test="profileTop-avatar"]').should('exist') 
    });

    it('Deve visualizar o 4 perfil de uma lista array', () => {
        cy.get('[data-test="profile-viewMore"]').eq(4).click()
        cy.get('[data-test="profileTop-avatar"]').should('exist') 
    });

    it('Deve navegar na paginação', () => {
        cy.get('.paginationBttns [role="button"]').eq(4).click()
        cy.get('[data-test="profile-avatar"]').should('exist') 
    });
});