import { Injectable, NotFoundException } from '@nestjs/common';
import { Exams } from '../entities/exams.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IExamsRepository } from './interfaces/exams.repository.interface';
import { CreateExamsDTO } from '../dtos/create-exams.dto';
import { ClassroomService } from 'src/classroom/services/classroom.service';

@Injectable()
export class ExamsRepositoryService implements IExamsRepository {
  constructor(
    @InjectRepository(Exams)
    private readonly examsRepository: Repository<Exams>,
    private readonly classroomService: ClassroomService,
  ) {}

  async createExams(exams: CreateExamsDTO): Promise<Exams> {
    console.log(exams.classroom_id);
    console.log(exams.teacher_id);
    const classroom = await this.classroomService.getClassroomById({
      id: exams.classroom_id,
      teacherId: exams.teacher_id,
    });

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    const newExam = this.examsRepository.create({
      ...exams,
      classroomId: classroom,
    });

    return this.examsRepository.save(newExam);
  }
}
