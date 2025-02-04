import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IExamQuestionResponseRepository } from './interfaces/exam-question-response.repository.interface';
import { ExamQuestionResponse } from '../entities/exam-question-response';

@Injectable()
export class ExamQuestionResponseRepositoryService
  implements IExamQuestionResponseRepository
{
  constructor(
    @InjectRepository(ExamQuestionResponse)
    private readonly examQuestionResponseRepository: Repository<ExamQuestionResponse>,
  ) {}
}
