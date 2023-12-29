'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Demo",
        lastName: "Lition"
      },
      {
        email: 'Baby_Yoda@spacebook.io',
        username: 'Baby_Yoda',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Grogu",
        lastName: "Din"
      },
      {
        email: 'yoyo@space.io',
        username: 'TheRealYodaBaby',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Yoda",
        lastName: "Pagoda"
      },
      {
        email: 'jabbajuice@space.io',
        username: 'JabbaJuice',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Jabba",
        lastName: "The Hut"
      },
      {
        email: 'lando@space.io',
        username: 'Lando-the-free',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Lando",
        lastName: "Calrissian"
      },
      {
        email: 'lukey@space.io',
        username: 'YoungLuke',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Luke",
        lastName: "Skywalker"
      },
      {
        email: "the_han_man@space.io",
        username: "big_solo_77",
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Han",
        lastName: "Solo"
      },
      {
        email: "old_ben@space.io",
        username: "good_ol_ben",
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Obi-Wan",
        lastName: "Kenobi"
      },
      {
        email: "darksiderules@space.io",
        username: "darthv",
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Darth",
        lastName: "Vader"
      },
      {
        email: "oberenko@space.io",
        username: "oberenko",
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Omar",
        lastName: "Berenko"
      },
      {
        email: "pamidala@space.io",
        username: "pamidala",
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Padme",
        lastName: "Amidala"
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'TheRealBabyYoda', 'FakeUser2'] }
    });
  }
};
