'use strict';
const {
  Model
} = require('sequelize');

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
      // A booking belongs to one Spot
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        otherKey: 'id'
      });

      // A booking belongs to one User
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        otherKey: 'id'
      });
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    endDate:{
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
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
    modelName: 'Booking',
  });
  return Booking;
};
