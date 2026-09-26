import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hunargo');
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // Keep server running so development API responses still work seamlessly
  }
};
