const express = require('express')
const app = express()
module.exports = app

const api = require('./api/')
const path = require('path')

//Routes Beginning With /Api
app.use('/api', api)

//Main Route
app.get('/', (req, res, next) => {
    res.send('Hello')
})
