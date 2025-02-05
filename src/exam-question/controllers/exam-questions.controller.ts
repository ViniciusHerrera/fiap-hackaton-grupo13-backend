import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ExamQuestionService } from '../services/exam-questions.service';
import { ExamQuestion } from '../entities/exam-question.entity';

@Controller('exam-question')
export class ExamQuestionsController {
  constructor(private readonly examQuestionService: ExamQuestionService) {}

  @Get(':examId')
  async getExamQuestionsByExamId(
    @Param('examId', ParseIntPipe) examId: number,
  ): Promise<ExamQuestion[]> {
    return this.examQuestionService.getExamQuestionsByExamId(examId);
  }
}
