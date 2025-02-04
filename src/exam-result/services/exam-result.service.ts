import { Inject, Injectable } from '@nestjs/common';
import { EXAM_RESULT_REPOSITORY } from '../repositories/interfaces/exam-result.repository.interface';
import { ExamResultRepositoryService } from '../repositories/exam-result.repository.service';

@Injectable()
export class ExamResultService {
  constructor(
    @Inject(EXAM_RESULT_REPOSITORY)
    private readonly ExamResultRepository: ExamResultRepositoryService,
  ) {}
}
