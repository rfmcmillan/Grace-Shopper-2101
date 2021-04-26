const { STRING } = require('sequelize')
const db = require('../db')



module.exports = db.define('Product', {

    name: {
        type: STRING
    }  

})
