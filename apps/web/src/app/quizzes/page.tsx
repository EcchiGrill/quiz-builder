import { getQuizzesOptions } from '@/api/quizzes/getQuizzesOptions';
import { getQueryClient } from '@/lib/utils/getQueryClient';
import Typography from '@mui/material/Typography';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const queryClient = getQueryClient();
await queryClient.prefetchQuery(getQuizzesOptions());

const QuizzesPage = () => {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Typography variant="h1">Quizzes</Typography>
    </HydrationBoundary>
  );
};

export default QuizzesPage;
