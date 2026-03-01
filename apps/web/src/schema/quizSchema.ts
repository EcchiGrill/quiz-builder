import { z } from 'zod';
import { questionSchema } from './questionSchema';

export const quizSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  questions: z.array(questionSchema).min(1, 'Add at least one question'),
});

export type QuizSchema = z.infer<typeof quizSchema>;
