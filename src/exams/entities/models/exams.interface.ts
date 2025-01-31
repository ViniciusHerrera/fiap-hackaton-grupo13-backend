import { Classroom } from 'src/classroom/entities/classroom.entity';

export interface IExams {
  id?: number;
  date: Date;
  answerable: boolean;
  classroom: Classroom;
}
