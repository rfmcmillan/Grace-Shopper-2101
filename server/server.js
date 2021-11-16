const express = require('express');

const app = express();

const path = require('path');

const api = require('./api');

module.exports = app;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '/public')));

app.use('/api', api);

app.get('/', (req, res, next) => {
  try {
    const html = path.join(__dirname, '..', '/client/index.html');

    res.sendFile(html);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
