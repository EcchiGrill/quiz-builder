import { Quiz } from '@/types/quiz';
import { api } from './axiosInstance';
import { Question } from '@/types/question';

interface CreateQuizBody {
  title: string;
  description: string;
  questions: Question[];
}

export class QuizService {
  private static instance: QuizService;

  constructor() {
    if (QuizService.instance) {
      return QuizService.instance;
    }
    QuizService.instance = this;
  }

  async getQuizzes(): Promise<Quiz[]> {
    const { data } = await api.get<Quiz[]>('/quizzes');
    return data;
  }

  async createQuiz(body: CreateQuizBody): Promise<Quiz> {
    const { data } = await api.post<Quiz>('/quizzes', body);
    return data;
  }

  async getQuiz(id: string): Promise<Quiz> {
    const { data } = await api.get<Quiz>(`/quizzes/${id}`);
    return data;
  }

  async removeQuiz(id: string): Promise<void> {
    await api.delete(`/quizzes/${id}`);
  }

  async uploadCover(id: string, file: File): Promise<Quiz> {
    const formData = new FormData();
    formData.append('cover', file);
    const { data } = await api.post<Quiz>(
      `/quizzes/${id}/upload-cover`,
      formData
    );
    return data;
  }
}
