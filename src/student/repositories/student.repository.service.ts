import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { Repository } from 'typeorm';
import { IStudentRepository } from './interfaces/student.repository.interface';
import { CreateStudentDTO } from '../dtos/create-student.dto';

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
}
