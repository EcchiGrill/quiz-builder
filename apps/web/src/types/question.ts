export interface Question {
  id: string;
  name: string;
  type: 'boolean' | 'input' | 'checkbox';
  answers: string;
}
