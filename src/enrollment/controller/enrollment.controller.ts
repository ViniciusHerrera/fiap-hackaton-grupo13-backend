import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { EnrollmentService } from '../services/enrollment.service';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation-pipe';
import {
  CreateEnrollmentDTO,
  createEnrollmentSchema,
  enrollmentIdSchema,
} from '../dtos/create-enrollment';
import { Enrollment } from '../entities/enrollment.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  getClassroomByTeacherIdSchema,
  IGetClassroomByTeacherIdSchema,
} from 'src/classroom/dtos/get-classroom-by-teacher-id.dto';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createEnrollmentSchema))
  async createEnrollment(
    @Body() createEnrollmentDTO: CreateEnrollmentDTO,
  ): Promise<Enrollment> {
    return this.enrollmentService.createEnrollment(createEnrollmentDTO);
  }

  @Get(':id/students')
  async getStudentsByClassroomId(
    @Param('id', new ZodValidationPipe(enrollmentIdSchema)) id: number,
    @Query(new ZodValidationPipe(getClassroomByTeacherIdSchema))
    paginationParams: IGetClassroomByTeacherIdSchema,
  ): Promise<{
    items: Student[];
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const { page, limit, teacher_id } = paginationParams;

    return this.enrollmentService.getStudentsByClassroomId(
      id,
      teacher_id,
      page,
      limit,
    );
  }
}
