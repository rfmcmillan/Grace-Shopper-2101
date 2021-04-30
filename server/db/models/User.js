//create User here
const { DataTypes } = require('sequelize')
const db = require('../db')

const User = db.define('user', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue:DataTypes.UUIDV4,

    },
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

module.exports = User
