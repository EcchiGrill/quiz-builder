import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  @ApiProperty({ example: 'My Question' })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(200)
  name: string;

  @ApiProperty({ enum: QuestionType, example: 'boolean' })
  @IsEnum(QuestionType, {
    message: 'Type must be one of: boolean, input, checkbox',
  })
  type: QuestionType;

  @ApiProperty({
    example: 'true | answer | answer1,answer2',
    description:
      'The correct answer for the question (boolean, input, checkbox)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Answer is required' })
  @MinLength(1)
  answers: string;
}
