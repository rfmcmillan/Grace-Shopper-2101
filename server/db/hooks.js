//import models from relationships
const {
    Order,
    Product,
    ProductOrders,
    Category,
    User,
    Review,
} = require('./relationships')

Category.getProducts = function (name) {
    return Category.findOne({
        where: name,
        include: { model: Product, through: { attributes: [] } },
    })
}

module.exports = { Order, Product, ProductOrders, Category, User, Review }
