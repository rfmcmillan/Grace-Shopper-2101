//Create Review Here
const db = require('../db')
const { DataTypes } = require('sequelize')

const Review = db.define('review', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5,
        },
    },
    text: { type: DataTypes.TEXT(400) },
})

module.exports = Review
