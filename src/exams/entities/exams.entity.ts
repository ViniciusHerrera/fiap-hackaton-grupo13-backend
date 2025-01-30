import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IExams } from './models/exams.interface';

@Entity({ name: 'exams' })
export class Exams implements IExams {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'date' })
  date: Date;

  @Column()
  answaerable: string;

  //   @ManyToOne(() => Classroom)
  //   @JoinColumn({ name: 'classroom_id' })
  //   classroom: Classroom;
}
