"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const errorHandler_1 = require("./middleware/errorHandler");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const workerRoutes_1 = __importDefault(require("./routes/workerRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
// Load environment variables
dotenv_1.default.config();
// Connect to MongoDB
(0, db_1.connectDB)();
const app = (0, express_1.default)();
// Enable CORS for mobile app requests
app.use((0, cors_1.default)());
// Body parsing middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Root health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: '🚀 HunarGo TypeScript Backend API is running smoothly',
        timestamp: new Date().toISOString(),
    });
});
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        database: 'MongoDB',
        service: 'HunarGo TypeScript Backend',
    });
});
// Register API routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/worker', workerRoutes_1.default);
app.use('/api/customer', customerRoutes_1.default);
// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Cannot ${req.method} ${req.originalUrl} - Route not found`,
    });
});
// Global Error Middleware
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n=================================================`);
    console.log(`🚀 HunarGo TypeScript Server running on port ${PORT}`);
    console.log(`🌐 Base URL: http://localhost:${PORT}/api`);
    console.log(`📱 Android Emulator URL: http://10.0.2.2:${PORT}/api`);
    console.log(`=================================================\n`);
});
