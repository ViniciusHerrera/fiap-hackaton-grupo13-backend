import { Module } from '@nestjs/common';
import { Enrollment } from './entities/enrollment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentController } from './controller/enrollment.controller';
import { EnrollmentService } from './services/enrollment.service';
import { ENROLLMENT_REPOSITORY } from './repositories/interfaces/enrollment.repository.interface';
import { EnrollmentRepositoryService } from './repositories/enrollment.repository.service';
import { TeacherModule } from 'src/teacher/teacher.module';
import { StudentModule } from 'src/student/student.module';
import { ClassroomModule } from 'src/classroom/classroom.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment]),
    TeacherModule,
    StudentModule,
    ClassroomModule,
  ],
  controllers: [EnrollmentController],
  providers: [
    EnrollmentService,
    {
      provide: ENROLLMENT_REPOSITORY,
      useClass: EnrollmentRepositoryService,
    },
  ],
})
export class EnrollmentModule {}
