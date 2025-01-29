import { CreateClassroomDTO } from 'src/classroom/dtos/create-classroom.dto';
import { FilterClassroomDTO } from 'src/classroom/dtos/filter-classroom.dto';
import { Classroom } from 'src/classroom/entities/classroom.entity';

export const CLASSROOM_REPOSITORY = 'CLASSROOM_REPOSITORY';

export interface IClassroomRepository {
  createClassroom(classroom: CreateClassroomDTO): Promise<Classroom>;
  getClassroomById(filter: FilterClassroomDTO): Promise<Classroom | null>;
  getClassroomByTeacherId(teacher_id: number): Promise<Classroom[] | null>;
  updateClassroom(
    id: number,
    classroom: CreateClassroomDTO,
  ): Promise<Classroom | null>;
}
