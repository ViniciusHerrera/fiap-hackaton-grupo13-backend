import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamQuestion } from '../entities/exam-question.entity';
import { IExamQuestionRepository } from './interfaces/exam-question.repository.interface';

@Injectable()
export class ExamQuestionRepositoryService implements IExamQuestionRepository {
  constructor(
    @InjectRepository(ExamQuestion)
    private readonly examQuestionRepository: Repository<ExamQuestion>,
  ) {}

  async findByExamId(examId: number): Promise<ExamQuestion[]> {
    return this.examQuestionRepository.find({
      where: { exam: { id: examId } },
      relations: ['responses'],
    });
  }
}
