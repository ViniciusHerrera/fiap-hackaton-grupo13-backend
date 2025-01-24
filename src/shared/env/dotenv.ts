import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  APP_NAME: z.string().default('EduSonda'),
  APP_PORT: z.coerce.number().default(3000),
  APP_ENV: z.enum(['development', 'production']).default('development'),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables');
}

export const env = _env.data;
