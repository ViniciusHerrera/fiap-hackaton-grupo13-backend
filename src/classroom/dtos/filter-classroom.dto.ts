import { z } from 'zod';

export const filterClassroomSchema = z
  .object({
    id: z.number(),
    teacherId: z.number(),
  })
  .required();

export type FilterClassroomDTO = z.infer<typeof filterClassroomSchema>;
