const fs = require('fs');
const fse = require('fs-extra');
const AdmZip = require('adm-zip');

// Lists all folders/files in a directory
const listDir = path => {
  // fs.readdir(path, (err, files) => {
  //   console.log(files, path, 'files, path');
  //   if (err) {
  //     throw err;
  //   } else {
  //     if (files.length == 0) {
  //       return [];
  //     } else {
  //       console.log(path);
  //       console.log(files, 'files');
  //       return files;
  //     }
  //   }
  // });
  return fs.readdirSync(path);
  console.log(3);
};

// Will copy a specific folder to new location
const copyFolder = async => (oldPath, newPath) => {
  // fse.copy(oldPath, newPath, err => {
  //   if (err) {
  //     console.log(err, 'Error when copying');
  //   } else {
  //     let path = oldPath.split('/');
  //     // console.log(path, 'path');
  //     const folderName = path[path.length - 1];
  //     console.log(`Copied ${folderName} folder to ${newPath}`);
  //   }
  // });
  // // console.log(2);
};

const copyFolderArr = paths => {
  for (i = 0; i < paths.length; i++) {
    fse.copy(``);
  }
};

// Will remove all files/folders in a directory
const removeAllFilesFromDir = path => {
  fs.readdir(path, (err, folders) => {
    if (err) throw err;

    for (const folder of folders) {
      // console.log(path, 'path');
      // console.log(folder, 'folder');
      fs.rmdir(path.concat('/', folder), { recursive: true }, err => {
        if (err) throw err;
      });
    }
  });
};

// Will remove all files of a specific type from a directory
const removeFiles = (path, ext) => {
  const files = listDir(path);
  // console.log(files, 'files');
  // console.log(typeof files, 'typeof files');
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
  // let temp = listDir('./temp');
  // console.log(typeof temp, 'isarray');
  // console.log(temp);
  let zip = new AdmZip();
  zip.addLocalFolder('./temp', `./${zipName}.zip`);
  // console.log(zip.getEntries(), 'entries');
  zip.writeZip(`./${zipName}.zip`);
  console.log('zip created');

  // while (temp.length == 0) {
  //   console.log(temp, 'temp in loop');
  //   console.log('loop');
  //   temp = listDir('./temp');
  //   if (temp.length > 0) {
  //     let zip = new AdmZip();
  //     zip.addLocalFolder('./temp/');
  //     zip.writeZip(`./${zipName}.zip`);
  //     console.log('zip created');
  //   }
  // }
};

module.exports = {
  listDir,
  copyFolder,
  removeAllFilesFromDir,
  removeFiles,
  cleanUp,
  zipTempFolder
};
