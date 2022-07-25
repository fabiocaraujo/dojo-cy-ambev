const faker = require('faker-br');

class Faker {
    nome() { return `ambev ${faker.name.findName()}`
    }

    email() {
        return faker.internet.email(this.nome)
    }

    emailNum() {
        return `mail_ambev${Math.floor(Math.random() * 10000)}@ambev.com.br`
    }

    textosPosts() {
        return `Textos para posts: ${faker.random.words(50)}`
    }

}

module.exports = new Faker()