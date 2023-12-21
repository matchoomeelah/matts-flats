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
      address: "6168 Yeadon Way",
      city: "San Jose",
      state: "California",
      country: "United States of America",
      lat: 37.237779444982415,
      lng: -121.79651186075105,
      name: "My old house",
      description: "A house i used to live in",
      price: 200.49,
    },
    {
      ownerId: 1,
      address: "123 Easy Street",
      city: "EasyVille",
      state: "North Easy",
      country: "New Easyland" ,
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
      state: "New York",
      country: "United States of America",
      lat: 40.731277827027064,
      lng: -73.97902837962947,
      name: "StuyTown apt",
      description: "A place I used to love",
      price: 2000,
    },
    {
      ownerId: 2,
      address: "1424 Hillsborough Blvd",
      city: "Brentwood",
      state: "California",
      country: "United States of America",
      lat: 50,
      lng: 50,
      name: "Big House",
      description: "It's a big house",
      price: 100,
    },
    {
      ownerId: 5,
      address: "1 Desert Way",
      city: "Lars Farm",
      state: "Tatooine",
      country: "Outer Rim",
      lat: 0,
      lng: 0,
      name: "Tatooine Dream",
      description: "This sandy home is an absolute Tatooine Dream! My aunt and uncle raised me here, and I used to watch the double sunset every day. Old Ben Kenobi used to roam these parts too until I found out he was actually a Jedi and the EMPIRE decided to burn up my family LOLOL, life is CRAZY!! Don't worry though, I took care of them and I haven't had any incidents like that one since I've been the owner. Let me know if you want to SKYwalk a mile in my shoes!",
      price: 100,
    },

   ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
        address: {
          [Op.in]: ["6168 Yeadon Way","123 Easy Street", "521 E 14th Street"]
        }
    });
  }
};
