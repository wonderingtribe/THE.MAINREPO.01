/**
 * User Model (PostgreSQL)
 * Represents user accounts with metadata stored in PostgreSQL
 */

const { DataTypes } = require('sequelize');

const defineUserModel = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'users',
      timestamps: false,
      underscored: true,
    }
  );

  return User;
};

module.exports = defineUserModel;
