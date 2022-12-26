import express from 'express';
import path from 'path';
import fs from 'fs';
import resizeImage from '../utils/resize_image';
import resizedImageInterface from '../utils/resizedImageInterface';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Welcome to the home page');
});

router.get(
  '/image',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const img = req.query.image;
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    if (!img || !width || !height) {
      res.send(
        'Please specify the required query parameters: image, width and height.'
      );
      return;
    }

    if (width <= 0 || height <= 0) {
      res.send(
        'Error! Width cannot be 0 or negative, height cannot be 0 or negative'
      );
      return;
    }

    const imageName = `${img}w${width}h${height}`;
    const file_path = path.join(__dirname, `../thumb/${imageName}.jpeg`);
    if (fs.existsSync(file_path)) {
      res.sendFile(file_path);
      return;
    }

    const file_path2 = path.join(__dirname, `../full/${img}.jpg`);
    const finalImage: Promise<resizedImageInterface> = resizeImage(
      file_path2,
      imageName,
      width,
      height
    );

    finalImage.then((data) => {
      if (data.error) {
        res.send(data.error);
        return;
      } else {
        res.sendFile(data.resizePath);
        return;
      }
    });
  }
);

export default router;
