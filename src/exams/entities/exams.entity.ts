import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IExams } from './models/exams.interface';
import { Classroom } from 'src/classroom/entities/classroom.entity';

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
  classroomId: Classroom;
}
