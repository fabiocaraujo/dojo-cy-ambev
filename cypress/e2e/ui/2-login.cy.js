/// <reference types="cypress" />
import usuario from "../../fixtures/usuario.json";
import usuarios from "../../fixtures/usuarios.json";

describe('Funcionalidade: Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Deve fazer login com sucesso - Custom Command', () => {
    cy.login('fabio@teste.com', 'teste@123')
    cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo Fabio')
    cy.get('#root').should('contain', 'Você não tem um perfil criado, por favor adicione algumas informações')

  });
  
  it('Deve fazer login com sucesso', () => {
    cy.loginApp('fabio@teste.com', 'teste@123')
    cy.visit('dashboard')
    cy.screenshot()
    cy.get('[data-test="dashboard-welcome"]').should('contain', ' Bem-vindo Fabio')
  });

  it('Deve fazer login com sucesso - Usando Fixture', () => {
    cy.fixture('usuario').then((usr) =>{
      cy.login(usr.email, usr.senha)
    })
    cy.visit('dashboard')
    cy.get('[data-test="dashboard-welcome"]').should('contain', ' Bem-vindo Fábio')
  });

  it('Deve fazer login com sucesso - Usando massa importada', () => {
    cy.login(usuario.email, usuario.senha)
    cy.visit('dashboard')
    cy.get('[data-test="dashboard-welcome"]').should('contain', ' Bem-vindo ' + usuario.nome)
  });

  it('Deve fazer login com sucesso - Usando massa importada array', () => {
    cy.login(usuarios[1].email, usuarios[1].senha)
    cy.visit('dashboard')
    cy.get('[data-test="dashboard-welcome"]').should('contain', ' Bem-vindo ' + usuarios[1].nome)
  });

  it.only('deve fazer login com sucesso - Usando App Actions', () => {
    cy.loginAPP('fabio@teste.com', 'teste@123')
    cy.visit('criar-perfil')
  });

  it('deve fazer login com sucesso', () => {
    cy.login('fabio@teste.com', 'teste@123')
    cy.visit('criar-perfil')
  });

})
