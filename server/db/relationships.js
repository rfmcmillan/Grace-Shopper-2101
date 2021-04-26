const { Sequelize } = require('sequelize')
const Order = require('./models/Order')
const Product = require('./models/Product')




Product.belongsToMany(Order, {  through: 'Productorders' })