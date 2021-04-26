//Everything comes together here. Import the models from models from hooks
const db = require('./db')
const { Order, Product, ProductOrders, Category } = require('./hooks')

module.exports = { db, Order, Product, ProductOrders, Category }
