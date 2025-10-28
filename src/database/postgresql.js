/**
 * PostgreSQL Database Connection using Sequelize
 */

const { Sequelize } = require('sequelize');
const config = require('../config');

let sequelize = null;
let models = {};

const connectPostgreSQL = async () => {
  if (sequelize) {
    console.log('Using existing PostgreSQL connection');
    return sequelize;
  }

  try {
    const { host, port, database, username, password } = config.database.postgres;

    sequelize = new Sequelize(database, username, password, {
      host,
      port,
      dialect: 'postgres',
      logging: config.env === 'development' ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully');

    // Initialize models
    const defineUserModel = require('../models/UserPostgres');
    const defineProjectModel = require('../models/ProjectPostgres');

    models.User = defineUserModel(sequelize);
    models.Project = defineProjectModel(sequelize);

    // Set up associations
    models.User.hasMany(models.Project, {
      foreignKey: 'user_id',
      as: 'projects',
    });
    models.Project.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    // Sync models (create tables if they don't exist)
    // In production, use migrations instead
    if (config.env === 'development') {
      await sequelize.sync({ alter: false });
      console.log('PostgreSQL models synchronized');
    }

    return sequelize;
  } catch (error) {
    console.error('PostgreSQL connection failed:', error);
    throw error;
  }
};

const disconnectPostgreSQL = async () => {
  if (!sequelize) {
    return;
  }

  try {
    await sequelize.close();
    sequelize = null;
    models = {};
    console.log('PostgreSQL disconnected successfully');
  } catch (error) {
    console.error('PostgreSQL disconnection failed:', error);
    throw error;
  }
};

const getSequelize = () => sequelize;
const getModels = () => models;

module.exports = {
  connectPostgreSQL,
  disconnectPostgreSQL,
  getSequelize,
  getModels,
  Sequelize,
};
