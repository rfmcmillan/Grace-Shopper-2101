
const { STRING,TEXT,INTEGER,DECIMAL } = require('sequelize')

const db = require('../db')

const Product = db.define('product', {
    title: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    brand: {
        type: STRING,
        allowNull: false,
    },
    category: {
        type: STRING,
        allowNull:false
    },
    description: {
        type: TEXT,
        allowNull: false,
    },
    price: {
        type: DECIMAL(10, 2),
        validate: {
            isDecimal: true,
        },
    },
    inventory: { type: INTEGER,
               defaultValue:0},
    country: { type: STRING,
             allowNull: false,
        validate: {
            notEmpty: true,
        }},
    imageUrl: {
        type: STRING,
        validate: {
            isUrl: true,
        },
        defaultValue:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2020%2F09%2F08%2Feditors-favorite-snacks-around-the-world-FT-MAG0920.jpg',
    },
})


Product.findByCountry = async(name) => {
    return await this.aggragate('country','DISTINCT',{
        plain:false
    })
}

module.exports = Product

