import { Question } from './question';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  coverUrl: string | null;
  questions: Question[];
}
