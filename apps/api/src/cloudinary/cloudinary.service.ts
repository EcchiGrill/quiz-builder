import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

@Injectable()
export class CloudinaryService {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.config.getOrThrow<string>('CLOUDINARY_API_KEY'),
      api_secret: this.config.getOrThrow<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFromBuffer(
    buffer: Buffer,
    mimetype: string,
    folder = 'quiz-covers'
  ): Promise<CloudinaryUploadResult> {
    const base64 = `data:${mimetype};base64,${buffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(base64, {
      folder,
      resource_type: 'image',
    });
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  }
}
