import { z } from 'zod';

export const createTeacherSchema = z
  .object({
    name: z.string(),
    email: z.string(),
  })
  .required();

export const teacherIdSchema = z.coerce.number();

export const teacherIdBodySchema = z.object({
  teacher_id: teacherIdSchema,
});

export type CreateTeacherDTO = z.infer<typeof createTeacherSchema>;
