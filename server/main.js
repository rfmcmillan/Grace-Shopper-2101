const app = require('./server')
const PORT = process.env.PORT || 3000
const { syncAndSeed } = require('../bin/seed')

app.listen(PORT, async () => {
    try {
        await syncAndSeed()
        console.log(`Listening on ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})
