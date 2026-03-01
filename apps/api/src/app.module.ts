import { Module } from '@nestjs/common';
import { QuizModule } from './models/quiz/quiz.module';

@Module({
  imports: [QuizModule],
})
export class AppModule {}
