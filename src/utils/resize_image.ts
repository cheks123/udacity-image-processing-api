import path from 'path';
import sharp from 'sharp';
import resizedImageInterface from './resizedImageInterface';

const resizedObj:resizedImageInterface = {resizePath: "", error:""}

const resizeImage = async (
  file_path: string,
  imgName: string,
  width: number,
  height: number
):Promise<resizedImageInterface> => {
  try {
    
    await sharp(file_path)
      .resize({ width: width, height: height })
      .toFormat('jpeg', { mozjpeg: true })
      .toFile(path.join(__dirname, `../thumb/${imgName}.jpeg`));
    
    resizedObj.resizePath =  path.join(__dirname, `../thumb/${imgName}.jpeg`)
    resizedObj.error = ""
    return resizedObj;
  } catch (err) {
    resizedObj.error = "An error occurred! "
    + "Please make sure you provided a correct image name query parameter"
    return resizedObj
  }
};

export default resizeImage;
