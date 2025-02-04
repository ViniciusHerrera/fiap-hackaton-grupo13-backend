import { z } from 'zod';

export const CreateExamQuestionResponseDto = z.object({
  response: z.string().min(1, 'A resposta não pode estar vazia'),
  exam_question_id: z.number(),
  student_id: z.number().int(),
});

export const UpdateExamQuestionResponseDto = z.object({
  response: z.string().optional(),
});

export type CreateExamQuestionResponseDto = z.infer<
  typeof CreateExamQuestionResponseDto
>;
export type UpdateExamQuestionResponseDto = z.infer<
  typeof UpdateExamQuestionResponseDto
>;
