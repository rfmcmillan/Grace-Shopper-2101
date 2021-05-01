// All Routers
const router = require('express').Router()
const app = require('../server')
const categories = require('./categories')
const users = require('./users')
const reviews = require('./reviews')

// api/categories
router.use('/categories', categories)
router.use('/users', users)
router.use('/reviews', reviews)

module.exports = router
