const { DataTypes } = require('sequelize')
const db = require('../db')


module.exports = db.define("product", {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
});
