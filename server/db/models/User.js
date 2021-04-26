//create User here
const jwt = require('jsonwebtoken')
const { DataTypes } = require('sequelize')
const db = require('../db')

const User = db.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
})

User.authenticate = async function ({ email, password }) {
    const user = await User.findOne({
        where: { email, password },
    })
    if (user) {
        return jwt.sign({ id: user.id }, process.env.JWT)
    }
    const error = Error('The login info that you provided is incorrect.')
    error.status = 401
    throw error
}

module.exports = User
