'use client';

import Grid from '@mui/material/Grid';
import { QuizCard } from './QuizCard';
import { useQuizStore } from '@/store/quizStore';
import { useEffect } from 'react';

export const QuizzesList = () => {
  const quizzes = useQuizStore((state) => state.quizzes);
  const getQuizzes = useQuizStore((state) => state.getQuizzes);

  useEffect(() => {
    getQuizzes();
  }, [getQuizzes]);

  return (
    <Grid container spacing={5}>
      {quizzes.map((quiz) => (
        <Grid size={{ md: 4, lg: 4, xl: 3, xxl: 2 }} key={quiz.id}>
          <QuizCard {...quiz} />
        </Grid>
      ))}
    </Grid>
  );
};
