import { Inject, Injectable } from '@nestjs/common';
import { QUESTIONS_REPOSITORY } from '../repositories/interfaces/questions.repository.interface';
import { QuestionsRepositoryService } from '../repositories/questions.repository.service';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(QUESTIONS_REPOSITORY)
    private readonly questionsRepository: QuestionsRepositoryService,
  ) {}
}
