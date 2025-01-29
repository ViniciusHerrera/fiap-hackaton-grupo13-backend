import { Module } from '@nestjs/common';
import { ClassroomController } from './controllers/classroom.controller';
import { ClassroomService } from './services/classroom.service';
import { Classroom } from './entities/classroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CLASSROOM_REPOSITORY } from './repositories/interfaces/classroom.repository.interface';
import { ClassroomRepositoryService } from './repositories/classroom.repository.service';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
  imports: [TypeOrmModule.forFeature([Classroom]), TeacherModule],
  controllers: [ClassroomController],
  providers: [
    ClassroomService,
    {
      provide: CLASSROOM_REPOSITORY,
      useClass: ClassroomRepositoryService,
    },
  ],
})
export class ClassroomModule {}
