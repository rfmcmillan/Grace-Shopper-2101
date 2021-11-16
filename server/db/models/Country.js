const { STRING, TEXT, DECIMAL, UUID, UUIDV4 } = require('sequelize');
const db = require('../db');

const Country = db.define(
  'country',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: STRING,
      validate: {
        notEmpty: true,
      },
    },
    flag: {
      type: TEXT,
      defaultValue: 'em-globe_with_meridians',
    },
    latitude: {
      type: DECIMAL,
    },
    longitude: {
      type: DECIMAL,
    },
  },
  {
    charset: 'utf8mb4',
  }
);

module.exports = Country;
