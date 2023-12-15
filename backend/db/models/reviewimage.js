'use strict';
const {
  Model
} = require('sequelize');

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      // A ReviewImage belongs to a single Review
      ReviewImage.belongsTo(models.Review, {
        foreignKey: 'reviewId',
        otherKey: 'id'
      });
    }
  }
  ReviewImage.init({
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      // get() {
      //   return moment(this.dataValues.createdAt).format('YYYY-MM-DD HH:mm:ss');
      // }
    },
    updatedAt: {
      type: DataTypes.DATE,
      // get() {
      //   return moment(this.dataValues.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      // }
    }
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
