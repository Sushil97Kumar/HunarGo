import mongoose, { Schema, Document } from 'mongoose';

export interface ICall extends Document {
  customerName: string;
  customerPhone?: string;
  workerPhone?: string;
  workerId?: mongoose.Types.ObjectId;
  customerId?: mongoose.Types.ObjectId;
  service: string;
  distance: string;
  status: 'Initiated' | 'Connected' | 'Called' | 'Missed' | 'Completed';
  time: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const callSchema = new Schema<ICall>(
  {
    customerName: { type: String, required: true },
    customerPhone: { type: String, default: '' },
    workerPhone: { type: String, default: '' },
    workerId: { type: Schema.Types.ObjectId, ref: 'User' },
    customerId: { type: Schema.Types.ObjectId, ref: 'User' },
    service: { type: String, default: 'General Repair' },
    distance: { type: String, default: '1.2 km away' },
    status: {
      type: String,
      enum: ['Initiated', 'Connected', 'Called', 'Missed', 'Completed'],
      default: 'Called',
    },
    time: { type: String, default: 'Just now' },
    location: { type: String, default: 'Sector 62, Noida' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICall>('Call', callSchema);
