import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IExamQuestionResponseRepository } from './interfaces/exam-question-response.repository.interface';
import { ExamQuestionResponse } from '../entities/exam-question-response.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { ExamQuestion } from 'src/exam-question/entities/exam-question.entity';
import { Exams } from 'src/exams/entities/exams.entity';

@Injectable()
export class ExamQuestionResponseRepositoryService
  implements IExamQuestionResponseRepository
{
  constructor(
    @InjectRepository(ExamQuestionResponse)
    private readonly examQuestionResponseRepository: Repository<ExamQuestionResponse>,

    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,

    @InjectRepository(ExamQuestion)
    private readonly questionRepo: Repository<ExamQuestion>,

    @InjectRepository(Exams)
    private readonly examRepo: Repository<Exams>,
  ) {}

  async findResponsesByExamAndStudent(examId: number, studentId: number) {
    try {
      const enrollment = await this.enrollmentRepo.findOne({
        where: { student: { id: studentId } },
        relations: ['student'],
      });

      if (!enrollment) {
        throw new NotFoundException(
          `Matrícula não encontrada para o estudante ID ${studentId}`,
        );
      }

      const exam = await this.examRepo.findOne({
        where: { id: examId },
        relations: ['exam_questions'],
      });

      if (!exam) {
        throw new NotFoundException(`Exame ID ${examId} não encontrado`);
      }

      const examQuestions = exam.exam_questions;

      const responses = await this.examQuestionResponseRepository.find({
        where: { enrollment: { id: enrollment.id } },
        relations: ['exam_question_id', 'exam_question_id.exam'],
      });

      const filteredResponses = responses.filter(
        (response) =>
          response.exam_question_id &&
          response.exam_question_id.exam &&
          response.exam_question_id.exam.id === examId,
      );

      const formattedResponses = examQuestions.map((question) => {
        const response = filteredResponses.find(
          (res) => res.exam_question_id.id === question.id,
        );
        return {
          question_id: question.id,
          question_text: question.text,
          response: response ? response.response : null,
        };
      });

      return formattedResponses;
    } catch (error) {
      throw new Error(`Erro ao buscar respostas: ${error}`);
    }
  }

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
