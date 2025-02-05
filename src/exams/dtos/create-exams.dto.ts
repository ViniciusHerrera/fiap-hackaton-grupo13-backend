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

export const CreateExamDto = z.object({
  date: z.string(),
  classroom_id: z.number(),
  answerable: z.boolean().optional().default(true),
});

export type CreateExamDtoType = z.infer<typeof CreateExamDto>;
