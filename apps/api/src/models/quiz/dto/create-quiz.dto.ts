import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  ValidateNested,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from './create-question.dto';

export class CreateQuizDto {
  @ApiProperty({ example: 'My Quiz' })
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'A short description of the quiz.' })
  @IsString()
  @MinLength(5, { message: 'Description must be at least 5 characters long' })
  description: string;

  @ApiPropertyOptional({
    example: 'https://example.com/cover.jpg',
    description: 'URL of the cover image',
  })
  @IsUrl()
  @IsOptional()
  coverUrl?: string;

  @ApiProperty({
    type: [CreateQuestionDto],
    description: 'List of questions to create with the quiz',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
