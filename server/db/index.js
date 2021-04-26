//Everything comes together here (models from hooks)
//export db, models

const db = require('./db')
const Order = require('./models/Order')
const Product = require('./models/Product')
const ProductOrders = require('./models/ProductOrders')


module.exports = {db, Order, Product, ProductOrders}
