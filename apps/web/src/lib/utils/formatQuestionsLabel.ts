import { Question } from '@/types/question';

export const formatQuestionsLabel = (questions: Question[]) => {
  return `${questions.length} question${questions.length !== 1 ? 's' : ''}`;
};
