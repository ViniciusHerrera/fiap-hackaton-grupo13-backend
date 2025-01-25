import { Module } from '@nestjs/common';
import { TeacherController } from './controllers/teacher.controller';
import { TeacherService } from './services/teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeacherRepositoryService } from './repositories/teacher.repository.service';
import { TEACHER_REPOSITORY } from './repositories/interfaces/teacher.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [
    TeacherService,
    {
      provide: TEACHER_REPOSITORY,
      useClass: TeacherRepositoryService,
    },
  ],
})
export class TeacherModule {}
