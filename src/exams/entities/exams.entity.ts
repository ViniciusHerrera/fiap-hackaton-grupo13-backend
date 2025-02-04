import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IExams } from './models/exams.interface';
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { ExamQuestion } from 'src/exam-question/entities/exam-question.entity';

@Entity({ name: 'exams' })
export class Exams implements IExams {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'date' })
  date: Date;

  @Column()
  answerable: boolean;

  @ManyToOne(() => Classroom)
  @JoinColumn({ name: 'classroom_id' })
  classroom: Classroom;

  @OneToMany(() => ExamQuestion, (examQuestion) => examQuestion.exam)
  exam_questions: ExamQuestion[];
}
