import { z } from 'zod';

export const GetExamQuestionsDto = z.object({
  examId: z
    .number({ required_error: 'examId is required' })
    .positive('examId must be a positive number'),
});

export type GetExamQuestionsDtoType = z.infer<typeof GetExamQuestionsDto>;
