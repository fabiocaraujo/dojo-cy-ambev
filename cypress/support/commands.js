// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })


Cypress.Commands.add('login', (email, senha) => {
    cy.visit('/login')
    cy.get('[data-test="login-email"]').type(email)
    cy.get('[data-test="login-password"]').type(senha)
    cy.get('[data-test="login-submit"]').click()
})

Cypress.Commands.add('cadastro', (nome, email, senha, confirmaSenha) => {
    cy.get('[data-test="register-name"]').type(nome)
    cy.get('[data-test="register-email"]').type(email)
    cy.get('[data-test="register-password"]').type(senha)
    cy.get('[data-test="register-password2"]').type(confirmaSenha)
    cy.get('[data-test="register-submit"]').click()
})

Cypress.Commands.add('loginApp', (usuario, senha) => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: {
            "email": usuario,
            "password": senha
        }
    }).then((response) => {
        return response.body.jwt
    })
})

Cypress.Commands.add('addPerfilApp', () => {
    cy.request({
        method: 'POST',
        url: ('api/profile'),
        body: {
            "status": "Especialista em QA",
            "company": "App Via",
            "website": "http://www.app.com",
            "location": "São Paulo",
            "skills": "App,c#,Java,JS,ruby",
            "githubusername": "appfabio",
            "bio": "Descrição via app actions",
            "twitter": "",
            "facebook": "",
            "linkedin": "",
            "youtube": "",
            "instagram": "",
            "medium": ""
        }
    }).should((resp) => {
        expect(resp.status).to.equal(201)
    })
})

Cypress.Commands.add('loginApi', (usuario, senha) => {
    cy.request({
        method: 'POST', 
        url: 'api/auth', 
        body: {
            email: usuario,
            password: senha
        }
    }).then((response) =>{
        expect(response.statusText).to.eq('OK')
        return response.body.jwt
    })
})


Cypress.Commands.add('getToken', (usuario, senha) => {
    cy.request({
        method: 'POST', 
        url: 'api/auth', 
        body: {
            email: usuario,
            password: senha
        }
    }).then((response) =>{
        expect(response.statusText).to.eq('OK')
        return response.body.jwt
    }) 
})

Cypress.Commands.add('criarPost', (token, texto) => {
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
    })
})



