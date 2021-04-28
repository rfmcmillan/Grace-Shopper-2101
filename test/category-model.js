const { expect } = require('chai')
const {
    db,
    models: { Category },
} = require('../server/db')

describe('Database', () => {
    describe('Category Model', async () => {
        beforeEach(async () => {
            try {
                await db.sync({ force: true })
                await Category.create({ name: 'salty' })
            } catch (error) {
                console.log(error)
            }
        })

        it('Category should exist', async () => {
            const categories = await Category.findAll()

            expect(categories).to.exist
        })
        it('categories should return an array', async () => {
            const categories = await Category.findAll()
            expect(categories).to.be.a('array')
            expect(categories.length).to.be.greaterThan(0)
        })
    })
})
