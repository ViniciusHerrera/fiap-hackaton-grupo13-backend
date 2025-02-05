import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ExamsService } from '../services/exams.service';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation-pipe';
import {
  CreateExamDto,
  CreateExamsDTO,
  createExamsSchema,
} from '../dtos/create-exams.dto';
import { Exams } from '../entities/exams.entity';
import {
  getExamsByClassroomIdSchema,
  IGetExamsByClassroomIdSchema,
} from '../dtos/get-exams-by-classroom-id.dto';
import { examsIdSchema } from '../dtos/filter-exams.dto';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post('/create-with-questions')
  async create(@Body() body: any) {
    const parsedBody = CreateExamDto.parse(body);
    return this.examsService.createWithQuestions(parsedBody);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createExamsSchema))
  async createExams(@Body() createExamsDTO: CreateExamsDTO): Promise<Exams> {
    return this.examsService.createExams(createExamsDTO);
  }

  @Get(':id')
  async getExamById(
    @Param('id', new ZodValidationPipe(examsIdSchema)) id: number,
  ): Promise<Exams | null> {
    const exam = await this.examsService.getExamById(id);

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    return exam;
  }

  @Get()
  async getExamsByClassroomId(
    @Query(new ZodValidationPipe(getExamsByClassroomIdSchema))
    paginationParams: IGetExamsByClassroomIdSchema,
  ): Promise<{
    items: Exams[];
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const { classroom_id, page, limit } = paginationParams;

    const result = await this.examsService.getExamsByClassroomId(
      classroom_id,
      page,
      limit,
    );

    return result;
  }
}
