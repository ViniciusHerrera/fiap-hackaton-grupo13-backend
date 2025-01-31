import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  date_of_birth: string;
}
