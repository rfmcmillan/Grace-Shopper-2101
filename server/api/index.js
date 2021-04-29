//All Routers
const router = require('express').Router()
const categories = require('./categories')

//api/categories
router.use('/categories', categories)

module.exports = router
