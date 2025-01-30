import { Injectable } from '@nestjs/common';
import { IResultRepository } from './interfaces/result.repository.interface';
import { Result } from '../entities/result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ResultRepositoryService implements IResultRepository {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}
}
