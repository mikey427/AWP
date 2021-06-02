const db = require('./server/db/db');
const app = require('./server/index');
const port = process.env.PORT || 3000;

// Remember that if you pass the force: true option to sync,
// that will drop all of your tables before re-creating them.
// Be sure to never do this in production!
db.sync({ force: true }).then(function () {
  app.listen(port);
});
