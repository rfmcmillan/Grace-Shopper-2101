const { Sequelize } = require('sequelize')
const Order = require('./models/Order')
const Product = require('./models/Product')
const Productorders = require('./models/ProductOrders')




Product.belongsToMany(Order, {  through: Productorders })