const { STRING, TEXT, UUID, UUIDV4, INTEGER, DECIMAL } = require('sequelize');

const db = require('../db');

const Product = db.define('product', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  brand: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
  price: {
    type: DECIMAL(10, 2),
    validate: {
      isDecimal: true,
    },
  },
  inventory: { type: INTEGER, defaultValue: 0 },
  imageUrl: {
    type: STRING,
    validate: {},
    defaultValue:
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2020%2F09%2F08%2Feditors-favorite-snacks-around-the-world-FT-MAG0920.jpg',
  },
});

module.exports = Product;
