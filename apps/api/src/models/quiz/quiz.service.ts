import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuiz(createQuizDto: CreateQuizDto) {
    const { title, description, coverUrl, questions } = createQuizDto;

    return this.prisma.quiz.create({
      data: {
        title,
        description,
        coverUrl,
        questions: { create: questions },
      },
      include: { questions: true },
    });
  }

  async findAllQuizzes() {
    return this.prisma.quiz.findMany({
      include: { questions: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!quiz) {
      throw new NotFoundException(`Quiz with id "${id}" not found`);
    }
    return quiz;
  }

  async removeQuiz(id: string) {
    await this.findOne(id);
    return this.prisma.quiz.delete({
      where: { id },
      include: { questions: true },
    });
  }

  async uploadCover(id: string, coverUrl: string) {
    await this.findOne(id);
    return this.prisma.quiz.update({
      where: { id },
      data: { coverUrl },
      include: { questions: true },
    });
  }
}
