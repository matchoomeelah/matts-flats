'use strict';

const { Review } = require('../models');
const { Op } = require('sequelize');

// Set Schema and Table name on options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Reviews"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: "Pretty good" ,
        stars: 3
      },
      {
        spotId: 1,
        userId: 2,
        review: "Great!" ,
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: "AWESOME" ,
        stars: 5
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete(options, {
        spotId: {
          [Op.in]: [1, 2, 3]
        }
    });
  }
};
