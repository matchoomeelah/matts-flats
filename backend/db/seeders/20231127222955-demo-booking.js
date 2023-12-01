'use strict';

const { Booking } = require('../models');
const { Op } = require('sequelize');

// Set Schema and Table name on options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Bookings"



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-12-05',
        endDate: '2023-12-06'
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '2024-01-05',
        endDate: '2024-02-21'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2024-01-05',
        endDate: '2024-01-06'
      }
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
