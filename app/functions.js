import fs from 'fs';
import fse from 'fs-extra';

// Lists all folders/files in a directory
export const listDir = path => {
  fs.readdir(path, (err, folders) => {
    if (err) throw err;
    console.log(folders);
  });
};

// Will copy a specific folder to new location
export const copyFolder = (oldPath, newPath) => {
  fse.copy(oldPath, newPath, err => {
    if (err) {
      console.log(err, 'Error when copying');
    } else {
      let path = oldPath.split('/');
      const folderName = path[-1];
      console.log(`Copied ${folderName} folder to ${newPath}`);
    }
  });
};

// Will remove all files/folders in a directory
export const removeAllFilesFromDir = path => {
  fs.readdir(path, (err, folders) => {
    if (err) throw err;

    for (const folder of folders) {
      fs.rmdir(path.join(path, folder), { recursive: true }, err => {
        if (err) throw err;
      });
    }
  });
};

// Will remove all files of a specific type from a directory
export const removeFiles = (path, ext) => {
  const files = listDir(path);
  files.forEach(file => {
    if (ext in file) {
      fs.unlink(`${path}/${file}`);
    }
  });
};

// Cleans up unnecessary files
export const cleanUp = () => {
  removeAllFilesFromDir('./temp');
  removeFiles('./', '.zip');
};

// Zips folder to be downloaded
export const zipFolder = zipName => {
  let zip = new AdmZip();
  zip.addLocalFile('./temp');
  zip.writeZip(`./${zipName}.zip`);
};
