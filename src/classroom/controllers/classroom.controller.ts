import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
import { teacherIdBodySchema } from 'src/teacher/dtos/create-teacher.dto';

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
  @UsePipes(new ZodValidationPipe(teacherIdBodySchema))
  async getClassroomById(
    @Param('id', new ZodValidationPipe(classroomIdSchema)) id: number,
    @Body() teacher_id: number,
  ): Promise<Classroom | null> {
    console.log(id, teacher_id);
    return this.classroomService.getClassroomById({
      id,
      teacherId: teacher_id,
    });
  }

  @Get()
  @UsePipes(new ZodValidationPipe(teacherIdBodySchema))
  async getClassroomByTeacherId(
    @Body() teacher_id: number,
  ): Promise<Classroom[] | null> {
    return this.classroomService.getClassroomByTeacherId(teacher_id);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateClassroomSchema))
  async updateClassroom(
    @Param('id', new ZodValidationPipe(classroomIdSchema)) id: number,
    @Body() updateClassroomDTO: UpdateClassroomDTO,
  ): Promise<Classroom | null> {
    return this.classroomService.updateClassroom(id, updateClassroomDTO);
  }
}
