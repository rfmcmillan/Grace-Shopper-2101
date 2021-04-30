//Create Review Here
const db = require('../db')
const { DataTypes } = require('sequelize')

const Review = db.define('review', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 5,
        },
    },
    text: { type: DataTypes.TEXT },
})

/*
 Review.writeNew(): the below class method allows a new review to be written. It takes four arguments (userId, productId, rating and text) and returns a review.
  - if a userId, productId or rating is not provided, it produces an error message
 */
Review.writeNew = async function (userId, productId, rating, text = null) {
    if (userId && productId && rating) {
        const review = await Review.create()
        review.userId = userId
        review.productId = productId
        review.rating = rating
        review.text = text
        await review.save()
        return review
    } else if (!userId) {
        const error = Error('a review requires a userId')
        throw error
    } else if (!productId) {
        const error = Error('a review requires a productId')
        throw error
    } else if (!rating) {
        const error = Error('a review requires a rating')
        throw error
    }
}

module.exports = Review
