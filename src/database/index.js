/**
 * Database Connection Manager
 * Handles connection to either MongoDB or PostgreSQL based on configuration
 */

const config = require('../config');

let db = null;

const connect = async () => {
  const dbType = config.database.type;

  try {
    if (dbType === 'mongodb') {
      const { connectMongoDB } = require('./mongodb');
      await connectMongoDB();
      db = 'mongodb';
    } else if (dbType === 'postgresql') {
      const { connectPostgreSQL } = require('./postgresql');
      await connectPostgreSQL();
      db = 'postgresql';
    } else {
      throw new Error(`Unsupported database type: ${dbType}`);
    }
    // eslint-disable-next-line no-console
    console.log(`Connected to ${dbType} database`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database connection error:', error);
    throw error;
  }
};

const disconnect = async () => {
  try {
    if (db === 'mongodb') {
      const { disconnectMongoDB } = require('./mongodb');
      await disconnectMongoDB();
    } else if (db === 'postgresql') {
      const { disconnectPostgreSQL } = require('./postgresql');
      await disconnectPostgreSQL();
    }
    db = null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database disconnection error:', error);
    throw error;
  }
};

module.exports = {
  connect,
  disconnect,
};
