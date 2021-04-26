const { STRING } = require('sequelize')
const db = require('../db')

const Product = conn.define('product', {
    title: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,a
        },
    },
    brand: {
        type: STRING,
        allowNull: false,
    },
    category: {
        type: STRING,
        validate: {
            isIn: [['sweet', 'salty', 'healthy']],
        },
    },
    description: {
        type: Text,
        allowNull: false,
    },
    price: {
        type: DECIMAL(10, 2),
        validate: {
            isDecimal: true,
        },
    },
    inventory: { type: INTEGER },
    country: { type: STRING },
    imageUrl: {
        type: STRING,
        defaultValue:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2020%2F09%2F08%2Feditors-favorite-snacks-around-the-world-FT-MAG0920.jpg',
    },
})

Product.findCountry = (name) => {
    return this.findAll({
        where: { country: name },
    })
}

module.exports = Product

