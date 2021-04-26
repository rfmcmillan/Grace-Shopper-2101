const db = require('../db')
const { Sequelize, DataTypes } = require('sequelize')



module.exports = db.define('Order', {
    user: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})