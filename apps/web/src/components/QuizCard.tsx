'use client';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { IconButton } from './ui/IconButton';
import { Quiz } from '@/types/quiz';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { ConfirmationModal } from './ConfirmationModal';
import { useQuizStore } from '@/store/quizStore';

export const QuizCard = (quiz: Quiz) => {
  const { id, title, description, coverUrl } = quiz;

  const router = useRouter();
  const removeQuiz = useQuizStore((state) => state.removeQuiz);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDeleteQuiz = () => {
    removeQuiz(id);
    toast.success('Quiz deleted');
  };

  return (
    <>
      <Card sx={{ maxWidth: '350px', position: 'relative' }}>
        <CardActionArea
          disableRipple
          disableTouchRipple
          onClick={() => router.push(`/quizzes/${id}`)}
        >
          <CardMedia
            component="img"
            height={350}
            alt={title}
            image={coverUrl ?? ''}
          />
          <CardContent>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <IconButton
          onClick={() => {
            setShowConfirmationModal(true);
          }}
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </Card>
      <ConfirmationModal
        open={showConfirmationModal}
        title="Delete Quiz"
        description="Are you sure you want to delete this quiz?"
        onClose={() => setShowConfirmationModal(false)}
        onAction={handleDeleteQuiz}
        cancelText="Cancel"
        actionText="Delete"
      />
    </>
  );
};
