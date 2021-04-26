//Everything comes together here (models from hooks)
//export db, models

const db = require('./db')
const { Order, Product, ProductOrders } = require('./hooks')


module.exports = {db, Order, Product, ProductOrders}
