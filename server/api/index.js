// All Routers
const router = require('express').Router();
const app = require('../server');
const categories = require('./categories');
const users = require('./users');
const orders = require('./orders');
const reviews = require('./reviews');

// api/categories
router.use('/categories', categories);
router.use('/users', users);
router.use('/reviews', reviews);
router.use('/orders', orders);

module.exports = router;
