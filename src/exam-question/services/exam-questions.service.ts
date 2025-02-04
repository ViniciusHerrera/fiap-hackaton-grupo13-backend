import { Inject, Injectable } from '@nestjs/common';
import { EXAM_QUESTION_REPOSITORY } from '../repositories/interfaces/exam-question.repository.interface';
import { ExamQuestionRepositoryService } from '../repositories/exam-question.repository.service';

@Injectable()
export class ExamQuestionService {
  constructor(
    @Inject(EXAM_QUESTION_REPOSITORY)
    private readonly examQuestionRepository: ExamQuestionRepositoryService,
  ) {}
}
