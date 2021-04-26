const { expect } = require('chai')

const { db, Order, Product, ProductOrders } = require('../server/db/index')


describe('Order model defination', function(){
    async function init(){
        await db.sync({force: true})        
    }
    init()

    it('should exist', ()=>{
        expect(Order).to.exist
    })
    it('should contain some orders when they are created', async ()=>{
        const order1 = await Order.create({})
        expect((await Order.findAll({})).length).to.equal(1)
        
    })
})