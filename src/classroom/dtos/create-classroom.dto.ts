import { z } from 'zod';

export const createClassroomSchema = z
  .object({
    name: z.string(),
    year: z.number(),
    step: z.string(),
    teacher_id: z.number(),
  })
  .required();

export type CreateClassroomDTO = z.infer<typeof createClassroomSchema>;
