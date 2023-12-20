'use strict';
const {
  Model
} = require('sequelize');

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // A Spot belongs to one User (the owner)
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        otherKey: 'id',
        as: "Owner"
      });

      // A Spot can have many SpotImages
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        otherKey: 'id',
        onDelete: 'CASCADE',
        hooks: true
      });

      // A Spot can have many Bookings
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        otherKey: 'id',
        onDelete: 'CASCADE',
        hooks: true
      });

      // A Spot can have many Reviews
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        otherKey: 'id',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }

  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT(10,7),
      allowNull: false,
      validate: {
        min: -90.0,
        max: 90.0
      }
    },
    lng: {
      type: DataTypes.FLOAT(10,7),
      allowNull: false,
      validate: {
        min: -180.0,
        max: 180.0
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [0,50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
      // get() {
      //   return moment(this.dataValues.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      // }
    }
  }, {
    sequelize,
    modelName: 'Spot'
  });
  return Spot;
};
