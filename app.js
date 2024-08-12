const express = require('express');
const cors = require('cors')
const config = require('./config')
const router = require('./network/routes')
const connectDB = require('./db')

const createApp = () => {
  const app = express();
  connectDB(config.dbUrl);
  app.use( cors() )
  app.use(express.json())
  router(app);
  return app;
};

module.exports = createApp;
