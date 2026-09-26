import mongoose, { Schema, Document } from 'mongoose';

export interface IOtp extends Document {
  phoneNumber: string;
  otp: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    phoneNumber: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOtp>('Otp', otpSchema);
