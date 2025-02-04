import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IExamResultRepository } from './interfaces/exam-result.repository.interface';
import { ExamResult } from '../entities/exam-result.entity';

@Injectable()
export class ExamResultRepositoryService implements IExamResultRepository {
  constructor(
    @InjectRepository(ExamResult)
    private readonly examResultRepository: Repository<ExamResult>,
  ) {}
}
