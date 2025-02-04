import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamResultController } from './controllers/exam-result.controller';
import { ExamResultService } from './services/exam-result.service';
import { EXAM_RESULT_REPOSITORY } from './repositories/interfaces/exam-result.repository.interface';
import { ExamResultRepositoryService } from './repositories/exam-result.repository.service';
import { ExamResult } from './entities/exam-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamResult])],
  controllers: [ExamResultController],
  providers: [
    ExamResultService,
    {
      provide: EXAM_RESULT_REPOSITORY,
      useClass: ExamResultRepositoryService,
    },
  ],
})
export class ExamResultModule {}
