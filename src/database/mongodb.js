/**
 * MongoDB Database Connection
 */

const mongoose = require('mongoose');
const config = require('../config');

let isConnected = false;

const connectMongoDB = async () => {
  if (isConnected) {
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
    console.log('MongoDB connected successfully');

    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
    });
  } catch (error) {
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
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    console.error('MongoDB disconnection failed:', error);
    throw error;
  }
};

module.exports = {
  connectMongoDB,
  disconnectMongoDB,
  mongoose,
};
