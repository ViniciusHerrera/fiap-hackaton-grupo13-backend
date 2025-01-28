import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IEnrollment } from './models/enrollment.interface';

@Entity({ name: 'enrollment' })
export class Enrollment implements IEnrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  //   @ManyToOne(() => Student)
  //   @JoinColumn({ name: 'student_id' })
  //   student: Student;

  //   @ManyToOne(() => Classroom)
  //   @JoinColumn({ name: 'classroom_id' })
  //   classroom: Classroom;
}
