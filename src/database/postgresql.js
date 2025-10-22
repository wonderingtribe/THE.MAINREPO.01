/**
 * PostgreSQL Database Connection using Sequelize
 */

const { Sequelize } = require('sequelize');
const config = require('../config');

let sequelize = null;

const connectPostgreSQL = async () => {
  if (sequelize) {
    // eslint-disable-next-line no-console
    console.log('Using existing PostgreSQL connection');
    return sequelize;
  }

  try {
    const { host, port, database, username, password } = config.database.postgres;

    sequelize = new Sequelize(database, username, password, {
      host,
      port,
      dialect: 'postgres',
      // eslint-disable-next-line no-console
      logging: config.env === 'development' ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('PostgreSQL connected successfully');

    return sequelize;
  } catch (error) {
    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.log('PostgreSQL disconnected successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
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
