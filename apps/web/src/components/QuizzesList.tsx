'use client';

import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { QuizCard } from './QuizCard';
import { useQuizStore } from '@/store/quizStore';
import { useEffect } from 'react';
import { ContainedButton } from './ui/Button';
import Link from 'next/link';
import Stack from '@mui/material/Stack';

export const QuizzesList = () => {
  const quizzes = useQuizStore((state) => state.quizzes);
  const getQuizzes = useQuizStore((state) => state.getQuizzes);

  useEffect(() => {
    getQuizzes();
  }, [getQuizzes]);

  return (
    <Stack gap={3}>
      <ContainedButton
        sx={{ alignSelf: 'flex-start' }}
        component={Link}
        startIcon={<AddIcon />}
        href="/quizzes/create"
      >
        Create quiz
      </ContainedButton>
      <Grid container spacing={5}>
        {quizzes.map((quiz) => (
          <Grid size={{ md: 4, lg: 4, xl: 3, xxl: 2 }} key={quiz.id}>
            <QuizCard {...quiz} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
