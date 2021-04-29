const db = require('../db')
const Product = require('./Product')
const { Sequelize, DataTypes, UUIDV4, INTEGER } = require('sequelize')

const Order = db.define('order', {
    complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: 'false',
    },
    date_of_purchase: {
        type: DataTypes.DATEONLY,
    },
    purchased_items: {
        type: DataTypes.JSON,
    },
})

Order.purchase = async function (orderId, date, userId = null) {
    const order = await this.findByPk(orderId, { include: [Product] })
    let jsonobj = []

    if (!order.userId) {
        order.userId = userId
    }
    order.products.forEach((e, i) => {
        jsonobj[i] = {
            id: e.id,
            title: e.title,
            brand: e.brand,
            description: e.decription,
            price: e.price,
            country: e.country,
            imageUrl: e.imageUrl,
            amount: e.productorders.product_amount
        }
        
    })

    order.complete = 'true'
    order.date_of_purchase = date
    order.purchased_items = jsonobj

    await order.save()

    return order
}

module.exports = Order
