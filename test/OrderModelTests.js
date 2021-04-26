const { expect } = require('chai')

const {
    db,
    models: { Order, Product, ProductOrders },
} = require('../server/db/index')

describe('Order model defination', function () {
    beforeEach(async () => {
        await db.sync({ force: true })
    })

    it('should exist', () => {
        expect(Order).to.exist
    })
    it('should contain some orders when they are created', async () => {
        const order1 = await Order.create({ user: 1 })
        expect((await Order.findAll({})).length).to.equal(1)
    })
})
