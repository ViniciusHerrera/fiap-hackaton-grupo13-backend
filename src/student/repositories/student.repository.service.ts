import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { Repository } from 'typeorm';
import { IStudentRepository } from './interfaces/student.repository.interface';
import { CreateStudentDTO } from '../dtos/create-student.dto';
import { StudentResponseDto } from '../dtos/student-response.dto';

@Injectable()
export class StudentRepositoryService implements IStudentRepository {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createStudent(student: CreateStudentDTO): Promise<Student> {
    const newStudent = this.studentRepository.create(student);
    return this.studentRepository.save(newStudent);
  }

  async getStudentById(id: number): Promise<Student | null> {
    return this.studentRepository.findOne({ where: { id } });
  }

  async findStudentsWhoAnsweredExam(): Promise<StudentResponseDto[]> {
    return await this.studentRepository.query(`
      SELECT DISTINCT s.id, s.name, s.date_of_birth,
             ex.id as "examId", ex.date as "examDate"
      FROM student s
      JOIN enrollment e ON s.id = e.student_id
      JOIN exam_question_response eqr ON e.id = eqr.enrollment_id
      JOIN exam_question eq ON eq.id = eqr.exam_question_id
      JOIN exams ex ON eq.exam_id = ex.id;
    `);
  }
}
