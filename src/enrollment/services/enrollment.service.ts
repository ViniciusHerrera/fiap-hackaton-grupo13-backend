import { Inject, Injectable } from '@nestjs/common';
import { ENROLLMENT_REPOSITORY } from '../repositories/interfaces/enrollment.repository.interface';
import { EnrollmentRepositoryService } from '../repositories/enrollment.repository.service';
import { CreateEnrollmentDTO } from '../dtos/create-enrollment';
import { Enrollment } from '../entities/enrollment.entity';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @Inject(ENROLLMENT_REPOSITORY)
    private readonly enrollmentRepository: EnrollmentRepositoryService,
  ) {}

  async createEnrollment(enrollment: CreateEnrollmentDTO): Promise<Enrollment> {
    return this.enrollmentRepository.createEnrollment(enrollment);
  }

  async getStudentsByClassroomId(
    classroomId: number,
    teacher_id: number,
    page: number,
    limit: number,
  ): Promise<{
    items: Student[];
    totalPages: number;
    page: number;
    limit: number;
  }> {
    return this.enrollmentRepository.getStudentsByClassroomId(
      classroomId,
      teacher_id,
      page,
      limit,
    );
  }
}
