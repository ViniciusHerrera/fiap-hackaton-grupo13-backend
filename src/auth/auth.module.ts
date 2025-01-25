import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TEACHER_REPOSITORY } from 'src/teacher/repositories/interfaces/teacher.repository.interface';
import { TeacherRepositoryService } from 'src/teacher/repositories/teacher.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: TEACHER_REPOSITORY,
      useClass: TeacherRepositoryService,
    },
  ],
})
export class AuthModule {}
