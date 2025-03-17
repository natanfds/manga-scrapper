import axios from 'axios';
import fs, { mkdir } from 'fs';
import path from 'path';
import { IBotRequestError } from '../types';

export async function downloadImage(
  url: string, 
  downloadPath:string, 
  fileName:string
): Promise<IBotRequestError>{

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

  if(response.status != 200) return res

  const fullPath = path.join(downloadPath, fileName);
  fs.writeFileSync(fullPath, response.data);

  return res


}