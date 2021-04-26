//import models from relationships
const {
    Order,
    Product,
    ProductOrders,
    Category,
    User,
    Review,
} = require('./relationships')

//export models

module.exports = { Order, Product, ProductOrders, Category, User, Review }
