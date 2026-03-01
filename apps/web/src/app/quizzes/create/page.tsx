import { Header } from '@/components/Header';
import { QuizForm } from '@/components/QuizForm';
import Box from '@mui/material/Box';
import { headerHeight } from '@/constants/headerHeight';

const CreateQuizPage = () => {
  return (
    <>
      <Header currentPage="Create quiz" />
      <Box
        sx={{
          minHeight: `calc(100vh - ${headerHeight})`,
          padding: '20px 30px',
          display: 'flex',
          pt: 10,
          justifyContent: 'center',
        }}
      >
        <QuizForm />
      </Box>
    </>
  );
};

export default CreateQuizPage;
