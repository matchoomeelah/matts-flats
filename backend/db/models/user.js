'use strict';
const { Model, Validator } = require('sequelize');
const moment = require('moment');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // A user can have many Spots
      User.hasMany(models.Spot, {
        foreignKey: 'ownerId',
        otherKey: 'id',
        onDelete: 'CASCADE',
        hooks: true
      });

      // A user can have many Bookings
      User.hasMany(models.Booking, {
        foreignKey: 'userId',
        otherKey: 'id',
        onDelete: 'CASCADE',
        hooks: true
      });

      // A user can have many Reviews
      User.hasMany(models.Review, {
        foreignKey: 'userId',
        otherKey: 'id',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "firstName", "lastName", "createdAt", "updatedAt"]
        }
      }
    }
  );
  return User;
};
