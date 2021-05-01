//All Routers
const router = require('express').Router()
const categories = require('./categories')
const products = require('./products')
const country = require('./countries')
//api/categories
router.use('/categories', categories)
router.use('/products', products)
router.use('/countries', country)

module.exports = router
