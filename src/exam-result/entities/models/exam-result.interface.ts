import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { Exams } from 'src/exams/entities/exams.entity';

export interface IExamResult {
  id?: number;
  result: string;
  exams: Exams;
  enrollment: Enrollment;
}
