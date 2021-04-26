//Everything comes together here. Import the models from models from hooks
const db = require('./db')
const { Order, Product, ProductOrders, Category, User } = require('./hooks')

module.exports = {
    db,
    models: { Order, Product, ProductOrders, Category, User },
}
