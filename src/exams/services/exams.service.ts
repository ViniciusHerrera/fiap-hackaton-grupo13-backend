import { Inject, Injectable } from '@nestjs/common';
import { EXAMS_REPOSITORY } from '../repositories/interfaces/exams.repository.interface';
import { ExamsRepositoryService } from '../repositories/exams.repository.service';
import { CreateExamDtoType, CreateExamsDTO } from '../dtos/create-exams.dto';
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

  async getExamById(id: number): Promise<Exams | null> {
    return this.examsRepository.getExamById(id);
  }

  async getExamsByClassroomId(
    classroom_id: number,
    page: number,
    limit: number,
  ) {
    return this.examsRepository.getExamsByClassroomId(
      classroom_id,
      page,
      limit,
    );
  }

  async createWithQuestions(
    createExamDto: CreateExamDtoType,
  ): Promise<Exams | null> {
    return this.examsRepository.createWithQuestions(createExamDto);
  }
}
