import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().email(),
  })
  .required();

export type LoginDto = z.infer<typeof loginSchema>;
