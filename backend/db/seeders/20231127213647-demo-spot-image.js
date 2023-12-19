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
        url: "https://photos.zillowstatic.com/fp/e547addf4655d85da922497dc2901d47-cc_ft_960.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://archivaldesigns.com/cdn/shop/products/Peach-Tree-Front_1200x.jpg?v=1648224612",
        preview: true
      },
      {
        spotId: 3,
        url: "https://cdn-img-feed.streeteasy.com/nyc/image/2/427713602.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: 'https://photos.zillowstatic.com/fp/48c4590267ea48ab60bb4d1e6069914f-uncropped_scaled_within_1536_1152.webp',
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
