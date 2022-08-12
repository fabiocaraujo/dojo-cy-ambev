
describe('Teste de api', () => {

    var dojo = {
        aula: "API", 
        duracao: 3, 
        ferramenta: "cypress",
        professor: "Fábio" 
    }

    var usuarios = [
        {
            "nome" : "Fábio",
            "idade" : 40,
            "estado": "São Paulo"
        },
        {
            "nome" : "Ana",
            "idade" : 30,
            "estado": "Rio de Janeiro"
        },
        {
            "nome" : "Flavio",
            "idade" : 20,
            "estado": "Bahia"
        }
    ]

    var num = [0,2,4,6,8,10]
    it('Testar Dojo', () => {
        cy.log(dojo.duracao)
        cy.log(dojo.length)
        cy.log(dojo.professor.length)
        expect(dojo.professor).to.equal("Fábio")
    });

    it('Testar Num', () => {
        expect(num).to.contains(0)
        cy.log(num[2])
        expect(num.length).to.eql(6)
    });

    it('Testar usuarios', () => {
        expect(usuarios[0].nome).to.eq("Fábio")
        expect(usuarios.length).to.eq(3)
        expect(usuarios[1].nome).to.contains("An")
        cy.log(usuarios[0].idade) //.to.equal(40)
    });
});