const { expect } = require('chai')

const { db, Order, Product, ProductOrders } = require('../server/db/index')


describe('Order model defination', function(){
    beforeEach(async()=>{
        db.sync({force: true})
    })

    it('should exist', ()=>{
        expect(Order).to.exist
    })
    it('should contain some orders when they are created', async ()=>{
        const order1 = await Order.create({})
        const search = await Order.findAll({})

        expect(search.length).to.equal(1)
    })
})