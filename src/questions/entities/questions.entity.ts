import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IQuestions } from './models/questions.interface';

@Entity({ name: 'questions' })
export class Questions implements IQuestions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  type: string;

  // @ManyToOne(() => Exams)
  // @JoinColumn({ name: 'exam_id' })
  // exam_id: number;
}
