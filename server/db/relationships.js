//Models imported from Model folder
const Order = require('./models/Order')
const Product = require('./models/Product')
const ProductOrders = require('./models/ProductOrders')
const Category = require('./models/Category')
const User = require('./models/User')
const Review = require('./models/Review')

//once Product is imported
//Category.belongsToMany(Product,  { through: 'productcategories' });
//Product.belongsToMany(Category,  { through: 'productcategories' })

Review.belongsTo(User)
User.hasMany(Review)

Product.hasMany(Review)
Review.belongsTo(Product)

Product.belongsToMany(Order, { through: ProductOrders })

module.exports = { Order, Product, ProductOrders, Category, User, Review }
