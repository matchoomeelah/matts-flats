'use strict';

// Set Schema and Table name on options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "SpotImages"


const { SpotImage } = require('../models');
const { Op } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Seeding intial data
  async up (queryInterface, Sequelize) {
    SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "mypic.png",
        preview: true
      },
      {
        spotId: 2,
        url: "yourpic.png",
        preview: true
      },
      {
        spotId: 3,
        url: "ourpic.png",
        preview: true
      }
    ] ,{validate: true})
  },
  // Un-seeding the initial data
  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: [1, 2, 3]
      }
    });
  }
};
