const { expect } = require('chai')

const {
    db,
    models: { Order, Product, ProductOrders, Category, User, Review },
} = require('../server/db')

describe('Order model and join table defination', function () {
    let order1, order2, user, StrawberryPuff, PineappleCake
    beforeEach(async () => {
        await db.sync({ force: true })

        StrawberryPuff = await Product.create({
            title: 'Strawberry Puff',
            brand: 'I-Mei',
            description: 'Crispy puff shell cookie with cream filling.',
            price: 3.99,
            inventory: 100,
            country: 'Taiwan',
            imageUrl:
                'https://images-na.ssl-images-amazon.com/images/I/51GkdanTqfL.jpg',
        })
        PineappleCake = await Product.create({
            title: 'Pineapple Cake',
            brand: 'Jun-Mei',
            description:
                'A buttery, shortbread-like treat with a pineapple jam filling.',
            price: 36.99,
            inventory: 139,
            country: 'Taiwan',
            imageUrl:
                'https://www.food168.com.tw/upload_files/a2L-detail.jpg?fbclid=IwAR19giBuwx8ZA1xGzD6kzX2oMttS4796rIC8lLPGhcNTuoAzDHQbipL-e0c',
        })

        const IceCreamBar = await Product.create({
            title: 'Black Sugar Boba Ice Cream Bar',
            brand: 'Tigersugar',
            description:
                'It contains chewy tapioca pearls mingle with a milk-based tea.',
            price: 4.99,
            inventory: 126,
            country: 'Taiwan',
            imageUrl:
                'https://sethlui.com/wp-content/uploads/2019/11/Tiger-Sugar-Boba-Ice-Cream-Online-2.jpg',
        })
        user = await User.create({
            email: 'russel@snacker.com',
            password: 'abc123',
        })
        order1 = (await user.getOrders({where: {complete: false}}))[0]
        await order1.addProducts([[StrawberryPuff, 2], [PineappleCake, 5], [IceCreamBar, 5]])
        order2 = await Order.create({})
        await order2.addProducts([[PineappleCake, 5],[ IceCreamBar, 2]])
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

        expect(userId).to.equal(user.id),
            expect(complete).to.equal(false),
            expect(date_of_purchase).to.equal(null),
            expect(purchased_items).to.equal(null)
    })
    describe('Purchase class method and instance methods', () => {
        it('should contain the purchase class method which returns the updated order if based on an already existing order', async () => {
            const purchase = await Order.purchase('2016-05-01', order1.id)

            expect(purchase.id).to.equal(order1.id)
            expect(purchase.userId).to.equal(user.id)
            expect(purchase.complete).to.equal(true)
            expect(purchase.date_of_purchase).to.equal('2016-05-01')
            expect(purchase.purchased_items.length).to.equal(3)
            expect(purchase.purchased_items[0].title).to.equal(
                'Strawberry Puff'
            )
        })
        it('if order exists without a user should still work and return with no user', async () => {
            const purchase = await Order.purchase('2016-05-05', order2.id)

            expect(purchase.id).to.equal(order2.id)
            expect(purchase.userId).to.equal(null)
            expect(purchase.complete).to.equal(true)
            expect(purchase.date_of_purchase).to.equal('2016-05-05')
            expect(purchase.purchased_items.length).to.equal(2)
            expect(purchase.purchased_items[0].title).to.equal('Pineapple Cake')
        })
        it('if order doesnt exist should still be able to purchase by adding in products', async () => {
            const purchase = await Order.purchase('2016-05-08', null, [
                [StrawberryPuff, 2],
            ])

            expect(purchase.userId).to.equal(null)
            expect(purchase.complete).to.equal(true)
            expect(purchase.date_of_purchase).to.equal('2016-05-08')
            expect(purchase.purchased_items.length).to.equal(1)
            expect(purchase.purchased_items[0].title).to.equal(
                'Strawberry Puff'
            )
        })
        it('it should also be able to add in a userId incase the user logs in at the time of purchase and keep track of amounts', async () => {
            const purchase = await Order.purchase(
                '2016-05-06',
                null,
                [
                    [StrawberryPuff, 2],
                    [PineappleCake, 5],
                ],
                user.id
            )

            expect(purchase.userId).to.equal(user.id)
            expect(purchase.complete).to.equal(true)
            expect(purchase.date_of_purchase).to.equal('2016-05-06')
            expect(purchase.purchased_items.length).to.equal(2)
            expect(purchase.purchased_items[1].amount).to.equal(5)
            expect(purchase.purchased_items[0].title).to.equal(
                'Strawberry Puff'
            )

        })
        it('it should allow products to be added and removed with the instance methods created', async()=>{
            await order1.updateProductsAmount(StrawberryPuff, 10)
            console.log((await user.findOrder()).products[0].productorders)
        })
    })
    describe('Join table', () => {
        it('Product Orders Should exist', () => {
            expect(ProductOrders).to.exist
        })
        it('It should be filled when orders are created', async () => {
            expect((await ProductOrders.findAll({})).length).to.equal(5)
        })
        it('should create one row for each product added to an order', async () => {
            expect(
                (await ProductOrders.findAll({ where: { orderId: order1.id } }))
                    .length
            ).to.equal(3)
        })
    })
})
