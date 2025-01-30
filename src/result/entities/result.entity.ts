import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IResult } from './models/result.interface';

@Entity({ name: 'result' })
export class Result implements IResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  result: string;

  //   @ManyToOne(() => Exams)
  //   @JoinColumn({ name: 'exam_id' })
  //   exams: Exams;

  //   @ManyToOne(() => Enrollment)
  //   @JoinColumn({ name: 'enrollment_id' })
  //   enrollment: Enrollment;
}
