const fs = require('fs');
const fse = require('fs-extra');
const AdmZip = require('adm-zip');

// Lists all folders/files in a directory
const listDir = path => {
  return fs.readdirSync(path);
  console.log(3);
};

// Will copy a specific folder to new location
const copyFolder = (oldPath, newPath) => {
  fse.copySync(oldPath, newPath);
};

// Will remove all files/folders in a directory
const removeAllFilesFromDir = path => {
  fs.readdir(path, (err, folders) => {
    if (err) throw err;
    for (const folder of folders) {
      fs.rmdir(path.concat('/', folder), { recursive: true }, err => {
        if (err) throw err;
      });
    }
  });
};

// Will remove all files of a specific type from a directory
const removeFiles = (path, ext) => {
  const files = listDir(path);
  if (files) {
    files.forEach(file => {
      if (file.includes(ext)) {
        fs.unlink(`${path}/${file}`, () => {
          return console.log(`${file} deleted`);
        });
      }
    });
  }
};

// Cleans up unnecessary files
const cleanUp = () => {
  removeAllFilesFromDir('./temp');
  removeFiles('./', '.zip');
  console.log(1);
};

// Zips folder to be downloaded
const zipTempFolder = zipName => {
  let zip = new AdmZip();
  zip.addLocalFolder('./temp', `./${zipName}.zip`);
  zip.writeZip(`./${zipName}.zip`);
  console.log('zip created');
};

module.exports = {
  listDir,
  copyFolder,
  removeAllFilesFromDir,
  removeFiles,
  cleanUp,
  zipTempFolder
};
