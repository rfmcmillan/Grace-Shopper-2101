const { expect } = require('chai')
const {
    db,
    models: { Category, Product },
} = require('../server/db')

const app = require('supertest')(require('../server/server'))

describe('Category', () => {
    beforeEach(async () => {
        try {
            await db.sync({ force: true })
            const salty = await Category.create({ name: 'salty' })
            const Jaga = await Product.create({
                title: 'Jaga Pokkuru',
                brand: 'Calbee',
                description:
                    'It is a Hokkaido-exclusive snack which made from 100% Hokkaido-grown potatoes.',
                //salty
                price: 19.98,
                inventory: 243,
                country: 'Japan',
                imageUrl:
                    'https://cdn.shopify.com/s/files/1/1969/5775/products/calbee-potato-farm-jaga-pokkuru-180g-japanese-taste_2048x.jpg?v=1608561946',
            })

            await Jaga.addCategory(salty)
        } catch (error) {
            console.log(error)
        }
    })
    describe('Category Model', async () => {
        it('Category should exist', async () => {
            const categories = await Category.findAll()

            expect(categories).to.exist
        })
        it('categories should return an array', async () => {
            const categories = await Category.findAll()
            expect(categories).to.be.a('array')
            expect(categories.length).to.be.greaterThan(0)
        })

        describe('Product Category Association', () => {
            it('Product was created', async () => {
                const products = await Product.findAll()
                expect(products).to.be.a('array')
                expect(products).to.have.lengthOf(1)
            })
            it('Product has category', async () => {
                const products = await Product.findAll({
                    include: Category,
                })
                expect(products).to.exist
                expect(products[0].categories).to.be.a('array')
                expect(products[0].categories[0].name).to.equal('salty')
            })

            it('Category has product', async () => {
                const categories = await Category.findAll({
                    include: [Product],
                })
                expect(categories).to.exist
                expect(categories[0].products).to.be.a('array')
                expect(categories[0].products[0].title).to.equal('Jaga Pokkuru')
            })
        })
    })

    describe('Category Routes', () => {
        describe('GET', () => {
            it('/api/categories', async () => {
                const response = await app.get('/api/categories')
                const { categories } = response.body
                expect(response.status).to.equal(200)
                expect(categories).to.exist
                expect(categories).to.be.a('array')
            })

            it('/api/categories/:category', async () => {
                const response = await app.get(`/api/categories/${'salty'}`)
                const { products } = response.body
                expect(response.status).to.equal(200)
                expect(products).to.exist
                expect(products).to.be.a('array')
                expect(products.length).to.equal(1)
            })
        })

        describe('POST', () => {
            it('/api/categories', async () => {
                const name = 'sweet'
                const { body } = await app
                    .post('/api/categories')
                    .send({ name })

                expect(body).to.exist
                expect(body.name).to.equal(name)
            })
        })

        describe('DELETE', () => {
            it('/api/categories', async () => {
                const toDel = await Category.findOne({
                    where: { name: 'salty' },
                })
                const response = await app.delete(`/api/categories/${toDel.id}`)

                const categories = await Category.findAll()
                expect(response.status).to.equal(204)
                expect(categories.length).to.equal(0)
            })
        })

        describe('PUT', () => {
            it('/api/categories/:id', async () => {
                const salty = await Category.findOne({
                    where: { name: 'salty' },
                })

                const response = await app
                    .put(`/api/categories/${salty.id}`)
                    .send({ name: 'sweet' })

                const categories = await Category.findAll()

                expect(categories.length).to.equal(1)
                expect(categories[0].name).to.equal('sweet')
            })
        })
    })
})
