/**
 * MongoDB Database Connection
 */

const mongoose = require('mongoose');
const config = require('../config');

let isConnected = false;

const connectMongoDB = async () => {
  if (isConnected) {
    // eslint-disable-next-line no-console
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    };

    await mongoose.connect(config.database.mongodb.uri, options);
    isConnected = true;
    // eslint-disable-next-line no-console
    console.log('MongoDB connected successfully');

    mongoose.connection.on('error', err => {
      // eslint-disable-next-line no-console
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      // eslint-disable-next-line no-console
      console.log('MongoDB disconnected');
      isConnected = false;
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection failed:', error);
    throw error;
  }
};

const disconnectMongoDB = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    // eslint-disable-next-line no-console
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('MongoDB disconnection failed:', error);
    throw error;
  }
};

module.exports = {
  connectMongoDB,
  disconnectMongoDB,
  mongoose,
};
