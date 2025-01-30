import { Inject, Injectable } from '@nestjs/common';
import { RESULT_REPOSITORY } from '../repositories/interfaces/result.repository.interface';
import { ResultRepositoryService } from '../repositories/result.repository.service';

@Injectable()
export class ResultService {
  constructor(
    @Inject(RESULT_REPOSITORY)
    private readonly resultRepository: ResultRepositoryService,
  ) {}
}
