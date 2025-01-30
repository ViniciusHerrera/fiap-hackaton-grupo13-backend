import { z } from 'zod';

export const createExamsSchema = z
  .object({
    date: z.coerce.date(),
    answerable: z.boolean(),
    classroom_id: z.number(),
    teacher_id: z.number(),
  })
  .required();

export type CreateExamsDTO = z.infer<typeof createExamsSchema>;
