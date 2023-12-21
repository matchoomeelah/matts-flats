'use strict';
const {
  Model
} = require('sequelize');

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A Review belongs to one Spot
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        otherKey: 'id'
      });

      // A Review belongs to one User
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        otherKey: 'id'
      });

      // A Review can have many ReviewImages
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        otherKey: 'id',
        onDelete: 'CASCADE',
        hooks: true
      })
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
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
    modelName: 'Review',
  });
  return Review;
};
