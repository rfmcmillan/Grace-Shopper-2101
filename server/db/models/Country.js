const { STRING, TEXT, UUID, UUIDV4 } = require('sequelize')
const db = require('../db')

const Country = db.define(
    'country',
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: STRING,
            // unique: true,
            validate: {
                notEmpty: true,
            },
        },
        flag: {
            type: TEXT,
            defaultValue: 'em-globe_with_meridians',
            // unique: true,
            // validate: {
            //     notEmpty: true,
            // },
        },
    },
    {
        charset: 'utf8mb4',
    }
)

module.exports = Country
