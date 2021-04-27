const { expect } = require('chai')

const {
    db,
    models: { Order, Product, ProductOrders },
} = require('../server/db')

describe('Order model and join table defination', function () {
    beforeEach(async () => {
        await db.sync({ force: true })
        await Product.create({ name: 'Product1', price: 5 })
        await Product.create({ name: 'Product2', price: 8 })
        await Product.create({ name: 'Product3', price: 2 })
        let order = await Order.create({ userId: 1 })
        await order.setProducts([1, 2, 3])
        order = await Order.create({})
        await order.setProducts([2, 3])
    })
    it('should exist', () => {
        expect(Order).to.exist
    })
    it('should contain some orders when they are created', async () => {
        expect((await Order.findAll({})).length).to.equal(2)
    })
    it('should contain the right datatypes and defaults', async () => {
        const { userId, complete, date_of_purchase, purchased_items } = (
            await Order.findAll({})
        )[0]

        expect(userId).to.equal(1),
            expect(complete).to.equal(false),
            expect(date_of_purchase).to.equal(null),
            expect(purchased_items).to.equal(null)
    })
    it('should contain the purchase class method which returns the updated order', async () => {
        const purchase = await Order.purchase(2, '2016-05-05', 2)

        expect(purchase.id).to.equal(2)
        expect(purchase.userId).to.equal(2)
        expect(purchase.complete).to.equal(true)
        expect(purchase.date_of_purchase).to.equal('2016-05-05')
        expect(JSON.parse(purchase.purchased_items).length).to.equal(2)
        expect(JSON.parse(purchase.purchased_items)[0].name).to.equal(
            'Product2'
        )
    })

    it('Product Orders Should exist', () => {
        expect(ProductOrders).to.exist
    })
    it('It should be filled when orders are created', async () => {
        expect((await ProductOrders.findAll({})).length).to.equal(5)
    })
    it('should create one row for each product added to an order', async () => {
        expect(
            (await ProductOrders.findAll({ where: { orderId: 1 } })).length
        ).to.equal(3)
    })
})
