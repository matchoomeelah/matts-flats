'use strict';

const { Spot } = require('../models');
const { Op } = require('sequelize');

// Set Schema and Table name on options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Spots";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: "6168 Yeadon Wy",
      city: "San Jose",
      state: "CA",
      country: "USA",
      lat: 37.237779444982415,
      lng: -121.79651186075105,
      name: "My old house",
      description: "A house i used to live in",
      price: 200.49,
    },
    {
      ownerId: 2,
      address: "123 Easy Street",
      city: "EasyVille",
      state: "EZ",
      country: "NZ" ,
      lat: -42.02394259956463,
      lng: 173.35128016809008,
      name: "Easy House",
      description: "The easiest place in the world!",
      price: 100,
    },
    {
      ownerId: 2,
      address: "521 E 14th Street",
      city: "New York",
      state: "NY",
      country: "USA",
      lat: 40.731277827027064,
      lng: -73.97902837962947,
      name: "StuyTown apt",
      description: "A place I used to love",
      price: 2000,
    }
   ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
        address: {
          [Op.in]: ["6168 Yeadon Wy","123 Easy Street", "521 E 14th Street"]
        }
    });
  }
};
