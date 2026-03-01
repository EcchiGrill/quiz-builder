import { z } from 'zod';

export const questionSchema = z
  .object({
    name: z.string().min(3, 'At least 3 characters'),
    type: z.enum(['boolean', 'input', 'checkbox']),
    answers: z.string().optional(),
    answerOptions: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.type === 'checkbox') {
        const options = data.answerOptions ?? [];
        return (
          options.length >= 1 &&
          options.every((option) => option.trim().length >= 1)
        );
      }
      return (data.answers?.trim().length ?? 0) >= 1;
    },
    {
      message: 'Add at least one answer',
      path: ['answers'],
    }
  );

export type QuestionSchema = z.infer<typeof questionSchema>;
