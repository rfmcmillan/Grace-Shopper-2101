const { expect } = require('chai')
const {
    db,
    models: { Review },
} = require('../server/db')

describe('Review Model', async () => {
    beforeEach(async () => {
        try {
            await db.sync({ force: true })
            await Review.create({
                rating: 5,
            })
        } catch (error) {
            console.log(error)
        }
    })

    it('should exist', async () => {
        const reviews = await Review.findAll()
        expect(reviews).to.exist
    })

    it('should return an array', async () => {
        const users = await Review.findAll()
        expect(users).to.be.an('array')
        expect(users.length).to.be.at.least(0)
    })

    it('rating must be between 0 and 5', async () => {
        const review = await Review.create({
            rating: 4,
        })
        const reviews = await Review.findAll()
        expect(reviews.length).to.equal(2)
    })
})
