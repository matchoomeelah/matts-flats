'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A Spot belongs to one User (the owner)
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        otherKey: 'id',
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
    address:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
    },
    lng: {
      type: DataTypes.DECIMAL,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
