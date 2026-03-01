import { Module } from '@nestjs/common';
import { QuizModule } from './models/quiz/quiz.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, QuizModule],
})
export class AppModule {}
