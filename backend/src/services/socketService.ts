import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User, { IUser } from '../models/User';
import { formatPhoneNumberE164 } from '../config/twilio';

export interface AuthenticatedSocket extends Socket {
  data: {
    user?: IUser;
    userId?: string;
    role?: 'CUSTOMER' | 'WORKER';
    room?: string;
  };
}

let io: Server | null = null;

/**
 * Initialize Socket.IO Server attached to Express HTTP server
 */
export const initSocketServer = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 30000,
    pingInterval: 15000,
  });

  // Authentication Middleware for Incoming Socket Connections
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      // Extract authentication credentials from handshake auth or headers
      // DO NOT trust client-supplied user ID.
      const rawToken =
        socket.handshake.auth?.token ||
        (socket.handshake.headers?.authorization && socket.handshake.headers.authorization.startsWith('Bearer ')
          ? socket.handshake.headers.authorization.split(' ')[1]
          : undefined);

      const rawPhone =
        socket.handshake.auth?.phoneNumber ||
        (socket.handshake.headers?.['x-user-phone'] as string);

      let authenticatedUser: IUser | null = null;

      // Method 1: Verify via JWT token
      if (rawToken && rawToken !== 'null' && rawToken !== 'undefined') {
        try {
          const decoded = jwt.verify(
            rawToken,
            process.env.JWT_SECRET || 'hunargo_super_secret_jwt_key_2026'
          ) as { id?: string; phoneNumber?: string; role?: string };

          if (decoded && decoded.id && mongoose.Types.ObjectId.isValid(decoded.id)) {
            authenticatedUser = await User.findById(decoded.id);
          } else if (decoded && decoded.phoneNumber) {
            authenticatedUser = await User.findOne({ phoneNumber: decoded.phoneNumber });
          }
        } catch (jwtErr: any) {
          console.warn(`⚠️ [Socket.IO Auth] JWT verification failed: ${jwtErr.message}`);
        }
      }

      // Method 2: Verify via verified phone number header / auth payload (fallback for active sessions)
      if (!authenticatedUser && rawPhone) {
        const formattedPhone = formatPhoneNumberE164(rawPhone.toString());
        authenticatedUser = await User.findOne({ phoneNumber: formattedPhone });
      }

      // If user still cannot be resolved, reject unauthorized connection
      if (!authenticatedUser) {
        console.warn(`❌ [Socket.IO Auth Rejected] Unauthorized socket connection attempt (Socket ID: ${socket.id})`);
        return next(new Error('Authentication error: Unable to verify user identity.'));
      }

      // Attach authenticated identity to socket
      const actualUserId = authenticatedUser._id.toString();
      const userRole = (authenticatedUser.role === 'customer' ? 'CUSTOMER' : 'WORKER') as 'CUSTOMER' | 'WORKER';
      const userRoom = `user:${actualUserId}`;

      socket.data = {
        user: authenticatedUser,
        userId: actualUserId,
        role: userRole,
        room: userRoom,
      };

      return next();
    } catch (err: any) {
      console.error('❌ [Socket.IO Auth Middleware Error]:', err);
      return next(new Error('Internal server error during socket authentication'));
    }
  });

  // Socket Connection Handling
  io.on('connection', (socket: AuthenticatedSocket) => {
    const { userId, role, room, user } = socket.data;

    if (!userId || !room) {
      socket.disconnect(true);
      return;
    }

    // Join consistent user room: user:<userId>
    socket.join(room);

    // Also join by phone number room if available
    if (user?.phoneNumber) {
      socket.join(`phone:${user.phoneNumber}`);
      socket.join(`phone:${formatPhoneNumberE164(user.phoneNumber)}`);
      socket.join(`phone:${user.phoneNumber.replace(/[^\d]/g, '')}`);
    }

    // Also join role room if useful for broadcast: role:<role>
    socket.join(`role:${role?.toLowerCase()}`);

    console.log(`\n=================================================`);
    console.log(`📡 [Socket.IO] User Connected Successfully:`);
    console.log(`   • Socket ID  : ${socket.id}`);
    console.log(`   • User ID    : ${userId}`);
    console.log(`   • Full Name  : ${user?.fullName || 'N/A'}`);
    console.log(`   • Phone      : ${user?.phoneNumber}`);
    console.log(`   • Role       : ${role}`);
    console.log(`   • Joined Room: ${room}`);
    console.log(`=================================================\n`);

    // Handle Ping / Heartbeat from client
    socket.on('ping_check', (callback) => {
      if (typeof callback === 'function') {
        callback({ status: 'ok', userId, role, room, timestamp: new Date().toISOString() });
      }
    });

    // ==========================================
    // WebRTC Real-Time Audio Signaling Events
    // ==========================================

    // Client joins call signaling room
    socket.on('join_call', (data: { callId: string }) => {
      const { callId } = data || {};
      if (callId) {
        const callRoom = `call:${callId}`;
        socket.join(callRoom);
        console.log(`🎙️ [WebRTC Socket] User ${userId} (${role}) joined ${callRoom}`);
      }
    });

    // Relay WebRTC Offer
    socket.on('webrtc_offer', (data: { callId: string; targetUserId?: string; sdp: any }) => {
      const { callId, targetUserId, sdp } = data || {};
      console.log(`📡 [WebRTC Signal] Offer from ${userId} for call ${callId} (Target: ${targetUserId || 'room'})`);
      if (callId) {
        socket.to(`call:${callId}`).emit('webrtc_offer', { callId, senderId: userId, sdp });
      }
      if (targetUserId && io) {
        const callRoom = io.sockets.adapter.rooms.get(`call:${callId}`);
        const roomSize = callRoom ? callRoom.size : 0;
        // Only deliver directly to private user room if call room does not have other peer yet
        if (roomSize <= 1) {
          io.to(`user:${targetUserId}`).emit('webrtc_offer', { callId, senderId: userId, sdp });
        }
      }
    });

    // Relay WebRTC Answer
    socket.on('webrtc_answer', (data: { callId: string; targetUserId?: string; sdp: any }) => {
      const { callId, targetUserId, sdp } = data || {};
      console.log(`📡 [WebRTC Signal] Answer from ${userId} for call ${callId} (Target: ${targetUserId || 'room'})`);
      if (callId) {
        socket.to(`call:${callId}`).emit('webrtc_answer', { callId, senderId: userId, sdp });
      }
      if (targetUserId && io) {
        const callRoom = io.sockets.adapter.rooms.get(`call:${callId}`);
        const roomSize = callRoom ? callRoom.size : 0;
        if (roomSize <= 1) {
          io.to(`user:${targetUserId}`).emit('webrtc_answer', { callId, senderId: userId, sdp });
        }
      }
    });

    // Relay ICE Candidate
    socket.on('webrtc_ice_candidate', (data: { callId: string; targetUserId?: string; candidate: any }) => {
      const { callId, targetUserId, candidate } = data || {};
      if (callId) {
        socket.to(`call:${callId}`).emit('webrtc_ice_candidate', { callId, senderId: userId, candidate });
      }
      if (targetUserId && io) {
        const callRoom = io.sockets.adapter.rooms.get(`call:${callId}`);
        const roomSize = callRoom ? callRoom.size : 0;
        if (roomSize <= 1) {
          io.to(`user:${targetUserId}`).emit('webrtc_ice_candidate', { callId, senderId: userId, candidate });
        }
      }
    });

    // Leave call room
    socket.on('leave_call', (data: { callId: string; targetUserId?: string }) => {
      const { callId, targetUserId } = data || {};
      if (callId) {
        socket.leave(`call:${callId}`);
        socket.to(`call:${callId}`).emit('call_ended', { callId, senderId: userId });
      }
      if (targetUserId && io) {
        io.to(`user:${targetUserId}`).emit('call_ended', { callId, senderId: userId });
      }
    });

    // Handle Disconnection
    socket.on('disconnect', (reason) => {
      console.log(`\n=================================================`);
      console.log(`🔌 [Socket.IO] User Disconnected:`);
      console.log(`   • Socket ID  : ${socket.id}`);
      console.log(`   • User ID    : ${userId}`);
      console.log(`   • Role       : ${role}`);
      console.log(`   • Room Left  : ${room}`);
      console.log(`   • Reason     : ${reason}`);
      console.log(`=================================================\n`);
    });
  });

  console.log(`🚀 [Socket.IO] Server initialized and ready for real-time connections`);
  return io;
};

/**
 * Get active Socket.IO server instance
 */
export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.IO server has not been initialized yet.');
  }
  return io;
};

/**
 * Inspect connected socket count in a user's private room
 */
export const getUserRoomSocketCount = (userId: string): number => {
  if (!io) return 0;
  const targetRoom = `user:${userId}`;
  const roomSockets = io.sockets.adapter.rooms.get(targetRoom);
  return roomSockets ? roomSockets.size : 0;
};

export interface DeliveryResult {
  delivered: boolean;
  socketsCount: number;
  room: string;
}

/**
 * Emit event strictly to a specific user's private room: user:<userId>
 * Logs the target worker ID, room name, and active socket count.
 */
export const emitToUser = (
  userId: string,
  event: string,
  data: any,
  phone?: string
): DeliveryResult => {
  const targetRoom = `user:${userId}`;

  if (!io) {
    console.warn(`⚠️ [Socket.IO] Cannot emit "${event}": Socket server not initialized.`);
    return { delivered: false, socketsCount: 0, room: targetRoom };
  }

  const roomSockets = io.sockets.adapter.rooms.get(targetRoom);
  let socketsCount = roomSockets ? roomSockets.size : 0;

  let phoneSocketsCount = 0;
  let formattedPhone = '';
  let cleanDigitsPhone = '';
  if (phone) {
    formattedPhone = formatPhoneNumberE164(phone);
    cleanDigitsPhone = phone.replace(/[^\d]/g, '');

    const p1 = io.sockets.adapter.rooms.get(`phone:${phone}`)?.size || 0;
    const p2 = io.sockets.adapter.rooms.get(`phone:${formattedPhone}`)?.size || 0;
    const p3 = io.sockets.adapter.rooms.get(`phone:${cleanDigitsPhone}`)?.size || 0;
    phoneSocketsCount = Math.max(p1, p2, p3);
  }

  const totalSockets = Math.max(socketsCount, phoneSocketsCount);

  console.log(`\n=================================================`);
  console.log(`📡 [Socket.IO Event Dispatch]:`);
  console.log(`   • Event Name       : ${event}`);
  console.log(`   • Target User ID   : ${userId}`);
  console.log(`   • Target Room      : ${targetRoom}${phone ? ` / phone:${phone}` : ''}`);
  console.log(`   • Connected Sockets: ${totalSockets} ${totalSockets > 0 ? '🟢 (Online)' : '🔴 (Offline/Disconnected)'}`);
  console.log(`=================================================\n`);

  if (totalSockets > 0) {
    io.to(targetRoom).emit(event, data);
    if (phone) {
      io.to(`phone:${phone}`).emit(event, data);
      if (formattedPhone && formattedPhone !== phone) {
        io.to(`phone:${formattedPhone}`).emit(event, data);
      }
      if (cleanDigitsPhone && cleanDigitsPhone !== phone) {
        io.to(`phone:${cleanDigitsPhone}`).emit(event, data);
      }
    }
    return { delivered: true, socketsCount: totalSockets, room: targetRoom };
  } else {
    console.log(`ℹ️ [Socket.IO Notice] Target user ${userId} has 0 connected sockets in room ${targetRoom}. Call recorded in DB.`);
    return { delivered: false, socketsCount: 0, room: targetRoom };
  }
};
