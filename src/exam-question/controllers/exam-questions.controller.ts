import { Controller } from '@nestjs/common';
import { ExamQuestionService } from '../services/exam-questions.service';

@Controller('exam_question')
export class ExamQuestionsController {
  constructor(private readonly examQuestionService: ExamQuestionService) {}
}
