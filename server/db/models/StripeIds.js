const {
  STRING,
} = require('sequelize');

const db = require('../db');

const StripeId = db.define('StripeId', {
  id: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
  },
  productId: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = StripeId;
