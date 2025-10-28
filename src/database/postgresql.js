/**
 * PostgreSQL Database Connection using Sequelize
 */

const { Sequelize } = require('sequelize');
const config = require('../config');

let sequelize = null;

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
    console.log('PostgreSQL disconnected successfully');
  } catch (error) {
    console.error('PostgreSQL disconnection failed:', error);
    throw error;
  }
};

const getSequelize = () => sequelize;

module.exports = {
  connectPostgreSQL,
  disconnectPostgreSQL,
  getSequelize,
  Sequelize,
};
