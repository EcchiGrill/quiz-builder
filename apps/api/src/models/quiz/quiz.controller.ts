import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { FileFilterCallback } from 'multer';
import type { Express } from 'express';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

const mimeRegex = /^image\/(jpeg|png|gif|webp)$/;
const maxFileSize = 5 * 1024 * 1024; // 5MB

const imageFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const allowedFormat = mimeRegex.test(file.mimetype);
  if (allowedFormat) {
    callback(null, true);
  } else {
    callback(
      new BadRequestException(
        'Only image files (jpg, png, gif, webp) are allowed'
      ) as Error
    );
  }
};

const upload = memoryStorage();

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all quizzes' })
  findAllQuizzes() {
    return this.quizService.findAllQuizzes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  findOneQuiz(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizService.findOne(id);
  }

  @Post(':id/upload-cover')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: upload,
      limits: { fileSize: maxFileSize },
      fileFilter: imageFilter,
    })
  )
  @ApiOperation({ summary: 'Upload cover image for a quiz by ID' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cover: {
          type: 'string',
          format: 'binary',
          description: 'Image file (jpg, png, gif, webp, max 5MB)',
        },
      },
      required: ['cover'],
    },
  })
  async uploadCover(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException(
        'No file uploaded. Use field name "cover".'
      );
    }
    const { secure_url } = await this.cloudinaryService.uploadFromBuffer(
      file.buffer,
      file.mimetype
    );
    return this.quizService.uploadCover(id, secure_url);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', format: 'uuid' })
  removeQuiz(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizService.removeQuiz(id);
  }
}
