/**
 * Ai-bilder - Main application entry point
 * SaaS AI No-Code Website & Mobile Builder
 */

const config = require('./config');
const createApp = require('./app');
const database = require('./database');

/**
 * Start the application
 */
const start = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('Starting Ai-bilder...');
    // eslint-disable-next-line no-console
    console.log(`Environment: ${config.env}`);

    // Connect to database
    await database.connect();

    // Create Express app
    const app = createApp();

    // Start server
    const server = app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Ai-bilder API server listening on port ${config.port}`);
      // eslint-disable-next-line no-console
      console.log(`API URL: ${config.apiUrl}`);
      // eslint-disable-next-line no-console
      console.log('Press Ctrl+C to stop');
    });

    // Graceful shutdown
    const gracefulShutdown = async () => {
      // eslint-disable-next-line no-console
      console.log('\nShutting down gracefully...');
      
      server.close(async () => {
        // eslint-disable-next-line no-console
        console.log('HTTP server closed');
        
        try {
          await database.disconnect();
          // eslint-disable-next-line no-console
          console.log('Database disconnected');
          process.exit(0);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error during shutdown:', error);
          process.exit(1);
        }
      });

      // Force shutdown after 30 seconds
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.error('Forcefully shutting down');
        process.exit(1);
      }, 30000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

    return server;

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start application:', error);
    process.exit(1);
  }
};

// Start if running directly
if (require.main === module) {
  start();
}

module.exports = start;
