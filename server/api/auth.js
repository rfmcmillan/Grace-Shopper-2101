const express = require('express');

const router = express.Router();

const {
  models: { User },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    res.send(await User.byToken(req.headers.authorization));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = router;
