import {z} from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  BROWSER_PATH: z.string()
})

const envValidation = envSchema.safeParse(process.env)

if(!envValidation.success){
  console.error("Eror on env validation", envValidation.error.format());
  process.exit(1);
}

export const env = envValidation.data