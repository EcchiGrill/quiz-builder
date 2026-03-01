import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  getQuiz(): string {
    return 'Quiz Service';
  }
}
