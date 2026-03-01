import { Header } from '@/components/Header';
import { QuizzesList } from '@/components/QuizzesList';
import Box from '@mui/material/Box';
import { headerHeight } from '@/constants/headerHeight';
import { Loader } from '@/components/ui/Loader';
import { Suspense } from 'react';

const QuizzesPage = () => {
  return (
    <>
      <Header currentPage="quizzes" />
      <Box
        sx={{ padding: '20px 30px', height: `calc(100vh - ${headerHeight})` }}
      >
        <Suspense
          fallback={
            <Loader
              size={100}
              sx={{
                margin: 'auto',
                display: 'block',
                mt: 30,
              }}
            />
          }
        >
          <QuizzesList />
        </Suspense>
      </Box>
    </>
  );
};

export default QuizzesPage;
