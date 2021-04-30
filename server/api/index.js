// All Routers
const router = require('express').Router();
const categories = require('./categories');
const users = require('./users');

// api/categories
router.use('/categories', categories);
router.use('/users', users);

module.exports = router;
