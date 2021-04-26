//create User here
const { DataTypes } = require('sequelize')
const db = require('../db')

const User = db.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
})

module.exports = User
