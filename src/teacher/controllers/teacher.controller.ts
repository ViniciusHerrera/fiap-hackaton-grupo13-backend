import {
  Body,
  Controller,
  Post,
  UsePipes,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TeacherService } from '../services/teacher.service';
import {
  CreateTeacherDTO,
  createTeacherSchema,
  teacherIdSchema,
} from '../dtos/create-teacher.dto';
import { Teacher } from '../entities/teacher.entity';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation-pipe';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createTeacherSchema))
  async createTeacher(
    @Body() createTeacherDTO: CreateTeacherDTO,
  ): Promise<Teacher> {
    return this.teacherService.createTeacher(createTeacherDTO);
  }

  @Get(':id')
  async getTeacherById(
    @Param('id', new ZodValidationPipe(teacherIdSchema)) id: number,
  ): Promise<Teacher | null> {
    const teacher = await this.teacherService.getTeacherById(id);

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    return teacher;
  }
}
