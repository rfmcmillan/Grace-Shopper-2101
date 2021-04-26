//Everything comes together here. Import the models from models from hooks
const db = require('./db')
const { Category } = require('./hooks')

//export db, models
module.exports = {
    db,
    models: {
        Category,
    },
}
