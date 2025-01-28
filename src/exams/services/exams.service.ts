import { Inject, Injectable } from '@nestjs/common';
import { EXAMS_REPOSITORY } from '../repositories/interfaces/exams.repository.interface';
import { ExamsRepositoryService } from '../repositories/exams.repository.service';

@Injectable()
export class ExamsService {
  constructor(
    @Inject(EXAMS_REPOSITORY)
    private readonly examsRepository: ExamsRepositoryService,
  ) {}
}
