import { Controller } from '@nestjs/common';
import { ResultService } from '../services/result.service';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}
}
