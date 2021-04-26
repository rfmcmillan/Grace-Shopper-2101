const app = require('./server')
const PORT = process.env.PORT || 3000
const { db } = require('./db')

app.listen(PORT, async () => {
    try {
        await db.sync()
        console.log(`Listening on ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})
