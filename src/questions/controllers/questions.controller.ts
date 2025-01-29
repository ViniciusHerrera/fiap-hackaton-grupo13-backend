import { Controller } from '@nestjs/common';
import { QuestionsService } from '../services/questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
}
