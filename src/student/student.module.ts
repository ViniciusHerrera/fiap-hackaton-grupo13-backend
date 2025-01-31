import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentRepositoryService } from './repositories/student.repository.service';
import { STUDENT_REPOSITORY } from './repositories/interfaces/student.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [
    StudentService,
    {
      provide: STUDENT_REPOSITORY,
      useClass: StudentRepositoryService,
    },
  ],
})
export class StudentModule {}
