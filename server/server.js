const express = require('express')
const app = express()

const api = require('./api/')
const path = require('path')

app.use(express.json())
//Routes Beginning With /Api
app.use('/api', api)

//Main Route
app.get('/', (req, res, next) => {
    res.send('Hello')
})
module.exports = app
