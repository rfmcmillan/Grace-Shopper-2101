const express = require('express')
const router = express.Router()

const {
    models: { User, Review },
} = require('../db')

router.get('/', async (req, res, next) => {
    const users = await User.findAll({ include: Review })
    res.send(users)
})
//get single user by specifying their email address
router.get('/:id', async (req, res, next) => {
    const user = await User.findOne({
        where: {
            id: req.params.id,
        },
    })
    res.send(user)
})

module.exports = router
