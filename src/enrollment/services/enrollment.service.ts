import { Inject, Injectable } from '@nestjs/common';
import { ENROLLMENT_REPOSITORY } from '../repositories/interfaces/enrollment.repository.interface';
import { EnrollmentRepositoryService } from '../repositories/enrollment.repository.service';

@Injectable()
export class EnrollmentService {
  constructor(
    @Inject(ENROLLMENT_REPOSITORY)
    private readonly enrollmentRepository: EnrollmentRepositoryService,
  ) {}
}
