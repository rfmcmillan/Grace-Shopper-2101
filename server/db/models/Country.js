const { STRING, TEXT, UUID } = require('sequelize')
const db = require('../db')

const Country = db.define(
    'country',
    {
        // id: {
        //     type: UUID,
        //     primaryKey: true,
        //     allowNull: false,
        // },
        name: {
            type: STRING,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        flag: {
            type: TEXT,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        charset: 'utf8mb4',
    }
)

module.exports = Country
