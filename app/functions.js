import fs from 'fs';
import fse from 'fs-extra';

export const listDir = path => {
  fs.readdir(path, (err, folders) => {
    if (err) throw err;
    console.log(folders);
  });
};

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

export const cleanUp = () => {
  removeAllFilesFromDir('./');
  removeAllFilesFromDir('./temp');
};

export const zipFolder = zipName => {
  let zip = new AdmZip();
  zip.addLocalFile('./temp');
  zip.writeZip(`./${zipName}.zip`);
};
