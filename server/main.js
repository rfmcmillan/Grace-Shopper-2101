const app = require('./server')
const PORT = process.env.PORT || 3000
const { db } = require('./db/index')

//const require db

db.sync()

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
