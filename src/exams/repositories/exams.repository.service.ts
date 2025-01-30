import { Injectable } from '@nestjs/common';
import { Exams } from '../entities/exams.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IExamsRepository } from './interfaces/exams.repository.interface';

@Injectable()
export class ExamsRepositoryService implements IExamsRepository {
  constructor(
    @InjectRepository(Exams)
    private readonly examsRepository: Repository<Exams>,
  ) {}
}
