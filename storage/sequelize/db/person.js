const Sequelize = require('sequelize');
const db = require('./database');

// EXAMPLE DB MODEL PERSON
// Has name and address as columns
module.exports = db.define('Person', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});
