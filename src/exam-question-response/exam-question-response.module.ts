import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { ExamQuestionsResponseController } from './controllers/exam-question-response.controller';
import { ExamQuestionResponseRepositoryService } from './repositories/exam-question-response.repository.service';
import { ExamQuestionResponseService } from './services/exam-questions-response.service';
import { ExamQuestion } from 'src/exam-question/entities/exam-question.entity';
import { EXAM_QUESTIONS_RESPONSE_REPOSITORY } from './repositories/interfaces/exam-question-response.repository.interface';
import { ExamQuestionResponse } from './entities/exam-question-response.entity';
import { Exams } from 'src/exams/entities/exams.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExamQuestionResponse,
      Enrollment,
      Student,
      ExamQuestion,
      Exams,
    ]),
  ],
  controllers: [ExamQuestionsResponseController],
  providers: [
    ExamQuestionResponseService,
    {
      provide: EXAM_QUESTIONS_RESPONSE_REPOSITORY,
      useClass: ExamQuestionResponseRepositoryService,
    },
  ],
  exports: [ExamQuestionResponseService],
})
export class ExamQuestionResponseModule {}
