const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// Logging middleware
app.use(morgan('dev'));

// body parsing middleware MAYBE new
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// body parsing middleware MAYBE DEPRECATED
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// app.use('/api', require('./API')); // include our routes!
app.post('/', (req, res) => {
  console.log(req.body);
});
app.get('*', (req, res) => {
  console.log('from express');
  res.sendFile(path.join(__dirname, '../public/bundle.js'));
}); // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log('Knock, knock');
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});

module.exports = app;
