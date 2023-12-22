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
        userId: 3,
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
      {
        spotId: 2,
        userId: 3,
        review: "nah",
        stars: 1
      },
      {
        spotId: 5,
        userId: 2,
        review: "This was such a dessert (notice how I didn't say desert?). Truly it was a sweet spot. Gotta love the stone, and I mean, living in a hole? Who could beat it",
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: "I got sand in my slime.",
        stars: 1
      },
      {
        spotId: 5,
        userId: 4,
        review: "Annual Wookie Bash, can I get a HGHHGGGGHGGGHHGGHGGHHHGGHGHGHGGGGHGGHH. A pleasure and a treasure. But sup with those Jawas? I mean c'mon man. Go get your own trash. This trash is mine. Other than that, a real light in my life and I can't wait to be back next year.",
        stars: 5
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
