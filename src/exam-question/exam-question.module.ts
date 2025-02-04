import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamQuestion } from './entities/exam-question.entity';
import { ExamQuestionsController } from './controllers/exam-questions.controller';
import { EXAM_QUESTION_REPOSITORY } from './repositories/interfaces/exam-question.repository.interface';
import { ExamQuestionService } from './services/exam-questions.service';
import { ExamQuestionRepositoryService } from './repositories/exam-question.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamQuestion])],
  controllers: [ExamQuestionsController],
  providers: [
    ExamQuestionService,
    {
      provide: EXAM_QUESTION_REPOSITORY,
      useClass: ExamQuestionRepositoryService,
    },
  ],
})
export class ExamQuestionModule {}
