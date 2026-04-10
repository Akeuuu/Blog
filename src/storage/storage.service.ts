import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, CreateBucketCommand, HeadBucketCommand } from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      endpoint: 'http://rustfs:9000', // Utilise le nom du service Docker si dans le même réseau
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'rustfsadmin',
        secretAccessKey: 'rustfsadmin',
      },
      forcePathStyle: true, // OBLIGATOIRE pour RustFS
    });
  }

  async ensureBucketExists(bucket: string) {
    try {
      await this.s3Client.send(new HeadBucketCommand({ Bucket: bucket }));
    } catch (error) {
      const s3Error = error as any;
      if (s3Error.name === 'NotFound' || s3Error.$metadata?.httpStatusCode === 404) {
        await this.s3Client.send(new CreateBucketCommand({ Bucket: bucket }));
      } else {
        throw error;
      }
    }
  }

  async uploadFile(file: Express.Multer.File, bucket: string) {
    await this.ensureBucketExists(bucket);

    const key = `${Date.now()}-${file.originalname}`;
    
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      url: `http://localhost:9000/${bucket}/${key}`,
      key: key,
    };
  }
}