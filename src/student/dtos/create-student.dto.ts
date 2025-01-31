import { z } from 'zod';

export const createStudentSchema = z
  .object({
    name: z.string(),
    date_of_birth: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Invalid date format, should be yyyy-mm-dd',
      ),
  })
  .required();

export const studentIdSchema = z.coerce.number();

export type CreateStudentDTO = z.infer<typeof createStudentSchema>;
