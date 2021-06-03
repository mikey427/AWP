const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const fse = require('fs-extra');
const zipper = require('zip-local');
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
// app.post('/', async (req, res) => {
//   fs.readdir('./temp', (err, folders) => {
//     if (err) throw err;

//     for (const folder of folders) {
//       fs.rmdir(path.join('./temp', folder), { recursive: true }, err => {
//         if (err) throw err;
//       });
//     }
//   });
//   console.log(req.body);
//   console.log(req.body.name);
//   await req.body.modules.forEach(module => {
//     fse.copy(`./storage/${module}`, `./temp/${module}`, function (err) {
//       if (err) {
//         console.log(err, 'error in copy');
//       } else {
//         console.log(`Copied ${module} folder to temp`);
//       }
//     });
//   });
//   await fse.copy('./storage/other', './temp/other', function (err) {
//     if (err) {
//       console.log(err, 'error in copy');
//     } else {
//       console.log('Transfer complete, ready for download');
//     }
//   });
//   await fs.readdir('./temp', (err, folders) => {
//     if (err) throw err;
//     console.log(folders, '----------------> FOLDERS');
//   });
//   await zipper.sync
//     .zip('./temp')
//     .compress()
//     .save(`${req.body.name}.zip`);
//   // modules.forEach(module => {
//   //   if (this.state[module]) {
//   //     fs.copyFile(`../storage/${module}`, '../temp/', function () {
//   //       console.log(`Moved ${module} folder to temp folder!`);
//   //     });
//   //   }
//   // });
//   // fs.copyFile('../storage/other', '../temp/', function () {
//   //   console.log('Transfer complete, ready for download');
//   // });
//   res.send('Files ready for download');
// });

app.post('/', (req, res) => {});

app.get('*', (req, res) => {
  console.log('from express');
  fs.readdir('./temp', (err, folders) => {
    if (err) throw err;

    for (const folder of folders) {
      fs.rmdir(path.join('./temp', folder), { recursive: true }, err => {
        if (err) throw err;
      });
    }
  });
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
