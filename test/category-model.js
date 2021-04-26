const { expect } = require('chai')
const { db, Category } = require('../server/db')

describe('Database', () => {
    describe('Category Model', async () => {
        let categories
        await db.sync()
        categories = await Category.findAll()

        it('Category should exist', () => {
            expect(categories).to.exist
        })
        it('categories should return an array', () => {
            expect(categories).to.be.a('array')
            expect(categories.length).to.greaterThanOrEqual(0)
        })
    })
})
