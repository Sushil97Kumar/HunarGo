import mongoose, { Schema, Document } from 'mongoose';

export interface ICall extends Document {

  workerId?: mongoose.Types.ObjectId;
  customerId?: mongoose.Types.ObjectId;

  status: 'Initiated' | 'Connected' | 'Called' | 'Missed' | 'Completed' | 'Pending' | 'Accepted' | 'Cancelled';
  time: string;
  createdAt: Date;
  updatedAt: Date;
}

const callSchema = new Schema<ICall>(
  {

    workerId: { type: Schema.Types.ObjectId, ref: 'User' },
    customerId: { type: Schema.Types.ObjectId, ref: 'User' },

    status: {
      type: String,
      enum: ['Initiated', 'Connected', 'Called', 'Missed', 'Completed', 'Pending', 'Accepted', 'Cancelled'],
      default: 'Pending',
    },
    time: { type: String, default: 'Just now' },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICall>('Call', callSchema);

