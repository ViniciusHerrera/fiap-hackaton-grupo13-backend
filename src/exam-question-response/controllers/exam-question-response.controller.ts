import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExamQuestionResponseService } from '../services/exam-questions-response.service';
import {
  CreateExamQuestionResponseDto,
  UpdateExamQuestionResponseDto,
} from '../dtos/exam-question-response.dto';

@Controller('exam_question_response')
export class ExamQuestionsResponseController {
  constructor(
    private readonly examQuestionResponseService: ExamQuestionResponseService,
  ) {}

  @Post('submit')
  async create(@Body() data: CreateExamQuestionResponseDto) {
    return this.examQuestionResponseService.create(data);
  }

  @Get()
  async findAll() {
    return this.examQuestionResponseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.examQuestionResponseService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateExamQuestionResponseDto,
  ) {
    return this.examQuestionResponseService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.examQuestionResponseService.delete(Number(id));
  }
}
