import { ExamQuestionResponse } from 'src/exam-question-response/entities/exam-question-response.entity';
import { Exams } from 'src/exams/entities/exams.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Exams, (exam) => exam.exam_questions)
  @JoinColumn({ name: 'exam_id' })
  exam: Exams;

  @OneToMany(
    () => ExamQuestionResponse,
    (response) => response.exam_question_id,
  )
  responses: ExamQuestionResponse[];
}
