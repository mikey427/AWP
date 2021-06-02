const Sequelize = require('sequelize');

//Example Model (Import all models)
const Person = require('./person');

// connect to your DB
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/Boilermaker',
  {
    logging: false
  }
);

//DEFINE ASSOCIATIONS HERE

// EXAMPLES:
// Student.belongsTo(Campus);
// Campus.hasMany(Student);

// Export db and all models
module.exports = {
  db,
  Person
};

// If you are using Heroku as a deployment service
// and Heroku Postgres as your database,
// remember that the database url in your
// Heroku environment will be available in an environment variable DATABASE_URL.
// Prepare your sequelize instance to take advantage of this,
// and only use your local database url if no DATABASE_URL is available.
