import { QuizService } from '@/api/quizService';
import { Quiz } from '@/types/quiz';
import { create } from 'zustand';

const quizService = new QuizService();

interface QuizState {
  isLoading: boolean;
  quizzes: Quiz[];
  setQuizzes: (quizzes: Quiz[]) => void;
  getQuizzes: () => Promise<void>;
  createQuiz: (quiz: Quiz) => Promise<void>;
  getQuiz: (id: string) => Promise<void>;
  removeQuiz: (id: string) => Promise<void>;
  uploadCover: (id: string, file: File) => Promise<void>;
}

const initialState = {
  isLoading: false,
  quizzes: [],
};

export const useQuizStore = create<QuizState>()((set, get) => ({
  ...initialState,

  setQuizzes: (quizzes) => set({ quizzes }),

  getQuizzes: async () => {
    set({ isLoading: true });

    try {
      const quizzes = await quizService.getQuizzes();
      set({ quizzes });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  createQuiz: async (quiz: Quiz) => {
    const { quizzes } = get();
    set({ isLoading: true });

    try {
      const newQuiz = await quizService.createQuiz(quiz);
      set({ quizzes: [...quizzes, newQuiz] });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  getQuiz: async (id: string) => {
    const { quizzes } = get();
    set({ isLoading: true });

    try {
      const quiz = await quizService.getQuiz(id);
      set({ quizzes: [...quizzes, quiz] });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  removeQuiz: async (id: string) => {
    const { quizzes } = get();
    set({ isLoading: true });

    try {
      await quizService.removeQuiz(id);
      const filteredQuizzes = quizzes.filter((quiz) => quiz.id !== id);
      set({ quizzes: filteredQuizzes });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  uploadCover: async (id: string, file: File) => {
    const { quizzes } = get();
    set({ isLoading: true });

    try {
      const updatedQuiz = await quizService.uploadCover(id, file);
      const updatedQuizzes = quizzes.map((quiz) =>
        quiz.id === id ? updatedQuiz : quiz
      );
      set({ quizzes: updatedQuizzes });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
