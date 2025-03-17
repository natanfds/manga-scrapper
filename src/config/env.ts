import {z} from 'zod'
import 'dotenv/config'
import path from 'path';
import fs from 'fs';


const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  BROWSER_PATH: z.string(),
  DOWNLOAD_PATH: z.string().refine((value) => {
    const caminhoAbsoluto = path.resolve(value);
    const exists = fs.existsSync(caminhoAbsoluto);
    const stat = fs.statSync(caminhoAbsoluto).isDirectory();
    return exists && stat;
  }, {
      message: "Download folder doesn`t exists",
  }),
  LOG_FILE: z.string()
})

const envValidation = envSchema.safeParse(process.env)

if(!envValidation.success){
  console.error("Error on env validation", envValidation.error.format());
  process.exit(1);
}

export const env = envValidation.data