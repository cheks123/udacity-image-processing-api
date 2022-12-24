import express from 'express';
import fs from 'fs';
import path from 'path';
import resizedImageInterface from './resizedImageInterface';
import resizeImage from './resize_image';

const sendImage = async (
  file_path: string,
  res: express.Response,
  imageName: string,
  width: number,
  height: number
):Promise<void> => {
  fs.readFile(file_path, (err, data) => {
    if (err) {
      if (err?.code == 'ENOENT') {
        const file_path2 = path.join(__dirname, `../full/${imageName}.jpg`);
        const imgName = imageName + 'w' + String(width) + 'h' + String(height);
        const finalImage:Promise<resizedImageInterface> =  resizeImage(file_path2, imgName, width, height);
        
        finalImage.then(data => { if(data.error){
          res.send(data.error)
          return;
        }
          else {
            res.sendFile(data.resizePath)
            return;
          }})
       
       
      } else {
        res.send('Unknown error');
        return;
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data);
      return;
    }
  });
};

export default sendImage;
