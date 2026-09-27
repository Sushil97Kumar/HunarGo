import mongoose, { Schema, Document } from 'mongoose';

export interface IHelpSupport extends Document {
  customerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

const helpSupportSchema = new Schema<IHelpSupport>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved'],
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

export const HelpSupport = mongoose.model<IHelpSupport>('HelpSupport', helpSupportSchema);
