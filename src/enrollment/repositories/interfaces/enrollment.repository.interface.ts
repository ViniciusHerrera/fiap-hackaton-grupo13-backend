import { CreateEnrollmentDTO } from 'src/enrollment/dtos/create-enrollment';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';

export const ENROLLMENT_REPOSITORY = 'ENROLLMENT_REPOSITORY';

export interface IEnrollmentRepository {
  createEnrollment(enrollment: CreateEnrollmentDTO): Promise<Enrollment>;
}
