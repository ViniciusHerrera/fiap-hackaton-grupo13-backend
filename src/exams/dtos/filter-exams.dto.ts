import { z } from 'zod';

export const filterExamsSchema = z
  .object({
    id: z.number(),
    classroomId: z.number(),
  })
  .required();

export const examsIdSchema = z.coerce.number();

export const examsIdBodySchema = z
  .object({
    exams_id: examsIdSchema,
  })
  .required();

export type FilterExamsDTO = z.infer<typeof filterExamsSchema>;
