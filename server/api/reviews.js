const express = require('express')
const router = express.Router()

const {
    models: { User, Review, Product },
} = require('../db')

router.get('/', async (req, res, next) => {
    try {
        const reviews = await Review.findAll({
            include: [User, Product],
        })
        res.send(reviews)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const review = await Review.findByPk(req.params.id, {
            include: [User, Product],
        })
        res.send(review)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { userId, productId, rating, text } = req.body
        const review = await Review.writeNew(userId, productId, rating, text)
        res.status(201).send(review)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const review = await Review.findByPk(req.params.id)
        await review.destroy()
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const reviewToModify = await Review.findByPk(req.params.id)
        const updated = await reviewToModify.update(req.body)
        res.status(200).send(updated)
    } catch (error) {
        next(error)
    }
})

module.exports = router
