import { Header } from '@/components/Header';
import { Loader } from '@/components/ui/Loader';
import Box from '@mui/material/Box';
import { headerHeight } from '@/constants/headerHeight';

const QuizLoading = () => {
  return (
    <>
      <Header currentPage="Quiz" />
      <Box
        sx={{
          minHeight: `calc(100vh - ${headerHeight})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader size={100} />
      </Box>
    </>
  );
};

export default QuizLoading;
