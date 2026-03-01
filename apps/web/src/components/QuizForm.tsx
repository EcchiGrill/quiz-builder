'use client';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useForm,
  useFieldArray,
  Controller,
  FormProvider,
  type SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuizService } from '@/api/quizService';
import { useQuizStore } from '@/store/quizStore';
import toast from 'react-hot-toast';
import type { QuestionType } from '@/types/question';
import type { QuestionSchema } from '@/schema/questionSchema';
import { quizSchema, QuizSchema } from '@/schema/quizSchema';
import { LabeledTextfield } from '@/components/ui/LabeledTextField';
import { IconButton } from '@/components/ui/IconButton';
import { ContainedButton, OutlinedButton } from '@/components/ui/Button';
import { CheckboxAnswerOptions } from '@/components/CheckboxAnswerOptions';

const quizService = new QuizService();

const defaultQuestion: QuestionSchema & { answerOptions?: string[] } = {
  name: '',
  type: 'input',
  answers: '',
  answerOptions: [''],
};

const formatAnswers = (question: QuestionSchema) => {
  if (question.type === 'checkbox') {
    return (question.answerOptions ?? []).join(', ');
  }
  return (question.answers ?? '').trim();
};

export const QuizForm = () => {
  const router = useRouter();
  const getQuizzes = useQuizStore((s) => s.getQuizzes);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverError, setCoverError] = useState('');

  const methods = useForm<QuizSchema>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      description: '',
      questions: [{ ...defaultQuestion }],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit: SubmitHandler<QuizSchema> = async (data) => {
    setCoverError('');
    if (!coverFile) {
      setCoverError('Cover image is required');
      toast.error('Please choose a cover image');
      return;
    }
    try {
      const quizBody = {
        title: data.title.trim(),
        description: data.description.trim(),
        questions: data.questions.map((question) => ({
          name: question.name.trim(),
          type: question.type,
          answers: formatAnswers(question),
        })),
      };
      const quiz = await quizService.createQuiz(quizBody);
      await quizService.uploadCover(quiz.id, coverFile);
      toast.success('Quiz created');
      await getQuizzes();
      router.push(`/quizzes/${quiz.id}`);
    } catch {
      toast.error('Failed to create quiz');
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: 500, display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <LabeledTextfield
              {...field}
              label="Title"
              required
              id="quiz-title"
              placeholder="My Quiz"
              errorMessage={errors.title?.message}
              reserveErrorSpace
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <LabeledTextfield
              {...field}
              label="Description"
              required
              id="quiz-description"
              placeholder="A short description of the quiz."
              errorMessage={errors.description?.message}
              reserveErrorSpace
              multiline
              minRows={3}
            />
          )}
        />
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Cover image{' '}
            <Typography component="span" color="error">
              *
            </Typography>
          </Typography>
          <OutlinedButton component="label" size="small">
            {coverFile ? coverFile.name : 'Choose image'}
            <input
              type="file"
              hidden
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={(e) => {
                setCoverFile(e.target.files?.[0] ?? null);
                setCoverError('');
              }}
            />
          </OutlinedButton>
          {coverError && (
            <Typography
              variant="caption"
              color="error"
              sx={{ display: 'block', mt: 0.5 }}
            >
              {coverError}
            </Typography>
          )}
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Questions
            </Typography>
            <OutlinedButton
              startIcon={<AddIcon />}
              onClick={() =>
                append({
                  ...defaultQuestion,
                } as QuizSchema['questions'][number])
              }
              size="small"
              type="button"
            >
              Add question
            </OutlinedButton>
          </Box>
          {errors.questions?.message && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mb: 1, display: 'block' }}
            >
              {errors.questions.message}
            </Typography>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {fields.map((field, index) => (
              <Box
                key={field.id}
                sx={{
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    Question {index + 1}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => remove(index)}
                    disabled={fields.length <= 1}
                    aria-label="Remove question"
                    type="button"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
                <Controller
                  name={`questions.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <LabeledTextfield
                      {...field}
                      label="Question text"
                      id={`q-${index}-name`}
                      placeholder="e.g. What is the capital of France?"
                      errorMessage={errors.questions?.[index]?.name?.message}
                    />
                  )}
                />
                <Controller
                  name={`questions.${index}.type`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <FormControl
                        size="small"
                        fullWidth
                        error={!!errors.questions?.[index]?.type}
                      >
                        <InputLabel>Type</InputLabel>
                        <Select
                          {...field}
                          label="Type"
                          onChange={(e) => {
                            const value = e.target.value as QuestionType;
                            field.onChange(value);
                            if (value === 'checkbox') {
                              setValue(`questions.${index}.answerOptions`, [
                                '',
                              ]);
                            }
                          }}
                        >
                          <MenuItem value="boolean">Boolean</MenuItem>
                          <MenuItem value="input">Input</MenuItem>
                          <MenuItem value="checkbox">
                            Checkbox (multiple answers)
                          </MenuItem>
                        </Select>
                      </FormControl>
                      {field.value === 'checkbox' ? (
                        <CheckboxAnswerOptions questionIndex={index} />
                      ) : (
                        <Controller
                          name={`questions.${index}.answers`}
                          control={control}
                          render={({ field: ansField }) => (
                            <LabeledTextfield
                              {...ansField}
                              label="Correct answer"
                              id={`q-${index}-answers`}
                              placeholder="Answer"
                              errorMessage={
                                errors.questions?.[index]?.answers?.message
                              }
                            />
                          )}
                        />
                      )}
                    </>
                  )}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, pt: 1 }}
        >
          <OutlinedButton
            type="button"
            onClick={() => router.push('/quizzes')}
            disabled={isSubmitting}
          >
            Cancel
          </OutlinedButton>
          <ContainedButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating…' : 'Create quiz'}
          </ContainedButton>
        </Box>
      </Box>
    </FormProvider>
  );
};
