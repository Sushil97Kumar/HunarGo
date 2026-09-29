import mongoose from 'mongoose';
const mongoDbNames: Record<string, string> = {
  local: 'hunargo-local',
  development: 'hunargo-dev',
  dev: 'hunargo-dev',
  production: 'hunargo-prod',
  prod: 'hunargo-prod',
};

const env = process.env.NODE_ENV || 'local';

const MONGODB_DB_NAME = mongoDbNames[env] || mongoDbNames.local;
 
 
export const connectDB = async (): Promise<void> => {
  try {
   const mongoUri =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/';

const conn = await mongoose.connect(mongoUri, {
  dbName: MONGODB_DB_NAME,
});
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // Keep server running so development API responses still work seamlessly
  }
};
