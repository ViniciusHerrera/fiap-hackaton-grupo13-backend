import { Injectable } from '@nestjs/common';
import { IQuestionsRepository } from './interfaces/questions.repository.interface';
import { Questions } from '../entities/questions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsRepositoryService implements IQuestionsRepository {
  constructor(
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>,
  ) {}
}
