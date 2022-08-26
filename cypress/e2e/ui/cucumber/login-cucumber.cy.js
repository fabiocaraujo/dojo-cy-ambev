describe('Funcionalidade: Login', () => {

    context('Dado que eu esteja na página de Login', () => {
        before(() => {
            cy.visit('login')
        });

        context('Quando eu inserir usuário e senha', () => {
            beforeEach(() => {
                cy.login('fabio@teste.com', 'teste@123')
            });

            it('Então deve exibir a mensagem de boas vindas no Dashboard', () => {
                cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo Fabio')
            });
        });
    });
});