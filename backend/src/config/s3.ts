import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const region = process.env.AWS_REGION || 'ap-south-1';
const accessKeyId = (process.env.AWS_ACCESS_KEY_ID || '').trim();
const secretAccessKey = (process.env.AWS_SECRET_ACCESS_KEY || '').trim();

export const s3 = new S3Client({
  region,
  ...(accessKeyId && secretAccessKey
    ? {
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      }
    : {}),
});
