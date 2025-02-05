import { Injectable, NotFoundException } from '@nestjs/common';
import { Exams } from '../entities/exams.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IExamsRepository } from './interfaces/exams.repository.interface';
import { CreateExamDtoType, CreateExamsDTO } from '../dtos/create-exams.dto';
import { ClassroomService } from 'src/classroom/services/classroom.service';
import { ExamQuestion } from 'src/exam-question/entities/exam-question.entity';
import { Classroom } from 'src/classroom/entities/classroom.entity';

@Injectable()
export class ExamsRepositoryService implements IExamsRepository {
  constructor(
    @InjectRepository(Exams)
    private readonly examsRepository: Repository<Exams>,
    private readonly classroomService: ClassroomService,

    @InjectRepository(ExamQuestion)
    private readonly examQuestionRepository: Repository<ExamQuestion>,

    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {}

  async getExamById(id: number): Promise<Exams | null> {
    return this.examsRepository.findOne({ where: { id } });
  }

  async createExams(exams: CreateExamsDTO): Promise<Exams> {
    const classroom = await this.classroomService.getClassroomById({
      id: exams.classroom_id,
      teacherId: exams.teacher_id,
    });

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    const newExam = this.examsRepository.create({
      ...exams,
      classroom: classroom,
    });

    return this.examsRepository.save(newExam);
  }

  async getExamsByClassroomId(
    classroom_id: number,
    page: number,
    limit: number,
  ): Promise<{
    items: Exams[];
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const [items, total] = await this.examsRepository.findAndCount({
      where: { classroom: { id: classroom_id } },
      relations: ['classroom'],
      take: limit,
      skip: (page - 1) * limit,
    });
    console.log('items', items);

    return {
      items,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
    };
  }

  async createWithQuestions(createExamDto: CreateExamDtoType): Promise<Exams> {
    const { date, classroom_id, answerable } = createExamDto;

    // Verifica se a sala de aula existe
    const classroom = await this.classroomRepository.findOne({
      where: { id: classroom_id },
    });

    if (!classroom) {
      throw new Error('Classroom not found');
    }

    // Criar exame
    const exam = this.examsRepository.create({
      date,
      answerable,
      classroom,
    });

    const savedExam = await this.examsRepository.save(exam);

    // Lista de perguntas padrão
    const defaultQuestions = [
      'Escreve e reconhece o nome?',
      'Reconhece letras do alfabeto?',
      'Reconhece números até 10?',
      'Reconhece as cores primárias?',
      'Reconhece as formas geométricas?',
      'Desenha esquema corporal?',
    ];

    // Criar perguntas sem IDs manualmente
    const examQuestions = defaultQuestions.map((text) => ({
      text,
      type: 'objective',
      exam: savedExam,
    }));

    // Inserir perguntas diretamente para evitar conflitos de ID
    await this.examQuestionRepository.insert(examQuestions);

    return this.examsRepository.findOne({
      where: { id: savedExam.id },
      relations: ['exam_questions'],
    });
  }
}
