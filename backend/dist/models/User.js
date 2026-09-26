"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const workImageSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    icon: { type: String, default: '⚡' },
    url: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});
const userSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
userSchema.index({ location: '2dsphere' });
exports.default = mongoose_1.default.model('User', userSchema);
