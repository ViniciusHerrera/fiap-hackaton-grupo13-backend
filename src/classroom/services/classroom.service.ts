import { Inject, Injectable } from '@nestjs/common';
import { CLASSROOM_REPOSITORY } from '../repositories/interfaces/classroom.repository.interface';
import { ClassroomRepositoryService } from '../repositories/classroom.repository.service';
import { CreateClassroomDTO } from '../dtos/create-classroom.dto';
import { Classroom } from '../entities/classroom.entity';
import { FilterClassroomDTO } from '../dtos/filter-classroom.dto';

@Injectable()
export class ClassroomService {
  constructor(
    @Inject(CLASSROOM_REPOSITORY)
    private readonly classroomRepository: ClassroomRepositoryService,
  ) {}

  async createClassroom(classroom: CreateClassroomDTO): Promise<Classroom> {
    return this.classroomRepository.createClassroom(classroom);
  }

  async getClassroomById(
    filterClassroomDTO: FilterClassroomDTO,
  ): Promise<Classroom | null> {
    return this.classroomRepository.getClassroomById(filterClassroomDTO);
  }

  async getClassroomByTeacherId(
    teacher_id: number,
  ): Promise<Classroom[] | null> {
    return this.classroomRepository.getClassroomByTeacherId(teacher_id);
  }

  async updateClassroom(
    id: number,
    updateDto: CreateClassroomDTO,
  ): Promise<Classroom | null> {
    return this.classroomRepository.updateClassroom(id, updateDto);
  }
}
