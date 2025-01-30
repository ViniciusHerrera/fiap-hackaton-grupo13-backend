import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'src/shared/env/dotenv';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { ResultModule } from './result/result.module';
import { QuestionsModule } from './questions/questions.module';
import { ExamsModule } from './exams/exams.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ClassroomModule } from './classroom/classroom.module';

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
    ResultModule,
    ExamsModule,
    EnrollmentModule,
    ClassroomModule,
    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
