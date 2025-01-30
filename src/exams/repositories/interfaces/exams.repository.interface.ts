import { CreateExamsDTO } from 'src/exams/dtos/create-exams.dto';
import { Exams } from 'src/exams/entities/exams.entity';

export const EXAMS_REPOSITORY = 'EXAMS_REPOSITORY';

export interface IExamsRepository {
  createExams(exams: CreateExamsDTO): Promise<Exams>;
}
