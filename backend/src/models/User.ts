import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkImage {
  title: string;
  icon?: string;
  url?: string;
  createdAt?: Date;
}

export interface IUser extends Document {
  phoneNumber: string;
  role: 'worker' | 'customer';
  fullName: string;
  email?: string;
  aadhaar?: string;
  gender: string;
  dob: string;
  referralCode: string;
  profileImage: string;
  isVerified: boolean;
  location: {
    type: string;
    coordinates: number[];
    address: string;
    city: string;
    pincode: string;
    serviceRadius: number;
  };
  professions: string[];
  isAvailable: boolean;
  hourlyRate: number;
  visitingCharge: number;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  profileViews: number;
  callsReceivedCount: number;
  customersServedCount: number;
  walletBalance: number;
  workImages: IWorkImage[];
  createdAt: Date;
  updatedAt: Date;
}

const workImageSchema = new Schema<IWorkImage>({
  title: { type: String, required: true },
  icon: { type: String, default: '⚡' },
  url: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new Schema<IUser>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ['worker', 'customer'], default: 'worker' },
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    aadhaar: { type: String, default: '' },
    gender: { type: String, default: '' },
    dob: { type: String, default: '' },
    referralCode: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    isVerified: { type: Boolean, default: true },

    // GeoJSON Location details
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [76.7179, 30.7046] }, // [longitude, latitude]
      address: { type: String, default: 'Sector 17, Chandigarh' },
      city: { type: String, default: 'Chandigarh' },
      pincode: { type: String, default: '160017' },
      serviceRadius: { type: Number, default: 15 },
    },

    // Worker details
    professions: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    hourlyRate: { type: Number, default: 350 },
    visitingCharge: { type: Number, default: 150 },
    experienceYears: { type: Number, default: 5 },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 38 },
    profileViews: { type: Number, default: 245 },
    callsReceivedCount: { type: Number, default: 38 },
    customersServedCount: { type: Number, default: 21 },
    walletBalance: { type: Number, default: 450 },
    workImages: [workImageSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.index({ location: '2dsphere' });

export default mongoose.model<IUser>('User', userSchema);
