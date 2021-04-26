const db = require('../db')
const Product = require('./Product')
const { Sequelize, DataTypes } = require('sequelize')

const Order = db.define('order', {
    userId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
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
            name: e.name,
            price: e.price,
            amount: e.productorders.product_amount,
            imageURL: 'to be filled later',
        }
    })

    order.complete = 'true'
    order.date_of_purchase = date
    order.purchased_items = JSON.stringify(jsonobj)

    await order.save()

    return order
}

module.exports = Order
