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
    const error = Error(
        'The email address or password that you provided is incorrect.'
    )
    error.status = 401
    throw error
}

User.byToken = async function (token) {
    try {
        const { id } = await jwt.verify(token, process.env.JWT)
        const user = await User.findByPk(id)
        if (user) {
            return user
        }
    } catch (error) {
        const err = Error('The token that you provided is not valid.')
        err.status = 401
        throw err
    }
}

module.exports = User
