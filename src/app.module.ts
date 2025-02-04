import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'src/shared/env/dotenv';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { ExamsModule } from './exams/exams.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ClassroomModule } from './classroom/classroom.module';
import { StudentModule } from './student/student.module';
import { ExamResultModule } from './exam-result/exam-result.module';
import { ExamQuestionResponseModule } from './exam-question-response/exam-question-response.module';
import { ExamQuestionModule } from './exam-question/exam-question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: env.APP_ENV === 'development',
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    TeacherModule,
    AuthModule,
    ExamsModule,
    EnrollmentModule,
    ClassroomModule,
    StudentModule,
    ExamResultModule,
    ExamQuestionModule,
    ExamQuestionResponseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
