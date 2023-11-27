'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate:{
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        afterStart(value) {
          if (value.getTime() < this.startDate.getTime()) {
            throw new Error("endDate must be after startDate");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
