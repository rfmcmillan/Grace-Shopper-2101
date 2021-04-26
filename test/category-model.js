const { expect } = require('chai')
const {
    models: { Category },
} = require('../server/db')

describe('Database', () => {
    describe('Category Model', () => {
        let categories
        beforeEach(async () => {
            categories = await Category.findAll()
        })
        it('categories should return an array', () => {
            expect(categories).to.be.a('array')
            expect(categories.length).to.greaterThanOrEqual(0)
        })
    })
})
