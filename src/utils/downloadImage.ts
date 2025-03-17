import axios from 'axios';
import fs, { mkdir } from 'fs';
import path from 'path';
import { IBotRequestError } from '../types';
import { logger } from './logger';

export async function downloadImage(
  url: string, 
  downloadPath:string, 
  fileName:string
): Promise<IBotRequestError>{
  logger.info(`Downloading image from ${url}`)
  if(!fs.existsSync(downloadPath)){
    fs.mkdirSync(downloadPath, {recursive: true});
  }

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'arraybuffer'
  });

  const res:IBotRequestError = {
    status: response.status,
    statusText: response.statusText,
    url: url,
    data: response.data
  }

  if(response.status != 200){
    logger.error(`Download error.`, res)
    return res
  } 

  const fullPath = path.join(downloadPath, fileName);
  fs.writeFileSync(fullPath, response.data);

  logger.info("Download completed.", res.statusText)
  return res


}