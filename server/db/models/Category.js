const { DataTypes } = require('sequelize');
const db = require('../db');

const Category = db.define(
  'categories',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: false },
);

Category.findProducts = async function (name) {
  const cat = await Category.findOne({ where: { name } });
  const products = await cat.getProducts();
  return products;
};

module.exports = Category;
