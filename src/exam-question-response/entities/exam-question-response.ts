import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { ExamQuestion } from 'src/exam-question/entities/exam-question.entity';

@Entity({ name: 'exam_question_response' })
export class ExamQuestionResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  response: string;

  @ManyToOne(() => ExamQuestion)
  @JoinColumn({ name: 'exam_question_id' })
  exam_question_id: ExamQuestion;

  @ManyToOne(() => Enrollment)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment;
}
