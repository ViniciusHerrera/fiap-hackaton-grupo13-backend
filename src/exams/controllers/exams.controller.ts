import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ExamsService } from '../services/exams.service';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation-pipe';
import { CreateExamsDTO, createExamsSchema } from '../dtos/create-exams.dto';
import { Exams } from '../entities/exams.entity';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createExamsSchema))
  async createExams(@Body() createExamsDTO: CreateExamsDTO): Promise<Exams> {
    return this.examsService.createExams(createExamsDTO);
  }
}
