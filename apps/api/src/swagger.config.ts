import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Quiz Builder API')
  .setVersion('1.0')
  .build();
