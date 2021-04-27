const { expect } = require('chai')
const {
    db,
    models: { Review, User },
} = require('../server/db')

describe('Review Model', async () => {
    xbeforeEach(async () => {
        try {
            await db.sync({ force: true })
            const henry = User.create({
                email: 'henry@snacker.com',
                password: 'henry_pw',
            })
            await Review.create({
                userId: 1,
                rating: 5,
                // productId: 1,
            })
        } catch (error) {
            console.log(error)
        }
    })

    xit('should exist', async () => {
        const reviews = await Review.findAll()
        expect(reviews).to.exist
    })

    xit('should return an array', async () => {
        const users = await Review.findAll()
        expect(users).to.be.an('array')
        expect(users.length).to.be.at.least(0)
    })

    xit('rating must be between 0 and 5', async () => {
        const review = await Review.create({
            userId: 1,
            rating: 4,
        })
        const reviews = await Review.findAll()
        expect(reviews.length).to.equal(2)
    })
})
