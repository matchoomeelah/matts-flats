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
        email: 'Grogu_GaGa@spacebook.io',
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
        hashedPassword: bcrypt.hashSync('i<3yoda!'),
        firstName: "Luke",
        lastName: "Skywalker"
      },
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
