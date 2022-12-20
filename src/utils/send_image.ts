import express from 'express';
import fs from 'fs';
import path from 'path';
import resizeImage from './resize_image';

const sendImage = async (
  file_path: string,
  res: express.Response,
  imageName: string,
  width: number,
  height: number
) => {
  fs.readFile(file_path, (err, data) => {
    if (err) {
      if (err?.code == 'ENOENT') {
        const file_path2 = path.join(__dirname, `../full/${imageName}.jpg`);
        const imgName = imageName + 'w' + String(width) + 'h' + String(height);
        resizeImage(file_path2, res, imgName, width, height);
      } else {
        res.send('Unknown error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data);
    }
  });
};

export default sendImage;
