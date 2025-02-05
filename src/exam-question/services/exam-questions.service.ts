import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EXAM_QUESTION_REPOSITORY } from '../repositories/interfaces/exam-question.repository.interface';
import { ExamQuestionRepositoryService } from '../repositories/exam-question.repository.service';
import { ExamQuestion } from '../entities/exam-question.entity';
import { GetExamQuestionsDto } from '../dtos/get-exam-questions.dto';

@Injectable()
export class ExamQuestionService {
  constructor(
    @Inject(EXAM_QUESTION_REPOSITORY)
    private readonly examQuestionRepository: ExamQuestionRepositoryService,
  ) {}

  async getExamQuestionsByExamId(examId: number): Promise<ExamQuestion[]> {
    const parsed = GetExamQuestionsDto.safeParse({ examId });

    if (!parsed.success) {
      throw new BadRequestException(parsed.error.format());
    }

    const examQuestions =
      await this.examQuestionRepository.findByExamId(examId);
    if (!examQuestions.length) {
      throw new NotFoundException(
        `No questions found for exam with ID ${examId}`,
      );
    }

    return examQuestions;
  }
}
