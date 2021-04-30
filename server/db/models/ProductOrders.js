const { DataTypes, UUIDV4 } = require('sequelize');
const db = require('../db');

module.exports = db.define('productorders', {
  orderId: {
    type: UUIDV4,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'order',
      key: 'id',
    },
  },
  productId: {
    type: UUIDV4,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'product',
      key: 'id',
    },
  },
  product_amount: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});
