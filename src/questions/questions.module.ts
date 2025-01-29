import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './entities/questions.entity';
import { QuestionsController } from './controllers/questions.controller';
import { QuestionsService } from './services/questions.service';
import { QUESTIONS_REPOSITORY } from './repositories/interfaces/questions.repository.interface';
import { QuestionsRepositoryService } from './repositories/questions.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Questions])],
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    {
      provide: QUESTIONS_REPOSITORY,
      useClass: QuestionsRepositoryService,
    },
  ],
})
export class QuestionsModule {}
