import express from 'express';
import path from 'path';
import sharp from 'sharp';

const resizeImage = async (
  file_path: string,
  res: express.Response,
  imgName: string,
  width: number,
  height: number
) => {
  try {
    await sharp(file_path)
      .resize({ width: width, height: height })
      .toFormat('jpeg', { mozjpeg: true })
      .toFile(`./src/thumb/${imgName}.jpeg`);
    res.sendFile(path.join(__dirname, `../thumb/${imgName}.jpeg`));
  } catch (err) {
    res.send(`An error occured: ${err}`);
  }
};

export default resizeImage;
