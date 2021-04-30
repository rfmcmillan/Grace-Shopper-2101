const { expect } = require('chai')
const {
    db,
    models: { User, Review, Product },
} = require('../server/db')

const app = require('supertest')(require('../server/server'))
describe('User', () => {
    beforeEach(async () => {
        try {
            await db.sync({ force: true })
            const russel = await User.create({
                email: 'russel@snacker.com',
                password: 'abc123',
            })
        } catch (error) {
            throw error
        }
    })

    describe('User Model', async () => {
        it('should exist', async () => {
            const users = await User.findAll()
            expect(users).to.exist
        })
        it('should return an array', async () => {
            const users = await User.findAll()
            expect(users).to.be.an('array')
            expect(users.length).to.be.at.least(0)
        })
        //very simple tests. they will fail if you provide invalid inputs to the User.create() call that is within the test
        it('should require an email address', async () => {
            const user = await User.create({
                email: 'rosie@snacker.com',
                password: '123ert',
            })
            const users = await User.findAll()
            expect(users.length).to.equal(2)
        })
        it('should require a password', async () => {
            const user = await User.create({
                email: 'rosie@snacker.com',
                password: '123ert',
            })
            const users = await User.findAll()
            expect(users.length).to.equal(2)
        })
        it('provided email address is valid email address', async () => {
            const user = await User.create({
                email: 'rosie@snacker.com',
                password: '123ert',
            })
            const users = await User.findAll()
            expect(users.length).to.equal(2)
        })
        it('default value for `admin` property is `false`', async () => {
            const user = await User.create({
                email: 'rosie@snacker.com',
                password: '123ert',
            })
            expect(user.admin).to.equal(false)
        })
    })

    describe('User Routes', () => {
        beforeEach(async () => {
            const user = await User.create({
                email: 'rosie@snacker.com',
                password: '123ert',
            })
            const product = await Product.create({
                title: 'puff',
                brand: 'stay-puft',
                description: 'tasty',
                price: 1.1,
                country: 'usa',
            })
            await Review.writeNew(user.id, product.id, 4, 'So good!')
        })
        describe('GET', () => {
            it('api/users', async () => {
                const response = await app.get('/api/users')
                const users = response.body
                expect(response.status).to.equal(200)
                expect(users).to.be.ok
                expect(users).to.be.an('array')
            })
            it('api/users/:id', async () => {
                const jack = await User.create({
                    email: 'jack@snacker.com',
                    password: 'abc123',
                })
                const response = await app.get(`/api/users/${jack.id}`)
                const user = response.body
                expect(response.status).to.equal(200)
                expect(user).to.be.ok
                expect(user).to.be.an('object')
            })
        })
    })
})
