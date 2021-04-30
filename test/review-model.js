const { expect } = require('chai')
const {
    db,
    models: { Review, User, Product },
} = require('../server/db')

describe('Review Model', async () => {
    beforeEach(async () => {
        try {
            await db.sync({ force: true })
            await User.create({
                email: 'henry@snacker.com',
                password: 'henry_pw',
            })
            await Review.create({
                rating: 5,
            })
        } catch (error) {
            throw error
        }
    })

    it('should exist', async () => {
        const reviews = await Review.findAll()
        expect(reviews).to.exist
    })

    it('Review.findAll() should return an array of reviews', async () => {
        const reviews = await Review.findAll()
        expect(reviews).to.be.an('array')
        expect(reviews.length).to.be.at.least(0)
    })

    it('rating must be between 1 and 5', async () => {
        const review = await Review.create({
            rating: 4,
        })
        const reviews = await Review.findAll()
        expect(reviews.length).to.equal(2)
    })
    describe('Associations', () => {
        it('review has a userId that is initially null', async () => {
            const review = await Review.create({
                rating: 4,
            })
            expect(review.userId).to.equal(null)
        })
        it('review has a productId that is initially null', async () => {
            const review = await Review.create({
                rating: 4,
            })
            expect(review.productId).to.equal(null)
        })
    })

    describe('.writeNew() class method', async () => {
        beforeEach(async () => {
            try {
                const product = await Product.create({
                    title: 'puff',
                    brand: 'stay-puft',
                    description: 'tasty',
                    price: 1.1,
                    country: 'usa',
                })
            } catch (error) {
                console.log(error)
            }
        })
        it('returns a new review', async () => {
            const henry = await User.findOne({
                where: {
                    email: 'henry@snacker.com',
                },
            })
            const puff = await Product.findOne({
                where: {
                    title: 'puff',
                },
            })
            const review = await Review.writeNew(henry.id, puff.id, 5, 'test')
            expect(review.id).to.be.ok
        })
        it('produces an error if no userId is provided', async () => {
            try {
                const puff = await Product.findOne({
                    where: {
                        title: 'puff',
                    },
                })
                const review = await Review.writeNew(null, puff.id, 4, 'test')
            } catch (error) {
                expect(error.message).to.equal('a review requires a userId')
            }
        })
        it('produces an error if no productId is provided', async () => {
            try {
                const henry = await User.findOne({
                    where: {
                        email: 'henry@snacker.com',
                    },
                })
                const review = await Review.writeNew(henry.id, null, 4, 'test')
            } catch (error) {
                expect(error.message).to.equal('a review requires a productId')
            }
        })
        it('produces an error if no rating is provided', async () => {
            try {
                const henry = await User.findOne({
                    where: {
                        email: 'henry@snacker.com',
                    },
                })
                const puff = await Product.findOne({
                    where: {
                        title: 'puff',
                    },
                })
                const review = await Review.writeNew(
                    henry.id,
                    puff.id,
                    null,
                    'test'
                )
            } catch (error) {
                expect(error.message).to.equal('a review requires a rating')
            }
        })
    })
})
