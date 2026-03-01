'use client';

import Box from '@mui/material/Box';
import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { LabeledTextfield } from '@/components/ui/LabeledTextField';
import { IconButton } from '@/components/ui/IconButton';
import { OutlinedButton } from '@/components/ui/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import type { QuizSchema } from '@/schema/quizSchema';

interface CheckboxAnswerOptionsProps {
  questionIndex: number;
}

export const CheckboxAnswerOptions = ({
  questionIndex,
}: CheckboxAnswerOptionsProps) => {
  const { control } = useFormContext<QuizSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answerOptions` as 'questions',
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        Correct answers (add one per option)
      </Typography>
      {fields.map((field, optionIndex) => (
        <Box
          key={field.id}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
          }}
        >
          <Controller
            name={`questions.${questionIndex}.answerOptions.${optionIndex}`}
            control={control}
            render={({ field, fieldState }) => (
              <LabeledTextfield
                {...field}
                label=""
                placeholder={`Answer ${optionIndex + 1}`}
                errorMessage={fieldState.error?.message}
                sx={{ flex: 1 }}
              />
            )}
          />
          <IconButton
            size="small"
            onClick={() => remove(optionIndex)}
            disabled={fields.length <= 1}
            aria-label="Remove answer"
            type="button"
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <OutlinedButton
        size="small"
        startIcon={<AddIcon />}
        onClick={() => append('' as never)}
        type="button"
      >
        Add answer
      </OutlinedButton>
    </Box>
  );
};
