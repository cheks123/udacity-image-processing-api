import express from 'express';
import path from 'path';
import sendImage from '../utils/send_image';

const router = express.Router();

router.get('/', (req:express.Request, res:express.Response):void =>{
  res.send("Welcome to the home page");
})

router.get('/image', async (req:express.Request, res:express.Response):Promise<void> => {
  const img = req.query.image;
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  if (!img || !width || !height) {
    res.send(
      'Please specify the required query parameters: image, width and height.'
    );
    return;
  }

  if (width <= 0 || height <= 0){
    res.send('Error! Width cannot be 0 or negative, height cannot be 0 or negative');
    return;
  }
  const imageName = img + 'w' + String(width) + 'h' + String(height);
  const file_path = path.join(__dirname, `../thumb/${img}.jpg`);
  sendImage(file_path, res, String(img), width, height);
});

export default router;
