export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface Question {
  id: string;
  name: string;
  type: QuestionType;
  answers: string;
}
