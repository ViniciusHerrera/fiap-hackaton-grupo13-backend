import { CreateEnrollmentDTO } from 'src/enrollment/dtos/create-enrollment';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { Student } from 'src/student/entities/student.entity';

export const ENROLLMENT_REPOSITORY = 'ENROLLMENT_REPOSITORY';

export interface IEnrollmentRepository {
  createEnrollment(enrollment: CreateEnrollmentDTO): Promise<Enrollment>;
  getStudentsByClassroomId(
    classroomId: number,
    teacherId: number,
    page: number,
    limit: number,
  ): Promise<{
    items: Student[];
    totalPages: number;
    page: number;
    limit: number;
  }>;
}
