import { Inject, Injectable } from '@nestjs/common';
import { STUDENT_REPOSITORY } from '../repositories/interfaces/student.repository.interface';
import { StudentRepositoryService } from '../repositories/student.repository.service';
import { CreateStudentDTO } from '../dtos/create-student.dto';
import { Student } from '../entities/student.entity';
import { StudentResponseDto } from '../dtos/student-response.dto';

@Injectable()
export class StudentService {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: StudentRepositoryService,
  ) {}

  async createStudent(student: CreateStudentDTO): Promise<Student> {
    return this.studentRepository.createStudent(student);
  }

  async getStudentById(id: number): Promise<Student | null> {
    return this.studentRepository.getStudentById(id);
  }

  async getStudentsWhoAnsweredExam(
    examId: number,
  ): Promise<StudentResponseDto[]> {
    return await this.studentRepository.findStudentsWhoAnsweredExam(examId);
  }
}
