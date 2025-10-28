/**
 * Database Connection Manager
 * Handles connections to both MongoDB and PostgreSQL
 * PostgreSQL stores user and project metadata
 * MongoDB stores flexible project content (JSON structure)
 */

let connections = {
  mongodb: false,
  postgresql: false,
};

const connect = async () => {
  try {
    // Connect to both databases for hybrid approach
    // PostgreSQL for structured metadata
    const { connectPostgreSQL } = require('./postgresql');
    await connectPostgreSQL();
    connections.postgresql = true;
    console.log('Connected to PostgreSQL database');

    // MongoDB for flexible project content
    const { connectMongoDB } = require('./mongodb');
    await connectMongoDB();
    connections.mongodb = true;
    console.log('Connected to MongoDB database');

    console.log('All databases connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

const disconnect = async () => {
  try {
    if (connections.mongodb) {
      const { disconnectMongoDB } = require('./mongodb');
      await disconnectMongoDB();
      connections.mongodb = false;
    }

    if (connections.postgresql) {
      const { disconnectPostgreSQL } = require('./postgresql');
      await disconnectPostgreSQL();
      connections.postgresql = false;
    }

    console.log('All databases disconnected');
  } catch (error) {
    console.error('Database disconnection error:', error);
    throw error;
  }
};

const getConnections = () => connections;

module.exports = {
  connect,
  disconnect,
  getConnections,
};
