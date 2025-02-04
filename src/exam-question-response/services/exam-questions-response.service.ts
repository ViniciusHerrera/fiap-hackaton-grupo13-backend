import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EXAM_QUESTIONS_RESPONSE_REPOSITORY } from '../repositories/interfaces/exam-question-response.repository.interface';
import { ExamQuestionResponseRepositoryService } from '../repositories/exam-question-response.repository.service';
import {
  CreateExamQuestionResponseDto,
  UpdateExamQuestionResponseDto,
} from '../dtos/exam-question-response.dto';
import { ExamQuestion } from 'src/exam-question/entities/exam-question.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class ExamQuestionResponseService {
  constructor(
    @Inject(EXAM_QUESTIONS_RESPONSE_REPOSITORY)
    private readonly examQuestionResponseRepository: ExamQuestionResponseRepositoryService,
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(ExamQuestion)
    private readonly examQuestionRepository: Repository<ExamQuestion>,
  ) {}

  async create(data: CreateExamQuestionResponseDto) {
    try {
      console.log('Recebendo request para criar resposta de exame:', data);

      // 1. Buscar estudante
      const student = await this.studentRepository.findOne({
        where: { id: data.student_id },
      });

      if (!student) {
        throw new NotFoundException(
          `Estudante ID ${data.student_id} não encontrado`,
        );
      }

      // 2. Buscar matrícula do estudante
      const enrollment = await this.enrollmentRepository.findOne({
        where: { student: { id: student.id } },
        relations: ['student', 'classroom'],
      });

      if (!enrollment) {
        throw new NotFoundException(
          `Matrícula não encontrada para o estudante ID ${student.id}`,
        );
      }

      // 3. Buscar questão do exame
      const examQuestion = await this.examQuestionRepository.findOne({
        where: { id: data.exam_question_id },
      });

      if (!examQuestion) {
        throw new NotFoundException(
          `Questão de exame ID ${data.exam_question_id} não encontrada`,
        );
      }

      console.log('Criando resposta para a questão:', examQuestion);
      console.log('Usando a matrícula:', enrollment);

      // 4. Criar a resposta da questão
      const responseEntity = this.examQuestionResponseRepository.create({
        response: data.response,
        exam_question_id: examQuestion, // Certifica que o relacionamento está correto
        enrollment: enrollment,
      });

      console.log('Resposta de exame criada com sucesso:', responseEntity);
      return responseEntity;
    } catch (error) {
      console.error('Erro ao criar resposta de exame:', error);
      throw error;
    }
  }

  async findAll() {
    return this.examQuestionResponseRepository.findAll();
  }

  async findOne(id: number) {
    const response = await this.examQuestionResponseRepository.findOne(id);
    if (!response) {
      throw new NotFoundException('Resposta da questão não encontrada');
    }
    return response;
  }

  async update(id: number, data: UpdateExamQuestionResponseDto) {
    const response = await this.examQuestionResponseRepository.update(id, data);
    if (!response) {
      throw new NotFoundException('Resposta da questão não encontrada');
    }
    return response;
  }

  async delete(id: number) {
    await this.findOne(id);
    await this.examQuestionResponseRepository.delete(id);
  }
}
