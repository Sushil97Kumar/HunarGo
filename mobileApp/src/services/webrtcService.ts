// @ts-nocheck
import { PermissionsAndroid, Platform } from 'react-native';
import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
  MediaStream,
} from 'react-native-webrtc';
import InCallManager from 'react-native-incall-manager';
import { socketService } from './socketService';

const RTC_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
  ],
};

/**
 * Request runtime microphone and Bluetooth permissions on Android
 */
export const requestAudioPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const permsToRequest: any[] = [
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ];

      // Android 12+ (API 31+) requires BLUETOOTH_CONNECT for Bluetooth headsets / SCO
      if (
        Platform.Version >= 31 &&
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      ) {
        permsToRequest.push(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
      }

      const results = await PermissionsAndroid.requestMultiple(permsToRequest);
      const audioGranted =
        results[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
        PermissionsAndroid.RESULTS.GRANTED;

      return audioGranted;
    } catch (err) {
      console.warn('⚠️ [WebRTC] Permission request error:', err);
      return false;
    }
  }
  return true;
};

class WebRtcAudioService {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private queuedCandidates: any[] = [];
  private appliedCandidates: Set<string> = new Set<string>();
  private pendingOffer: any = null;
  private callId: string = '';
  private targetUserId: string = '';
  private isMuted: boolean = false;
  private isSpeaker: boolean = true;
  private isInitialized: boolean = false;
  private cleanupListeners: (() => void)[] = [];

  /**
   * Initialize Local Audio Media Stream with optimal voice communication constraints
   */
  private async getLocalAudioStream(): Promise<MediaStream | null> {
    try {
      const hasPermission = await requestAudioPermission();
      if (!hasPermission) {
        console.warn('⚠️ [WebRTC] Audio permission denied by user.');
        return null;
      }

      console.log('🎤 [WebRTC] Fetching local audio stream (mic only with VoIP enhancements)...');
      const stream = await mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });

      // Ensure every captured audio track is active and unmuted
      stream.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });

      this.localStream = stream;
      this.isMuted = false;
      return stream;
    } catch (err) {
      console.error('❌ [WebRTC] Failed to get user audio media:', err);
      return null;
    }
  }

  /**
   * Flush any ICE candidates queued before remote description was ready
   */
  private async processQueuedCandidates(): Promise<void> {
    if (!this.peerConnection || !this.peerConnection.remoteDescription) return;

    while (this.queuedCandidates.length > 0) {
      const candidateData = this.queuedCandidates.shift();
      try {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidateData));
        console.log('❄️ [WebRTC] Queued ICE candidate added successfully');
      } catch (err) {
        console.warn('⚠️ [WebRTC] Error adding queued ICE candidate:', err);
      }
    }
  }

  /**
   * Set up common signaling listeners for active call
   */
  private setupSignalingListeners(): void {
    // Unsubscribe any previous listeners
    this.cleanupListeners.forEach((fn) => fn());
    this.cleanupListeners = [];

    // ICE Candidate handler with duplicate prevention
    const unsubIce = socketService.onWebRtcIceCandidate(async (data) => {
      if (data?.callId !== this.callId) return;

      const candidate = data.candidate;
      if (!candidate || !candidate.candidate) return;

      const candKey = `${candidate.sdpMid}_${candidate.sdpMLineIndex}_${candidate.candidate}`;
      if (this.appliedCandidates.has(candKey)) {
        return;
      }
      this.appliedCandidates.add(candKey);

      if (this.peerConnection && this.peerConnection.remoteDescription) {
        try {
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
          console.log('❄️ [WebRTC] Remote ICE candidate applied');
        } catch (err) {
          console.warn('⚠️ [WebRTC] Error adding ICE candidate:', err);
        }
      } else {
        console.log('⏳ [WebRTC] Queuing ICE candidate (remote description not ready yet)');
        this.queuedCandidates.push(candidate);
      }
    });
    this.cleanupListeners.push(unsubIce);

    // Remote Hang Up / Call Ended handler
    const unsubEnded = socketService.onCallEnded((data) => {
      if (data?.callId === this.callId) {
        console.log('📞 [WebRTC] Call ended by remote peer');
        this.endCall();
      }
    });
    this.cleanupListeners.push(unsubEnded);
  }

  /**
   * START CALL AS CALLER (Customer Side)
   * Triggered when worker answers / accepts the call
   */
  public async startCallAsCaller(callId: string, targetWorkerId: string): Promise<boolean> {
    if (this.isInitialized && this.callId === callId) {
      console.log('⚡ [WebRTC] Caller audio already initialized for this call.');
      return true;
    }

    console.log(`\n=================================================`);
    console.log(`📞 [WebRTC Caller] Initializing Audio Call`);
    console.log(`   • Call ID  : ${callId}`);
    console.log(`   • Target ID: ${targetWorkerId}`);
    console.log(`=================================================\n`);

    this.callId = callId;
    this.targetUserId = targetWorkerId;

    // Join room
    socketService.joinCall(callId);

    // Acquire Local Microphone first (requests RECORD_AUDIO and BLUETOOTH permissions)
    const stream = await this.getLocalAudioStream();
    if (!stream) {
      console.warn('⚠️ [WebRTC] Could not acquire audio stream.');
      return false;
    }

    // Start InCallManager for voice routing (default to speakerphone so voice is clearly audible)
    this.isSpeaker = true;
    try {
      if (InCallManager && typeof InCallManager.start === 'function') {
        InCallManager.start({ media: 'audio', auto: true });
        InCallManager.setSpeakerphoneOn(true);
        InCallManager.setForceSpeakerphoneOn(true);
      }
    } catch (icmErr) {
      console.warn('⚠️ [WebRTC] InCallManager start notice:', icmErr);
    }

    // Create RTCPeerConnection
    const pc = new RTCPeerConnection(RTC_CONFIG);
    this.peerConnection = pc;
    this.isInitialized = true;

    // Add local audio tracks to connection
    stream.getAudioTracks().forEach((track) => {
      track.enabled = true;
      pc.addTrack(track, stream);
      console.log(`🎤 [WebRTC Caller] Local audio track added to connection: ${track.id}`);
    });

    // Ensure transceiver direction is bidirectional sendrecv
    if (pc.getTransceivers) {
      pc.getTransceivers().forEach((transceiver) => {
        if (transceiver.sender && transceiver.sender.track && transceiver.sender.track.kind === 'audio') {
          try { transceiver.direction = 'sendrecv'; } catch (e) {}
        }
      });
    }

    // Listen for remote audio track
    pc.ontrack = (event) => {
      console.log('🔊 [WebRTC Caller] Remote audio track received from worker!');
      if (event.track) {
        event.track.enabled = true;
      }
      if (event.streams && event.streams[0]) {
        console.log('✅ [WebRTC Caller] Worker audio stream is live and playing.');
      }
      // Re-assert audio output routing to ensure loud and clear sound
      try {
        if (InCallManager && typeof InCallManager.setSpeakerphoneOn === 'function') {
          InCallManager.setSpeakerphoneOn(this.isSpeaker);
          InCallManager.setForceSpeakerphoneOn(this.isSpeaker);
        }
      } catch (e) {}
    };

    pc.onconnectionstatechange = () => {
      console.log(`⚡ [WebRTC Caller] Connection State: ${pc.connectionState}`);
    };

    pc.oniceconnectionstatechange = () => {
      console.log(`❄️ [WebRTC Caller] ICE Connection State: ${pc.iceConnectionState}`);
    };

    // ICE Candidate Generation
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketService.sendIceCandidate(callId, targetWorkerId, event.candidate);
      }
    };

    // Register signaling listeners
    this.setupSignalingListeners();

    // Answer handler from Worker (with state validation to avoid duplicate setRemoteDescription errors)
    const unsubAnswer = socketService.onWebRtcAnswer(async (data) => {
      if (data?.callId !== this.callId) return;

      if (!pc || pc.signalingState !== 'have-local-offer') {
        console.log(`⚠️ [WebRTC Caller] Ignoring answer because signalingState is: ${pc?.signalingState}`);
        return;
      }

      console.log('📥 [WebRTC Caller] Received WebRTC answer from worker');
      try {
        const remoteDesc = new RTCSessionDescription(data.sdp);
        await pc.setRemoteDescription(remoteDesc);
        console.log('✅ [WebRTC Caller] Remote description set successfully!');
        await this.processQueuedCandidates();
      } catch (err) {
        console.error('❌ [WebRTC Caller] Failed to set remote answer:', err);
      }
    });
    this.cleanupListeners.push(unsubAnswer);

    // Create & send WebRTC Offer to Worker
    try {
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false,
      });
      await pc.setLocalDescription(offer);
      console.log('📤 [WebRTC Caller] Local offer created & set. Emitting to worker...');
      socketService.sendOffer(callId, targetWorkerId, offer);
      return true;
    } catch (err) {
      console.error('❌ [WebRTC Caller] Error creating offer:', err);
      return false;
    }
  }

  /**
   * START CALL AS CALLEE (Worker Side)
   * Triggered when worker clicks "Accept"
   */
  public async startCallAsCallee(callId: string, callerId: string): Promise<boolean> {
    if (this.isInitialized && this.callId === callId) {
      console.log('⚡ [WebRTC] Callee audio already initialized for this call.');
      return true;
    }

    console.log(`\n=================================================`);
    console.log(`📞 [WebRTC Callee] Initializing Audio Call`);
    console.log(`   • Call ID   : ${callId}`);
    console.log(`   • Caller ID : ${callerId}`);
    console.log(`=================================================\n`);

    this.callId = callId;
    this.targetUserId = callerId;

    // Join room
    socketService.joinCall(callId);

    // Acquire Local Microphone first (requests RECORD_AUDIO and BLUETOOTH permissions)
    const stream = await this.getLocalAudioStream();
    if (!stream) {
      console.warn('⚠️ [WebRTC] Could not acquire audio stream.');
      return false;
    }

    // Start InCallManager for voice routing (default to speakerphone so voice is clearly audible)
    this.isSpeaker = true;
    try {
      if (InCallManager && typeof InCallManager.start === 'function') {
        InCallManager.start({ media: 'audio', auto: true });
        InCallManager.setSpeakerphoneOn(true);
        InCallManager.setForceSpeakerphoneOn(true);
      }
    } catch (icmErr) {
      console.warn('⚠️ [WebRTC] InCallManager start notice:', icmErr);
    }

    // Create RTCPeerConnection
    const pc = new RTCPeerConnection(RTC_CONFIG);
    this.peerConnection = pc;
    this.isInitialized = true;

    // Add local audio tracks to connection
    stream.getAudioTracks().forEach((track) => {
      track.enabled = true;
      pc.addTrack(track, stream);
      console.log(`🎤 [WebRTC Callee] Local audio track added to connection: ${track.id}`);
    });

    // Ensure transceiver direction is bidirectional sendrecv
    if (pc.getTransceivers) {
      pc.getTransceivers().forEach((transceiver) => {
        if (transceiver.sender && transceiver.sender.track && transceiver.sender.track.kind === 'audio') {
          try { transceiver.direction = 'sendrecv'; } catch (e) {}
        }
      });
    }

    // Listen for remote audio track
    pc.ontrack = (event) => {
      console.log('🔊 [WebRTC Callee] Remote audio track received from customer!');
      if (event.track) {
        event.track.enabled = true;
      }
      if (event.streams && event.streams[0]) {
        console.log('✅ [WebRTC Callee] Customer audio stream is live and playing.');
      }
      // Re-assert audio output routing to ensure loud and clear sound
      try {
        if (InCallManager && typeof InCallManager.setSpeakerphoneOn === 'function') {
          InCallManager.setSpeakerphoneOn(this.isSpeaker);
          InCallManager.setForceSpeakerphoneOn(this.isSpeaker);
        }
      } catch (e) {}
    };

    pc.onconnectionstatechange = () => {
      console.log(`⚡ [WebRTC Callee] Connection State: ${pc.connectionState}`);
    };

    pc.oniceconnectionstatechange = () => {
      console.log(`❄️ [WebRTC Callee] ICE Connection State: ${pc.iceConnectionState}`);
    };

    // ICE Candidate Generation
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketService.sendIceCandidate(callId, callerId, event.candidate);
      }
    };

    // Register signaling listeners
    this.setupSignalingListeners();

    // Helper to handle offer and produce answer safely
    const handleOffer = async (offerSdp: any) => {
      try {
        if (!pc || pc.signalingState === 'closed') return;
        if (pc.signalingState !== 'stable' && pc.signalingState !== 'have-local-offer') {
          console.log(`⚠️ [WebRTC Callee] Ignoring duplicate offer in state: ${pc.signalingState}`);
          return;
        }

        console.log('📥 [WebRTC Callee] Processing offer from customer...');
        const remoteDesc = new RTCSessionDescription(offerSdp);
        await pc.setRemoteDescription(remoteDesc);
        console.log('✅ [WebRTC Callee] Remote description set from customer offer.');

        // Re-confirm bidirectional direction on transceivers
        if (pc.getTransceivers) {
          pc.getTransceivers().forEach((transceiver) => {
            if (transceiver.direction !== 'sendrecv') {
              try { transceiver.direction = 'sendrecv'; } catch (e) {}
            }
          });
        }

        const answer = await pc.createAnswer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: false,
        });
        await pc.setLocalDescription(answer);
        console.log('📤 [WebRTC Callee] Created answer. Emitting to customer...');
        socketService.sendAnswer(callId, callerId, answer);

        await this.processQueuedCandidates();
      } catch (err) {
        console.error('❌ [WebRTC Callee] Error processing offer:', err);
      }
    };

    // If an offer arrived before callee completed setup
    if (this.pendingOffer) {
      const offerToProcess = this.pendingOffer;
      this.pendingOffer = null;
      await handleOffer(offerToProcess);
    }

    // Offer handler from Customer
    const unsubOffer = socketService.onWebRtcOffer(async (data) => {
      if (data?.callId !== this.callId) return;

      console.log('📥 [WebRTC Callee] Received WebRTC offer from customer');
      await handleOffer(data.sdp);
    });
    this.cleanupListeners.push(unsubOffer);

    return true;
  }

  /**
   * Store pending offer if received before initialization
   */
  public receiveIncomingOffer(callId: string, offerSdp: any): void {
    if (!this.isInitialized || this.callId !== callId) {
      console.log('📥 [WebRTC] Storing pending offer for call:', callId);
      this.pendingOffer = offerSdp;
    }
  }

  /**
   * Toggle Microphone Mute
   */
  public toggleMute(): boolean {
    if (!this.localStream) {
      return false;
    }

    const newMutedState = !this.isMuted;
    this.localStream.getAudioTracks().forEach((track) => {
      track.enabled = !newMutedState;
    });
    this.isMuted = newMutedState;
    console.log(`🎙️ [WebRTC] Microphone is now: ${this.isMuted ? 'MUTED' : 'UNMUTED'}`);
    return this.isMuted;
  }

  /**
   * Toggle Speakerphone / Earpiece
   */
  public toggleSpeaker(): boolean {
    const newSpeakerState = !this.isSpeaker;
    this.isSpeaker = newSpeakerState;
    try {
      if (InCallManager && typeof InCallManager.setForceSpeakerphoneOn === 'function') {
        InCallManager.setForceSpeakerphoneOn(this.isSpeaker);
      }
      if (InCallManager && typeof InCallManager.setSpeakerphoneOn === 'function') {
        InCallManager.setSpeakerphoneOn(this.isSpeaker);
      }
      console.log(`🔊 [WebRTC] Speakerphone is now: ${this.isSpeaker ? 'ON' : 'OFF'}`);
    } catch (err) {
      console.warn('⚠️ [WebRTC] Error setting speakerphone:', err);
    }
    return this.isSpeaker;
  }

  /**
   * Get active speakerphone state
   */
  public getSpeakerState(): boolean {
    return this.isSpeaker;
  }

  /**
   * Get active mute state
   */
  public getMuteState(): boolean {
    return this.isMuted;
  }

  /**
   * Cleanly terminate call, stop tracks, close RTCPeerConnection and stop InCallManager
   */
  public endCall(): void {
    console.log('🛑 [WebRTC] Ending call & releasing audio hardware...');

    // Stop InCallManager
    try {
      if (InCallManager && typeof InCallManager.stop === 'function') {
        InCallManager.stop();
      }
    } catch (e) {}

    // Notify other party
    if (this.callId) {
      socketService.leaveCall(this.callId, this.targetUserId);
    }

    // Stop microphone tracks
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {}
      });
      this.localStream = null;
    }

    // Close peer connection
    if (this.peerConnection) {
      try {
        this.peerConnection.close();
      } catch (e) {}
      this.peerConnection = null;
    }

    // Clean up signaling listeners
    this.cleanupListeners.forEach((cleanup) => {
      try {
        cleanup();
      } catch (e) {}
    });
    this.cleanupListeners = [];

    this.queuedCandidates = [];
    this.appliedCandidates.clear();
    this.pendingOffer = null;
    this.callId = '';
    this.targetUserId = '';
    this.isMuted = false;
    this.isSpeaker = true;
    this.isInitialized = false;
  }
}

export const webrtcService = new WebRtcAudioService();
