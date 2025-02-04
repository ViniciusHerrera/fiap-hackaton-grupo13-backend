import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Query,
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
import { StudentResponseDto } from '../dtos/student-response.dto';
import {
  GetStudentsWhoAnsweredExamDTO,
  getStudentsWhoAnsweredExamSchema,
} from '../dtos/get-students-who-answered-exam.dto';

@Controller('student')
export class StudentController {
  private readonly logger = new Logger(StudentController.name);
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createStudentSchema))
  async createStudent(
    @Body() createStudentDTO: CreateStudentDTO,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentDTO);
  }

  @Get('answered-exam')
  async getStudentsWhoAnsweredExam(
    @Query(new ZodValidationPipe(getStudentsWhoAnsweredExamSchema))
    examId: GetStudentsWhoAnsweredExamDTO,
  ): Promise<StudentResponseDto[]> {
    const { exam_id } = examId;
    try {
      const students =
        await this.studentService.getStudentsWhoAnsweredExam(exam_id);
      console.log(students);

      return students;
    } catch (error) {
      console.log(error);
    }
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
