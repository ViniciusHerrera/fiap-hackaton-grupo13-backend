import { Inject, Injectable } from '@nestjs/common';
import { EXAMS_REPOSITORY } from '../repositories/interfaces/exams.repository.interface';
import { ExamsRepositoryService } from '../repositories/exams.repository.service';
import { CreateExamsDTO } from '../dtos/create-exams.dto';
import { Exams } from '../entities/exams.entity';

@Injectable()
export class ExamsService {
  constructor(
    @Inject(EXAMS_REPOSITORY)
    private readonly examsRepository: ExamsRepositoryService,
  ) {}

  async createExams(exams: CreateExamsDTO): Promise<Exams> {
    return this.examsRepository.createExams(exams);
  }
}
