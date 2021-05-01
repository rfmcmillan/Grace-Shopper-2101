const express = require('express');

const app = express();
module.exports = app;

const api = require('./api');

app.use(express.json());
// Routes Beginning With /Api
app.use('/api', api);

// Main Route
app.get('/', (req, res) => {
  res.send('Hello');
});

module.exports = app;
