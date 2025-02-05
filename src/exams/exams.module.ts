import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exams } from './entities/exams.entity';
import { ExamsController } from './controllers/exams.controller';
import { ExamsService } from './services/exams.service';
import { EXAMS_REPOSITORY } from './repositories/interfaces/exams.repository.interface';
import { ExamsRepositoryService } from './repositories/exams.repository.service';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { ExamQuestion } from 'src/exam-question/entities/exam-question.entity';
import { Classroom } from 'src/classroom/entities/classroom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exams, ExamQuestion, Classroom]),
    ClassroomModule,
  ],
  controllers: [ExamsController],
  providers: [
    ExamsService,
    {
      provide: EXAMS_REPOSITORY,
      useClass: ExamsRepositoryService,
    },
  ],
})
export class ExamsModule {}
