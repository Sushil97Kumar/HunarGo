# HunarGo TypeScript Backend API 🚀

Complete TypeScript Node.js, Express.js, and MongoDB backend for HunarGo Mobile Application.

---

## 🛠️ Tech Stack
- **TypeScript**: Typed JavaScript development
- **Node.js**: Server runtime environment
- **Express.js**: Web server framework
- **MongoDB & Mongoose**: Database & ODM
- **JSONWebToken (JWT)**: Authentication
- **ts-node-dev**: Live reloader for TypeScript development

---

## 🚀 Getting Started

### 1. Installation
```bash
cd backend
npm install
```

### 2. Environment Setup
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hunargo
JWT_SECRET=hunargo_super_secret_jwt_key_2026
NODE_ENV=development
```

### 3. Running the Server
- **Development Mode (with TypeScript hot reload)**:
  ```bash
  npm run dev
  ```
- **Build TypeScript to JavaScript (`/dist`)**:
  ```bash
  npm run build
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

---

## 📡 Endpoints Summary

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/send-otp` -> Send 4-digit OTP to mobile number
- `POST /api/auth/verify-otp` -> Verify OTP code & obtain JWT Token

### 🛠️ Worker Endpoints (`/api/worker`)
- `GET /api/worker/profile` -> Fetch worker profile details
- `POST /api/worker/profile` -> Save complete profile (Name, Gender, DOB, etc.)
- `POST /api/worker/location` -> Save address, city, pincode, service radius
- `POST /api/worker/professions` -> Save selected worker skills/professions
- `POST /api/worker/availability` -> Toggle worker Online/Offline status
- `GET /api/worker/dashboard-stats` -> Fetch worker dashboard counters & stats
- `GET /api/worker/customer-calls` -> Fetch customer inquiries/calls list

### 👤 Customer Endpoints (`/api/customer`)
- `GET /api/customer/search-workers` -> Search nearby available workers by category
- `GET /api/customer/calls` -> Fetch customer call history
- `POST /api/customer/call-worker` -> Place direct call to worker

---

## 📱 Mobile App Connection
- **Android Emulator**: `http://10.0.2.2:5000/api`
- **Real Device / Localhost**: `http://<YOUR_LOCAL_IP>:5000/api`
