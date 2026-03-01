'use client';

import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { Quiz } from '@/types/quiz';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import { formatQuestionsLabel } from '@/lib/utils/formatQuestionsLabel';

const formatMultipleAnswer = (type: string, answers: string): string => {
  if (type === 'checkbox') {
    return answers
      .split(',')
      .map((answer) => answer.trim())
      .join(', ');
  }
  return answers;
};

export const QuizContent = (quiz: Quiz) => {
  const { title, description, questions, coverUrl } = quiz;

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', py: 3, px: 2 }}>
      {coverUrl && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 420,
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Image
            src={coverUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      )}
      <Stack gap={2}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {description}
          </Typography>
        )}
      </Stack>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        {formatQuestionsLabel(questions)}:
      </Typography>
      <Box
        sx={{
          '& .MuiAccordion-root': {
            boxShadow: 0,
            '&:before': { display: 'none' },
          },
        }}
      >
        {questions.map((question, index) => (
          <Accordion key={question.id} defaultExpanded={false} disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                flexDirection: 'row-reverse',
                '& .MuiAccordionSummary-expandIconWrapper': { mr: 1 },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  flex: 1,
                }}
              >
                <Chip
                  label={index + 1}
                  size="small"
                  color="primary"
                  sx={{ fontWeight: 600, minWidth: 28 }}
                />
                <Typography variant="body1" fontWeight={500}>
                  {question.name}
                </Typography>
                <Chip
                  label={question.type}
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'action.hover', pt: 2 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Answer{question.type === 'checkbox' ? 's' : ''}:
              </Typography>
              <Typography
                variant="body1"
                component="pre"
                sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', m: 0 }}
              >
                {formatMultipleAnswer(question.type, question.answers)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
