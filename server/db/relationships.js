const { Sequelize } = require('sequelize')
const Order = require('./models/Order')
const Product = require('./models/Product')
const ProductOrders = require('./models/ProductOrders')




Product.belongsToMany(Order, {  through: Productorders })

module.exports = { Order, Product, ProductOrders }