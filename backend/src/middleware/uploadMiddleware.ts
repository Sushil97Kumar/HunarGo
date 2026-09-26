import multer from 'multer';

// Memory storage keeps file buffer in memory for AWS S3 upload
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file limit
  },
});
