const express = require('express')
const router = express.Router()

const {
    models: { User, Review },
} = require('../db')

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({ include: Review })
        res.send(users)
    } catch (error) {
        next(error)
    }
})
//get single user by specifying their email address
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
        })
        res.send(user)
    } catch (error) {
        next(error)
    }
})

module.exports = router
