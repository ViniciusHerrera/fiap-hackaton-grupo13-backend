import { ExamQuestionResponse } from 'src/exam-question-response/entities/exam-question-response.entity';

export const EXAM_QUESTIONS_RESPONSE_REPOSITORY =
  'EXAM_QUESTIONS_RESPONSE_REPOSITORY';

export interface IExamQuestionResponseRepository {
  create(data: Partial<ExamQuestionResponse>): Promise<ExamQuestionResponse>;
  findAll(): Promise<ExamQuestionResponse[]>;
  findOne(id: number): Promise<ExamQuestionResponse | null>;
  update(
    id: number,
    data: Partial<ExamQuestionResponse>,
  ): Promise<ExamQuestionResponse | null>;
}
