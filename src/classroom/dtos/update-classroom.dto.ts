import { z } from 'zod';

export const updateClassroomSchema = z
  .object({
    name: z.string(),
    year: z.number(),
    step: z.string(),
    teacher_id: z.number(),
  })
  .required();

export const classroomIdSchema = z.coerce.number();

export type UpdateClassroomDTO = z.infer<typeof updateClassroomSchema>;
