import { QuizService } from '@/api/quizService';
import { Header } from '@/components/Header';
import { QuizContent } from '@/components/QuizContent';
import Box from '@mui/material/Box';
import { headerHeight } from '@/constants/headerHeight';
import { notFound } from 'next/navigation';

interface QuizPageProps {
  params: Promise<{ id: string }>;
}

const quizService = new QuizService();

export const QuizPage = async ({ params }: QuizPageProps) => {
  const { id } = await params;

  let quiz;

  try {
    quiz = await quizService.getQuiz(id);
  } catch {
    notFound();
  }

  return (
    <>
      <Header currentPage={quiz.title} />
      <Box sx={{ minHeight: `calc(100vh - ${headerHeight})` }}>
        <QuizContent {...quiz} />
      </Box>
    </>
  );
};

export default QuizPage;
