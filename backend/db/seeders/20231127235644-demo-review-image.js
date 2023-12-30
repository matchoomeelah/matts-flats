'use strict';

// Set Schema and Table name on options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "ReviewImages"

const { ReviewImage } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    ReviewImage.bulkCreate([
      // {
      //   reviewId: 1,
      //   url: 'pic1.jpg'
      // },
      // {
      //   reviewId: 1,
      //   url: 'pic2.jpg'
      // },
      // {
      //   reviewId: 2,
      //   url: 'pic3.jpg'
      // }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete(options, {
      reviewId: {
        [Op.in]: [1, 2]
      }
    })
  }
};
