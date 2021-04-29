const { expect } = require('chai')

const {
    db,
    models: { Order, Product, ProductOrders, Category, User, Review },
} = require('../server/db')


describe('Order model and join table defination', function () {
    let order1, order2, user
    beforeEach(async () => {
        await db.sync({ force: true })
        
        const StrawberryPuff = await Product.create({
            title: 'Strawberry Puff',
            brand: 'I-Mei',
            description: 'Crispy puff shell cookie with cream filling.',
            price: 3.99,
            inventory: 100,
            country: 'Taiwan',
            imageUrl:
                'https://images-na.ssl-images-amazon.com/images/I/51GkdanTqfL.jpg',
        })
        const PineappleCake = await Product.create({
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
        order1 = await Order.create({ userId: user.id })
        await order1.setProducts([1, 2, 3])
        order2 = await Order.create({})
        await order2.setProducts([2, 3])
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
    it('should contain the purchase class method which returns the updated order', async () => {
        const purchase = await Order.purchase(order2.id, '2016-05-05', 1)

        expect(purchase.id).to.equal(order2.id)
        expect(purchase.userId).to.equal(1)
        expect(purchase.complete).to.equal(true)
        expect(purchase.date_of_purchase).to.equal('2016-05-05')
        expect(purchase.purchased_items.length).to.equal(2)
        expect(purchase.purchased_items[0].title).to.equal(
            'Pineapple Cake'
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
            (await ProductOrders.findAll({ where: { orderId: order1.id } })).length
        ).to.equal(3)
    })
})
