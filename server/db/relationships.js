//Models imported from Model folder
const Category = require('./models/Category')

//once Product is imported
//Category.belongsToMany(Product,  { through: 'productcategories' });
//Product.belongsToMany(Category,  { through: 'productcategories' })

module.exports = {
    Category,
}
