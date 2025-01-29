import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IEnrollmentRepository } from './interfaces/enrollment.repository.interface';
import { Enrollment } from '../entities/enrollment.entity';

@Injectable()
export class EnrollmentRepositoryService implements IEnrollmentRepository {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}
}
