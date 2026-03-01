import { queryOptions } from '@tanstack/react-query';
import { Quiz } from '@/types/quiz';
import { api } from '@/api/axiosInstance';

export const getQuizzesOptions = () =>
  queryOptions({
    queryKey: ['quizzes'],
    queryFn: async () => {
      const { data } = await api.get<Quiz[]>('/quizzes');
      return data;
    },
  });
