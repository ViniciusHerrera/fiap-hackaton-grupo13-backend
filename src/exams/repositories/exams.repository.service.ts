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

  async getExamById(id: number): Promise<Exams | null> {
    return this.examsRepository.findOne({ where: { id } });
  }

  async createExams(exams: CreateExamsDTO): Promise<Exams> {
    const classroom = await this.classroomService.getClassroomById({
      id: exams.classroom_id,
      teacherId: exams.teacher_id,
    });

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    const newExam = this.examsRepository.create({
      ...exams,
      classroom: classroom,
    });

    return this.examsRepository.save(newExam);
  }

  async getExamsByClassroomId(
    classroom_id: number,
    page: number,
    limit: number,
  ): Promise<{
    items: Exams[];
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const [items, total] = await this.examsRepository.findAndCount({
      where: { classroom: { id: classroom_id } },
      relations: ['classroom'],
      take: limit,
      skip: (page - 1) * limit,
    });
    console.log('items', items);

    return {
      items,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
    };
  }
}
