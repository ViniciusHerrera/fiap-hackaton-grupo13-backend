import { Inject, Injectable } from '@nestjs/common';
import { TeacherRepositoryService } from '../repositories/teacher.repository.service';
import { TEACHER_REPOSITORY } from '../repositories/interfaces/teacher.repository.interface';
import { CreateTeacherDTO } from '../dtos/create-teacher.dto';
import { Teacher } from '../entities/teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @Inject(TEACHER_REPOSITORY)
    private readonly teacherRepository: TeacherRepositoryService,
  ) {}

  async createTeacher(teacher: CreateTeacherDTO): Promise<Teacher> {
    return this.teacherRepository.createTeacher(teacher);
  }

  async getTeacherById(id: number): Promise<Teacher | null> {
    return this.teacherRepository.getTeacherById(id);
  }

  async getTeacherByEmail(email: string): Promise<Teacher | null> {
    return this.teacherRepository.getTeacherByEmail(email);
  }
}
