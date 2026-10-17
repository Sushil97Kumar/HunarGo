import { io, Socket } from 'socket.io-client';
import { API_BASE_URL, getAuthToken, getActiveUserPhone, getLoggedInUser } from '../api/apiConfig';

export interface IncomingCallPayload {
  callId: string;
  callerId: string;
  callerName: string;
  callerPhone?: string;
  callerImage?: string;
  targetWorkerId: string;
  workerId?: string;
  workerName?: string;
  time?: string;
  status?: string;
  timestamp?: string;
  customer?: any;
  worker?: any;
}

export type IncomingCallListener = (payload: IncomingCallPayload) => void;

class MobileSocketService {
  private socket: Socket | null = null;
  private isConnecting: boolean = false;
  private incomingCallListeners: Set<IncomingCallListener> = new Set();
  private callStatusListeners: Set<(payload: any) => void> = new Set();
  private webrtcOfferListeners: Set<(payload: any) => void> = new Set();
  private webrtcAnswerListeners: Set<(payload: any) => void> = new Set();
  private webrtcIceCandidateListeners: Set<(payload: any) => void> = new Set();
  private callEndedListeners: Set<(payload: any) => void> = new Set();

  /**
   * Derive base server URL without /api path
   */
  public getServerUrl(): string {
    return API_BASE_URL.replace(/\/api\/?$/, '');
  }

  /**
   * Attach core socket event listeners
   * Guarantees incoming_call is registered only once per socket instance
   */
  private setupSocketListeners(): void {
    if (!this.socket) return;

    this.socket.off('incoming_call');
    this.socket.on('incoming_call', (payload: any) => {
      console.log(`\n=================================================`);
      console.log(`📞 [SocketClient] Incoming Call Event Received from Server:`);
      console.log(`   • Call ID       : ${payload?.callId}`);
      console.log(`   • Caller Name   : ${payload?.callerName || payload?.customer?.name}`);
      console.log(`   • Target Worker : ${payload?.targetWorkerId || payload?.workerId}`);
      console.log(`=================================================\n`);

      this.incomingCallListeners.forEach((listener) => {
        try {
          listener(payload);
        } catch (listenerErr) {
          console.error('❌ Error executing incoming call listener:', listenerErr);
        }
      });
    });

    this.socket.off('call_status_updated');
    this.socket.on('call_status_updated', (payload: any) => {
      console.log('📡 [SocketClient] Call status updated event received:', payload);
      this.callStatusListeners.forEach((listener) => {
        try {
          listener(payload);
        } catch (err) {
          console.error('❌ Error in call status listener:', err);
        }
      });
    });

    this.socket.off('webrtc_offer');
    this.socket.on('webrtc_offer', (payload: any) => {
      console.log('📡 [SocketClient] WebRTC Offer received for call:', payload?.callId);
      this.webrtcOfferListeners.forEach((listener) => {
        try {
          listener(payload);
        } catch (err) {
          console.error('❌ Error in webrtc_offer listener:', err);
        }
      });
    });

    this.socket.off('webrtc_answer');
    this.socket.on('webrtc_answer', (payload: any) => {
      console.log('📡 [SocketClient] WebRTC Answer received for call:', payload?.callId);
      this.webrtcAnswerListeners.forEach((listener) => {
        try {
          listener(payload);
        } catch (err) {
          console.error('❌ Error in webrtc_answer listener:', err);
        }
      });
    });

    this.socket.off('webrtc_ice_candidate');
    this.socket.on('webrtc_ice_candidate', (payload: any) => {
      this.webrtcIceCandidateListeners.forEach((listener) => {
        try {
          listener(payload);
        } catch (err) {
          console.error('❌ Error in webrtc_ice_candidate listener:', err);
        }
      });
    });

    this.socket.off('call_ended');
    this.socket.on('call_ended', (payload: any) => {
      console.log('📡 [SocketClient] Call ended event received for call:', payload?.callId);
      this.callEndedListeners.forEach((listener) => {
        try {
          listener(payload);
        } catch (err) {
          console.error('❌ Error in call_ended listener:', err);
        }
      });
    });
  }

  /**
   * Connect to Socket.IO server with authenticated credentials
   */
  public connect(): Socket | null {
    if (this.socket && this.socket.connected) {
      console.log('⚡ [SocketClient] Already connected. Socket ID:', this.socket.id);
      return this.socket;
    }

    if (this.isConnecting) {
      console.log('⏳ [SocketClient] Connection already in progress...');
      return this.socket;
    }

    const token = getAuthToken();
    const phone = getActiveUserPhone();
    const user = getLoggedInUser();
    const serverUrl = this.getServerUrl();

    // Guard: Do not attempt socket connection without authenticated credentials
    if (!token && !phone && !user) {
      console.log('ℹ️ [SocketClient] No active authenticated session. Socket will connect upon user login.');
      return null;
    }

    console.log(`🔌 [SocketClient] Initiating connection to: ${serverUrl}`);
    console.log(`   • Phone : ${phone || 'N/A'}`);
    console.log(`   • User  : ${user?.fullName || user?.id || 'N/A'}`);
    console.log(`   • Role  : ${user?.role || 'N/A'}`);
    console.log(`   • Has Token: ${Boolean(token)}`);

    this.isConnecting = true;

    try {
      this.socket = io(serverUrl, {
        transports: ['websocket', 'polling'],
        auth: {
          token: token || undefined,
          phoneNumber: phone || user?.phoneNumber || undefined,
        },
        extraHeaders: {
          'x-user-phone': phone || user?.phoneNumber || '',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        reconnection: true,
        reconnectionAttempts: 15,
        reconnectionDelay: 2000,
        timeout: 20000,
      });

      this.setupSocketListeners();

      this.socket.on('connect', () => {
        this.isConnecting = false;
        console.log(`\n=================================================`);
        console.log(`✅ [SocketClient] Connected to HunarGo Server!`);
        console.log(`   • Socket ID : ${this.socket?.id}`);
        console.log(`   • Connected : ${this.socket?.connected}`);
        console.log(`=================================================\n`);

        // Re-attach listeners upon connect/reconnect
        this.setupSocketListeners();

        // Perform heartbeat / identity verification with server
        this.socket?.emit('ping_check', (response: any) => {
          console.log('📡 [SocketClient] Server Verified Identity:', response);
        });
      });

      this.socket.on('disconnect', (reason) => {
        this.isConnecting = false;
        console.log(`⚠️ [SocketClient] Disconnected from server. Reason: ${reason}`);
      });

      this.socket.on('connect_error', (error) => {
        this.isConnecting = false;
        console.warn('❌ [SocketClient] Connection Error:', error.message);
        if (error.message && error.message.toLowerCase().includes('auth')) {
          this.socket?.disconnect();
          this.socket = null;
        }
      });

      return this.socket;
    } catch (err: any) {
      this.isConnecting = false;
      console.error('❌ [SocketClient] Exception while creating socket:', err);
      return null;
    }
  }

  /**
   * Register listener for incoming calls.
   * Guarantees single registration per socket, with cleanup on unsubscribe.
   */
  public onIncomingCall(listener: IncomingCallListener): () => void {
    this.incomingCallListeners.add(listener);

    if (this.socket) {
      this.setupSocketListeners();
    } else {
      this.connect();
    }

    return () => {
      this.incomingCallListeners.delete(listener);
    };
  }

  /**
   * Register listener for call status changes (Accepted, Cancelled, Ended)
   */
  public onCallStatusUpdated(listener: (payload: any) => void): () => void {
    this.callStatusListeners.add(listener);

    if (this.socket) {
      this.setupSocketListeners();
    } else {
      this.connect();
    }

    return () => {
      this.callStatusListeners.delete(listener);
    };
  }

  /**
   * Join WebRTC call room
   */
  public joinCall(callId: string): void {
    if (!this.socket || !this.socket.connected) {
      this.connect();
    }
    console.log(`🎙️ [SocketClient] Joining WebRTC call room: call:${callId}`);
    this.socket?.emit('join_call', { callId });
  }

  /**
   * Leave WebRTC call room
   */
  public leaveCall(callId: string, targetUserId?: string): void {
    console.log(`🛑 [SocketClient] Leaving WebRTC call room: call:${callId}`);
    this.socket?.emit('leave_call', { callId, targetUserId });
  }

  /**
   * Send WebRTC Offer to remote peer
   */
  public sendOffer(callId: string, targetUserId: string, sdp: any): void {
    console.log(`📤 [SocketClient] Sending WebRTC Offer for call ${callId} to target ${targetUserId}`);
    this.socket?.emit('webrtc_offer', { callId, targetUserId, sdp });
  }

  /**
   * Send WebRTC Answer to remote peer
   */
  public sendAnswer(callId: string, targetUserId: string, sdp: any): void {
    console.log(`📤 [SocketClient] Sending WebRTC Answer for call ${callId} to target ${targetUserId}`);
    this.socket?.emit('webrtc_answer', { callId, targetUserId, sdp });
  }

  /**
   * Send WebRTC ICE Candidate to remote peer
   */
  public sendIceCandidate(callId: string, targetUserId: string, candidate: any): void {
    this.socket?.emit('webrtc_ice_candidate', { callId, targetUserId, candidate });
  }

  /**
   * Register listener for incoming WebRTC offer
   */
  public onWebRtcOffer(listener: (payload: any) => void): () => void {
    this.webrtcOfferListeners.add(listener);
    if (this.socket) {
      this.setupSocketListeners();
    } else {
      this.connect();
    }
    return () => {
      this.webrtcOfferListeners.delete(listener);
    };
  }

  /**
   * Register listener for incoming WebRTC answer
   */
  public onWebRtcAnswer(listener: (payload: any) => void): () => void {
    this.webrtcAnswerListeners.add(listener);
    if (this.socket) {
      this.setupSocketListeners();
    } else {
      this.connect();
    }
    return () => {
      this.webrtcAnswerListeners.delete(listener);
    };
  }

  /**
   * Register listener for incoming WebRTC ICE candidate
   */
  public onWebRtcIceCandidate(listener: (payload: any) => void): () => void {
    this.webrtcIceCandidateListeners.add(listener);
    if (this.socket) {
      this.setupSocketListeners();
    } else {
      this.connect();
    }
    return () => {
      this.webrtcIceCandidateListeners.delete(listener);
    };
  }

  /**
   * Register listener for remote call ended
   */
  public onCallEnded(listener: (payload: any) => void): () => void {
    this.callEndedListeners.add(listener);
    if (this.socket) {
      this.setupSocketListeners();
    } else {
      this.connect();
    }
    return () => {
      this.callEndedListeners.delete(listener);
    };
  }

  /**
   * Disconnect the active socket
   */
  public disconnect(): void {
    if (this.socket) {
      console.log('🔌 [SocketClient] Disconnecting socket...');
      this.socket.disconnect();
      this.socket = null;
      this.isConnecting = false;
    }
  }

  /**
   * Get active socket instance
   */
  public getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Check if socket is currently connected
   */
  public isConnected(): boolean {
    return Boolean(this.socket && this.socket.connected);
  }
}

export const socketService = new MobileSocketService();
