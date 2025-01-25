import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'teacher' })
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
