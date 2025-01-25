import { CreateTeacherDTO } from 'src/teacher/dtos/create-teacher.dto';
import { Teacher } from 'src/teacher/entities/teacher.entity';

export const TEACHER_REPOSITORY = 'TEACHER_REPOSITORY';

export interface ITeacherRepository {
  createTeacher(teacher: CreateTeacherDTO): Promise<Teacher>;
  getTeacherById(id: number): Promise<Teacher | null>;
  getTeacherByEmail(email: string): Promise<Teacher | null>;
}
