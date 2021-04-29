const { DataTypes } = require('sequelize')
const db = require('../db')

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
    { timestamps: false }
)

module.exports = Category
