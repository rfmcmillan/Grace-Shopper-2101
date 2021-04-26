const {
    db,
    models: { Category },
} = require('../server/db')

const init = async () => {
    try {
        await db.sync({ force: true })
        await Category.create({ name: 'salty' })
    } catch (error) {}
}

init()
