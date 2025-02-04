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

  async findStudentsWhoAnsweredExam(
    examId: number,
  ): Promise<StudentResponseDto[]> {
    console.log(examId);
    return this.studentRepository
      .createQueryBuilder('s')
      .select([
        's.id',
        's.name',
        's.date_of_birth',
        'CASE WHEN eqr.id IS NOT NULL THEN true ELSE false END AS has_completed_exam',
      ])
      .innerJoin('enrollment', 'e', 's.id = e.student_id')
      .innerJoin('classroom', 'c', 'e.classroom_id = c.id')
      .innerJoin('exams', 'ex', 'c.id = ex.classroom_id')
      .leftJoin('exam_question_response', 'eqr', 'e.id = eqr.enrollment_id')
      .where('ex.id = :examId', { examId })
      .groupBy('s.id, s.name, s.date_of_birth, has_completed_exam')
      .getRawMany();

    // return await this.studentRepository.query(`
    //   SELECT s.id, s.name, s.date_of_birth,
    //    CASE
    //        WHEN eqr.id IS NOT NULL THEN true
    //        ELSE false
    //    END AS has_completed_exam
    //   FROM student s
    //   JOIN enrollment e ON s.id = e.student_id
    //   JOIN classroom c ON e.classroom_id = c.id
    //   JOIN exams ex ON c.id = ex.classroom_id
    //   LEFT JOIN exam_question_response eqr ON e.id = eqr.enrollment_id AND ex.id = (
    //       SELECT eq.exam_id
    //       FROM exam_question eq
    //       WHERE eq.id = eqr.exam_question_id
    //       LIMIT 1
    //   )
    //   WHERE ex.id = ${examId}
    //   GROUP BY s.id, s.name, s.date_of_birth, has_completed_exam;
    // `);
  }
}
