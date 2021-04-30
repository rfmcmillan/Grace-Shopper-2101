const router = require('express').Router()
const {
    models: { Product, Country },
} = require('../db')

router.get('/', async (req, res, next) => {
    try {
        const countries = await Country.findAll()
        res.status(200).send(countries)
    } catch (ex) {
        next(ex)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const country = await Country.findByPk(req.params.id, {
            include: [Product],
        })
        res.send(country)
    } catch (ex) {
        next(ex)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const DeleteCountry = await Country.destroy({
            where: { id: req.params.id },
        })
        if (!DeleteCountry) res.sendStatus(404)
        else res.sendStatus(204)
    } catch (ex) {
        next(ex)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const [name, flag] = req.body
        const createCountry = await Country.create(name, flag)
        res.status(201).send(createCountry)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router
