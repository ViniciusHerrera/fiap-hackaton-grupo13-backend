import { paginationSchema } from 'src/shared/dtos/pagination.dto';
import { z } from 'zod';

export const getClassroomByTeacherIdSchema = paginationSchema.extend({
  teacher_id: z.coerce.number(),
});

export type IGetClassroomByTeacherIdSchema = z.infer<
  typeof getClassroomByTeacherIdSchema
>;
