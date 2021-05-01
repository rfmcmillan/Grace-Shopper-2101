// All Routers
const router = require('express').Router();
const app = require('../server');
const categories = require('./categories');
const users = require('./users');
const reviews = require('./reviews');
const products = require('./products');
const country = require('./countries');

// api/categories
router.use('/categories', categories);
router.use('/users', users);
router.use('/reviews', reviews);
router.use('/products', products);
router.use('/countries', country);

module.exports = router;
