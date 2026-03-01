'use client';

import { getQuizzesOptions } from '@/api/quizzes/getQuizzesOptions';
import Grid from '@mui/material/Grid';
import { useSuspenseQuery } from '@tanstack/react-query';

export const QuizzesList = () => {
  const { data } = useSuspenseQuery(getQuizzesOptions());
  return (
    <Grid>
      {data.map((quiz) => (
        <Grid key={quiz.id}></Grid>
      ))}
    </Grid>
  );
};
