import { LoginDto } from './../dtos/login.dto';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TEACHER_REPOSITORY } from 'src/teacher/repositories/interfaces/teacher.repository.interface';
import { TeacherRepositoryService } from 'src/teacher/repositories/teacher.repository.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TEACHER_REPOSITORY)
    private readonly teacherRepository: TeacherRepositoryService,
  ) {}

  async login(LoginDto: LoginDto) {
    const user = await this.teacherRepository.getTeacherByEmail(LoginDto.email);

    if (!user) {
      throw new UnauthorizedException('User unauthorized');
    }

    return user;
  }
}
