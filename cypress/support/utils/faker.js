const faker = require('faker-br');

class Faker {
    nome() { return `ambev ${faker.name.findName()}`
    }

    email() {
        return faker.internet.email()
    }

    emailNum() {
        return `mail_ambev${Math.floor(Math.random() * 10000)}@ambev.com.br`
    }

}

module.exports = new Faker()