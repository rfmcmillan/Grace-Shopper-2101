const { expect } = require('chai')
const {
    db,
    models: { Category },
} = require('../server/db')

describe('Database', () => {
    describe('Category Model', () => {
        let categories
        beforeEach(async () => {
            await db.sync({ force: true })
            categories = await Category.findAll()
        })

        it('Category should exist', () => {
            expect(categories).to.exist
        })
        it('categories should return an array', () => {
            expect(categories).to.be.a('array')
            expect(categories.length).to.greaterThanOrEqual(0)
        })
    })
})
