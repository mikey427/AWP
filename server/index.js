const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const fse = require('fs-extra');
const app = express();
const fn = require('../app/functions');
const { promisify } = require('util');
// import express from 'express';
// import path from 'path';
// import morgan from 'morgan';
// import bodyParser from 'body-parser';
// import fs from 'fs';
// import fse from 'fs-extra';
// const app = express();

// const { functions } = require('../app/functions');
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

app.post('/', (req, res) => {
  // console.log(req.body);
  console.log(req.body, 'body');
  console.log(req.body.name, 'name');
  // console.log(req.body.name);
  // fn.cleanUp();
  // req.body.modules.forEach(async module => {
  //   await fn.copyFolder(`./storage/${module}`, `./temp/${module}`);
  // });
  req.body.modules.forEach(module => {
    try {
      fse.copySync(`./storage/${module}`, `./temp/${module}`);
    } catch (error) {
      throw error;
    }
  });
  fse.copySync('./storage/other', './temp/other');
  // const filterFunc = (src, dest) => {
  //   // your logic here
  //   // it will be copied if return true
  // };

  // fs.copySync('/tmp/mydir', '/tmp/mynewdir', { filter: filterFunc });
  // fse.move('./storage', './temp/', { overwrite: false }, err => {
  //   if (err) return console.error(err);
  //   console.log('success!');
  // });
  // fn.copyFolder('./storage/other', './temp/other');
  // let temp = fn.listDir('./temp');
  // while (temp && temp.length == 0) {
  //   console.log(temp);
  //   console.log('loop');
  //   temp = fn.listDir('./temp');
  // }
  // console.log('loop done');
  fn.zipTempFolder(req.body.name);
  res.send();
  // const myPromise = req.body.modules.forEach(module => {
  //   fn.copyFolder(`./storage/${module}`, `./temp/${module}`);
  // });
  // fn.cleanUp();
  // myPromise
  //   .then(fn.copyFolder('./storage/other', './temp/other'))
  //   .then(fn.zipFolder(req.body.name))
  //   .finally(res.send());
});

app.get('*', (req, res) => {
  console.log('from express');
  fn.cleanUp();
  // fs.readdir('./temp', (err, folders) => {
  //   if (err) throw err;

  //   for (const folder of folders) {
  //     fs.rmdir(path.join('./temp', folder), { recursive: true }, err => {
  //       if (err) throw err;
  //     });
  //   }
  // });
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
