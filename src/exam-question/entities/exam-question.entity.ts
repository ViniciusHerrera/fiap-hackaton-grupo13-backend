import { Exams } from 'src/exams/entities/exams.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'exam_question' })
export class ExamQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  type: string;

  @ManyToOne(() => Exams)
  @JoinColumn({ name: 'exam_id' })
  exam: Exams;
}
