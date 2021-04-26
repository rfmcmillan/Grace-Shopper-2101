const db = require('../db')
const { Sequelize, DataTypes } = require('Sequelize')



module.exports = db.define('Productorders', {
    
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Order',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id'
      }
    }, 
    complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: 'false'
        },
    date_of_purchase: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Items_and_Price:{
        type: DataTypes.JSON 
    }

})