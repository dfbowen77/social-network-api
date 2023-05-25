// Imports the necessary packages. 
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// configures express
const PORT = process.env.PORT || 3001;
const app = express();

// Specifies the middleware the app uses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Defines the routes the app uses 
app.use(routes);

// Connects to the MongoDB database and starts the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for the social network is running on port ${PORT}!`);
  });
});