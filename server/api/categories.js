const router = require('express').Router()
const {
    models: { Category },
} = require('../db')

//categories
router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.findAll()
        res.status(200).send({ categories })
    } catch (error) {
        next(error)
    }
})

//categories/:category
router.get('/:category', async (req, res, next) => {
    try {
        const name = req.params.category
        const products = await Category.findProducts(name)
        res.status(200).send({ products })
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body
        const newCategory = await Category.create({ name })
        res.status(201).send(newCategory)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const toDestroy = await Category.findByPk(id)
        await toDestroy.destroy()
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const category = await Category.findByPk(id)
        const { name } = req.body
        const updated = await category.update({ name })
        res.status(200).send(updated)
    } catch (error) {
        next(error)
    }
})

module.exports = router
