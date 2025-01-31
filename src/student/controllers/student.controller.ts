import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation-pipe';
import {
  CreateStudentDTO,
  createStudentSchema,
  studentIdSchema,
} from '../dtos/create-student.dto';
import { Student } from '../entities/student.entity';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createStudentSchema))
  async createStudent(
    @Body() createStudentDTO: CreateStudentDTO,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentDTO);
  }

  @Get(':id')
  async getStudentById(
    @Param('id', new ZodValidationPipe(studentIdSchema)) id: number,
  ): Promise<Student | null> {
    const student = await this.studentService.getStudentById(id);

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }
}
