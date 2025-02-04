import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamQuestionResponse } from './entities/exam-question-response';
import { ExamQuestionsResponseController } from './controllers/exam-question-response.controller';
import { ExamQuestionResponseService } from './services/exam-questions-response.service';
import { EXAM_QUESTIONS_RESPONSE_REPOSITORY } from './repositories/interfaces/exam-question-response.repository.interface';
import { ExamQuestionResponseRepositoryService } from './repositories/exam-question-response.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamQuestionResponse])],
  controllers: [ExamQuestionsResponseController],
  providers: [
    ExamQuestionResponseService,
    {
      provide: EXAM_QUESTIONS_RESPONSE_REPOSITORY,
      useClass: ExamQuestionResponseRepositoryService,
    },
  ],
})
export class ExamQuestionResponseModule {}
