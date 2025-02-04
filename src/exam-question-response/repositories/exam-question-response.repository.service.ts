import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IExamQuestionResponseRepository } from './interfaces/exam-question-response.repository.interface';
import { ExamQuestionResponse } from '../entities/exam-question-response.entity';

@Injectable()
export class ExamQuestionResponseRepositoryService
  implements IExamQuestionResponseRepository
{
  constructor(
    @InjectRepository(ExamQuestionResponse)
    private readonly examQuestionResponseRepository: Repository<ExamQuestionResponse>,
  ) {}

  async create(
    data: Partial<ExamQuestionResponse>,
  ): Promise<ExamQuestionResponse> {
    const response = this.examQuestionResponseRepository.create(data);
    return this.examQuestionResponseRepository.save(response);
  }

  async findAll(): Promise<ExamQuestionResponse[]> {
    return this.examQuestionResponseRepository.find({
      relations: ['exam_question_id', 'enrollment'],
    });
  }

  async findOne(id: number): Promise<ExamQuestionResponse | null> {
    return this.examQuestionResponseRepository.findOne({
      where: { id },
      relations: ['exam_question_id', 'enrollment'],
    });
  }

  async update(
    id: number,
    data: Partial<ExamQuestionResponse>,
  ): Promise<ExamQuestionResponse | null> {
    await this.examQuestionResponseRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.examQuestionResponseRepository.delete(id);
  }
}
