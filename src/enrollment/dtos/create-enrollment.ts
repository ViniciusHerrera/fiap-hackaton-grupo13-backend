import { z } from 'zod';

export const createEnrollmentSchema = z
  .object({
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    student_id: z.number(),
    classroom_id: z.number(),
    teacher_id: z.number(),
  })
  .required();

export const enrollmentIdSchema = z.coerce.number();

export type CreateEnrollmentDTO = z.infer<typeof createEnrollmentSchema>;
