import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exams } from 'src/exams/entities/exams.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { IExamResult } from './models/exam-result.interface';

@Entity({ name: 'exam_result' })
export class ExamResult implements IExamResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  result: string;

  @ManyToOne(() => Exams)
  @JoinColumn({ name: 'exam_id' })
  exams: Exams;

  @ManyToOne(() => Enrollment)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment;
}
