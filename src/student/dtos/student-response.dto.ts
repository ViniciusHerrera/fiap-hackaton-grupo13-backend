import { z } from 'zod';

export const StudentResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  date_of_birth: z.coerce.date(),
  examId: z.number().optional(),
  examDate: z.coerce.date().optional(),
});

export type StudentResponseDto = z.infer<typeof StudentResponseSchema>;
