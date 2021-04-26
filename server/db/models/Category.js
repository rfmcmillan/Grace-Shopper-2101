const { DataTypes } = require('sequelize')
const db = require('../db')

const Category = db.define(
    'categories',
    {
        name: {
            type: DataTypes.STRING,
        },
    },
    { timestamps: false }
)

module.exports = Category
