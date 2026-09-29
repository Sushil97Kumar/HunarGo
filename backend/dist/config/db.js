"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDbNames = {
    local: 'hunargo-local',
    development: 'hunargo-dev',
    dev: 'hunargo-dev',
    production: 'hunargo-prod',
    prod: 'hunargo-prod',
};
const env = process.env.NODE_ENV || 'local';
const MONGODB_DB_NAME = mongoDbNames[env] || mongoDbNames.local;
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/';
        const conn = await mongoose_1.default.connect(mongoUri, {
            dbName: MONGODB_DB_NAME,
        });
        console.log(`[MongoDB Connected]: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`[MongoDB Connection Error]: ${error.message}`);
        // Keep server running so development API responses still work seamlessly
    }
};
exports.connectDB = connectDB;
