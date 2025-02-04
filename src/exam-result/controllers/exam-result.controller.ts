import { Controller } from '@nestjs/common';
import { ExamResultService } from '../services/exam-result.service';

@Controller('examResult')
export class ExamResultController {
  constructor(private readonly examResultService: ExamResultService) {}
}
