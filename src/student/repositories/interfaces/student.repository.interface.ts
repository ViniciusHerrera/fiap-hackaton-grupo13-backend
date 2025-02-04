import { CreateStudentDTO } from 'src/student/dtos/create-student.dto';
import { StudentResponseDto } from 'src/student/dtos/student-response.dto';
import { Student } from 'src/student/entities/student.entity';

export const STUDENT_REPOSITORY = 'STUDENT_REPOSITORY';

export interface IStudentRepository {
  createStudent(student: CreateStudentDTO): Promise<Student>;
  getStudentById(id: number): Promise<Student | null>;
  findStudentsWhoAnsweredExam(examId: number): Promise<StudentResponseDto[]>;
}
