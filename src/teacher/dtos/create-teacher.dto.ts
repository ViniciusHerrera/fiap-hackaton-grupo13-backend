import { z } from 'zod';

export const createTeacherSchema = z
  .object({
    name: z.string(),
    email: z.string(),
  })
  .required();

export const teacherIdSchema = z.coerce.number();

export type CreateTeacherDTO = z.infer<typeof createTeacherSchema>;
