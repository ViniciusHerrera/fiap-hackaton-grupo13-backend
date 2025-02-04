import { Inject, Injectable } from '@nestjs/common';
import { EXAM_QUESTIONS_RESPONSE_REPOSITORY } from '../repositories/interfaces/exam-question-response.repository.interface';
import { ExamQuestionResponseRepositoryService } from '../repositories/exam-question-response.repository.service';

@Injectable()
export class ExamQuestionResponseService {
  constructor(
    @Inject(EXAM_QUESTIONS_RESPONSE_REPOSITORY)
    private readonly examQuestionResponseRepository: ExamQuestionResponseRepositoryService,
  ) {}
}
