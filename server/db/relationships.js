//Models imported from Model folder
const Order = require('./models/Order')
const Product = require('./models/Product')
const ProductOrders = require('./models/ProductOrders')
const Category = require('./models/Category')

//once Product is imported
//Category.belongsToMany(Product,  { through: 'productcategories' });
//Product.belongsToMany(Category,  { through: 'productcategories' })

Product.belongsToMany(Order, { through: ProductOrders, foreignKey: 'productId' })
Order.belongsToMany(Product, { through: ProductOrders, foreignKey: 'orderId' })

//User.hasMany(Order)

module.exports = { Order, Product, ProductOrders, Category }
