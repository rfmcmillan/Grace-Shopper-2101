// Everything comes together here. Import the models from models from hooks
const db = require('./db');
const {
  Order,
  Product,
  Country,
  ProductOrders,
  Category,
  User,
  Review,
  StripeId,
} = require('./hooks');

module.exports = {
  db,
  models: {
    Order, Product, Country, ProductOrders, Category, User, Review, StripeId,
  },
};
