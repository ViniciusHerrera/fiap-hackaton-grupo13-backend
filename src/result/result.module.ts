import { Module } from '@nestjs/common';
import { Result } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultController } from './controllers/result.controller';
import { ResultService } from './services/result.service';
import { RESULT_REPOSITORY } from './repositories/interfaces/result.repository.interface';
import { ResultRepositoryService } from './repositories/result.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Result])],
  controllers: [ResultController],
  providers: [
    ResultService,
    {
      provide: RESULT_REPOSITORY,
      useClass: ResultRepositoryService,
    },
  ],
})
export class ResultModule {}
