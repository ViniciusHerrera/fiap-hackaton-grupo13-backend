import { paginationSchema } from 'src/shared/dtos/pagination.dto';
import { z } from 'zod';

export const getExamsByClassroomIdSchema = paginationSchema.extend({
  classroom_id: z.coerce.number(),
});

export type IGetExamsByClassroomIdSchema = z.infer<
  typeof getExamsByClassroomIdSchema
>;
