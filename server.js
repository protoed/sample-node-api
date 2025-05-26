/**
 * server.js
 *
 * Entry point for the Express application:
 *  - Initializes the database
 *  - Sets up middleware
 *  - Mounts the routes
 *  - Starts the server
 */

const express = require('express');
const bodyParser = require('body-parser');
const { initDb } = require('./db');
const taskRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Mount task routes under /api
app.use('/api', taskRoutes);

// Initialize DB, then start the server
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
  });

module.exports = app; // Export app for testing
