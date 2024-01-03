'use strict';
const {
  Model
} = require('sequelize');

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {

    static associate(models) {
      SpotImage.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        otherKey: 'id'
      });
    }
  }
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    preview: {
      type: DataTypes.BOOLEAN
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
    modelName: 'SpotImage',
  });
  return SpotImage;
};
