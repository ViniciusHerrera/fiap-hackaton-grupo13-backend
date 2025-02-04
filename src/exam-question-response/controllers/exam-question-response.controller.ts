import { Controller } from '@nestjs/common';
import { ExamQuestionResponseService } from '../services/exam-questions-response.service';

@Controller('exam_question_response')
export class ExamQuestionsResponseController {
  constructor(
    private readonly examQuestionResponseService: ExamQuestionResponseService,
  ) {}
}
