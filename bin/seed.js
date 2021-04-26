const {
    db,
    models: { Category },
} = require('../server/db')

const syncAndSeed = async () => {
    try {
        await db.sync({ force: true })
        await Category.create({ name: 'salty' })
    } catch (error) {}
}

module.exports = {
    syncAndSeed,
}
