const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fse = require('fs-extra');
const app = express();
const fn = require('../app/functions');

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

let name;
app.post('/', (req, res) => {
  console.log(req.body, 'body');
  console.log(req.body.name, 'name');
  name = req.body.name;
  req.body.modules.forEach(module => {
    try {
      fn.copyFolder(`./storage/${module}`, `./temp/${module}`);
    } catch (error) {
      throw error;
    }
  });
  fse.copySync('./storage/other', './temp/other');
  fn.zipTempFolder(req.body.name);
  res.send();
});

app.get('/download', function (req, res) {
  let reqPath = path.join(__dirname, '../');
  const file = `${reqPath}${name}.zip`;
  console.log(file);
  res.download(file, `${name}.zip`);
});

app.get('*', (req, res) => {
  console.log('from express');
  fn.cleanUp();
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
