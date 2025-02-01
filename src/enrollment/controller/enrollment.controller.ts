import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { EnrollmentService } from '../services/enrollment.service';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation-pipe';
import {
  CreateEnrollmentDTO,
  createEnrollmentSchema,
} from '../dtos/create-enrollment';
import { Enrollment } from '../entities/enrollment.entity';

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
}
