import { Injectable } from '@nestjs/common';
import { IClassroomRepository } from './interfaces/classroom.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from '../entities/classroom.entity';
import { Repository } from 'typeorm';
import { CreateClassroomDTO } from '../dtos/create-classroom.dto';
import { UpdateClassroomDTO } from '../dtos/update-classroom.dto';
import { FilterClassroomDTO } from '../dtos/filter-classroom.dto';
import { TeacherService } from 'src/teacher/services/teacher.service';

@Injectable()
export class ClassroomRepositoryService implements IClassroomRepository {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    private readonly teacherService: TeacherService,
  ) {}

  async createClassroom(classroom: CreateClassroomDTO): Promise<Classroom> {
    const teacher = await this.teacherService.getTeacherById(
      classroom.teacher_id,
    );

    if (!teacher) {
      throw new Error('Teacher not found');
    }

    const newClassroom = this.classroomRepository.create({
      ...classroom,
      teacher,
    });

    return this.classroomRepository.save(newClassroom);
  }

  async getClassroomById(
    filter: FilterClassroomDTO,
  ): Promise<Classroom | null> {
    console.log(filter);

    return await this.classroomRepository.findOne({
      where: { id: filter.id, teacher: { id: filter.teacherId } },
      relations: ['teacher'],
    });
  }

  async getClassroomByTeacherId(
    teacher_id: number,
  ): Promise<Classroom[] | null> {
    return await this.classroomRepository.find({
      where: { teacher: { id: teacher_id } },
      relations: ['teacher'],
    });
  }

  async updateClassroom(
    id: number,
    updateDto: UpdateClassroomDTO,
  ): Promise<Classroom | null> {
    const classroom = await this.getClassroomById({
      id,
      teacherId: updateDto.teacher_id,
    });
    if (!classroom) {
      return null;
    }

    Object.assign(classroom, updateDto);
    return await this.classroomRepository.save(classroom);
  }
}
