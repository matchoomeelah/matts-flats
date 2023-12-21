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
      },
      {
        spotId: 5,
        url: 'https://images.csmonitor.com/csm/2013/11/1101-luke-skywalker-home-tunisia.jpg?alias=standard_900x600',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://inhabitat.com/wp-content/blogs.dir/1/files/2012/07/save-lars-5.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://travel.spotcoolstuff.com/wp-content/uploads/2011/02/star-wars-hotel-m.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0DvYftysclX2r6yezhW3khogOX_yDeqGMvNzHSwdpw&s',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.pinimg.com/736x/cc/d3/83/ccd383ff052c910be451705ddf8f4c3e.jpg',
        preview: false
      },
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
