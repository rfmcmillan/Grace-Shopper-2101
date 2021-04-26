const { DataTypes } = require('sequelize')
const db = require('../db')

const Category = db.define(
    'categories',
    {
        name: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
    },
    { timestamps: false }
)

module.exports = Category
