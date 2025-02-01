import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IEnrollmentRepository } from './interfaces/enrollment.repository.interface';
import { Enrollment } from '../entities/enrollment.entity';
import { CreateEnrollmentDTO } from '../dtos/create-enrollment';
import { TeacherService } from 'src/teacher/services/teacher.service';
import { StudentService } from 'src/student/services/student.service';
import { ClassroomService } from 'src/classroom/services/classroom.service';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class EnrollmentRepositoryService implements IEnrollmentRepository {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private readonly classroomService: ClassroomService,
  ) {}

  async createEnrollment(enrollment: CreateEnrollmentDTO): Promise<Enrollment> {
    const { student_id, classroom_id, teacher_id, start_date, end_date } =
      enrollment;

    const teacher = await this.teacherService.getTeacherById(teacher_id);
    if (!teacher) {
      throw new UnauthorizedException('Teacher not authorized');
    }

    const student = await this.studentService.getStudentById(student_id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const classroom = await this.classroomService.getClassroomById({
      id: classroom_id,
      teacherId: teacher_id,
    });
    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    const newEnrollment = this.enrollmentRepository.create({
      startDate: new Date(start_date),
      endDate: new Date(end_date),
      student,
      classroom,
    });

    return this.enrollmentRepository.save(newEnrollment);
  }

  async getStudentsByClassroomId(
    classroomId: number,
    teacherId: number,
    page: number,
    limit: number,
  ): Promise<{
    items: Student[];
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const [items, total] = await this.enrollmentRepository.findAndCount({
      where: { classroom: { id: classroomId, teacher: { id: teacherId } } },
      relations: ['student'],
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      items: items.map((enrollment) => enrollment.student),
      totalPages: Math.ceil(total / limit),
      page,
      limit,
    };
  }
}
