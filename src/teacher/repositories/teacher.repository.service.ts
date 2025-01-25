import { Injectable } from '@nestjs/common';
import { ITeacherRepository } from './interfaces/teacher.repository.interface';
import { Teacher } from '../entities/teacher.entity';
import { CreateTeacherDTO } from '../dtos/create-teacher.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeacherRepositoryService implements ITeacherRepository {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  createTeacher(teacher: CreateTeacherDTO): Promise<Teacher> {
    const newTeacher = this.teacherRepository.create(teacher);
    return this.teacherRepository.save(newTeacher);
  }

  getTeacherById(id: number): Promise<Teacher | null> {
    return this.teacherRepository.findOne({ where: { id } });
  }

  getTeacherByEmail(email: string): Promise<Teacher | null> {
    return this.teacherRepository.findOne({ where: { email } });
  }
}
