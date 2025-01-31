import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ClassroomService } from '../services/classroom.service';
import {
  CreateClassroomDTO,
  createClassroomSchema,
} from '../dtos/create-classroom.dto';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation-pipe';
import { Classroom } from '../entities/classroom.entity';
import {
  classroomIdSchema,
  UpdateClassroomDTO,
  updateClassroomSchema,
} from '../dtos/update-classroom.dto';
import {
  FilterTeacherDTO,
  teacherIdBodySchema,
} from 'src/teacher/dtos/create-teacher.dto';
import {} from 'src/shared/dtos/pagination.dto';
import {
  getClassroomByTeacherIdSchema,
  IGetClassroomByTeacherIdSchema,
} from '../dtos/get-classroom-by-teacher-id.dto';

@Controller('classe')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createClassroomSchema))
  async createClassroom(
    @Body() createClassroomDTO: CreateClassroomDTO,
  ): Promise<Classroom> {
    return this.classroomService.createClassroom(createClassroomDTO);
  }

  @Get(':id')
  async getClassroomById(
    @Param('id', new ZodValidationPipe(classroomIdSchema)) id: number,
    @Query(new ZodValidationPipe(teacherIdBodySchema))
    filterTeacherDTO: FilterTeacherDTO,
  ): Promise<Classroom | null> {
    const classroom = await this.classroomService.getClassroomById({
      id,
      teacherId: filterTeacherDTO.teacher_id,
    });

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    return classroom;
  }

  @Get()
  async getClassroomByTeacherId(
    @Query(new ZodValidationPipe(getClassroomByTeacherIdSchema))
    paginationParams: IGetClassroomByTeacherIdSchema,
  ): Promise<{
    items: Classroom[];
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const { page, limit, teacher_id } = paginationParams;

    const result = await this.classroomService.getClassroomByTeacherId(
      teacher_id,
      page,
      limit,
    );

    return result;
  }

  @Put(':id')
  async updateClassroom(
    @Param('id', new ZodValidationPipe(classroomIdSchema)) id: number,
    @Body(new ZodValidationPipe(updateClassroomSchema))
    updateClassroomDTO: UpdateClassroomDTO,
  ): Promise<Classroom | null> {
    const updatedClassroom = await this.classroomService.updateClassroom(
      id,
      updateClassroomDTO,
    );

    if (!updatedClassroom) {
      throw new NotFoundException('Classroom not found');
    }

    return updatedClassroom;
  }
}
