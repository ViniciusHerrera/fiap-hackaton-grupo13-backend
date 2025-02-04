import { z } from 'zod';

export const getStudentsWhoAnsweredExamSchema = z
  .object({
    exam_id: z.coerce.number(),
  })
  .required();

export const studentIdSchema = z.coerce.number();

export type GetStudentsWhoAnsweredExamDTO = z.infer<
  typeof getStudentsWhoAnsweredExamSchema
>;
