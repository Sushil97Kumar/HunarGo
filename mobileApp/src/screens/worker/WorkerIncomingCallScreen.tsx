// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { workerApi } from '../../api/workerApi';
import { socketService } from '../../services/socketService';
import { webrtcService, requestAudioPermission } from '../../services/webrtcService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DefaultAvatar = require('../../assets/default_avatar.png');

export interface IncomingCallData {
  callId: string;
  callerId?: string;
  callerName?: string;
  callerPhone?: string;
  callerImage?: string;
  targetWorkerId?: string;
  customer?: {
    id?: string;
    name?: string;
    phoneNumber?: string;
    profileImage?: string;
  };
  worker?: {
    id?: string;
    name?: string;
    profession?: string;
  };
  time?: string;
  status?: string;
  timestamp?: string;
}

interface Props {
  visible?: boolean;
  callData: IncomingCallData | null;
  onAccept?: () => void;
  onDecline?: () => void;
  onEndCall?: () => void;
}

export const WorkerIncomingCallScreen: React.FC<Props> = ({
  visible = true,
  callData,
  onAccept,
  onDecline,
  onEndCall,
}) => {
  // Call status: 'ringing' -> 'connected' -> 'ended'
  const [callStatus, setCallStatus] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  // Animated ripple waves
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const ring3 = useRef(new Animated.Value(0)).current;
  const pulseBadge = useRef(new Animated.Value(1)).current;
  const cutCallAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<any>(null);
  const isEndingRef = useRef<boolean>(false);

  useEffect(() => {
    if (!callData) {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
      setCallStatus('ringing');
      setIsMuted(false);
      setIsSpeakerOn(true);
      setImageError(false);
      isEndingRef.current = false;
      return;
    }

    isEndingRef.current = false;
    setCallStatus('ringing');
    setCallDuration(0);
    setIsMuted(false);
    setIsSpeakerOn(true);
    setImageError(false);

    // Pre-request and verify microphone permissions
    requestAudioPermission().then((granted) => {
      console.log('🎤 [WorkerIncomingCallScreen] Upfront mic permission granted:', granted);
    });

    // Pre-join call room early so all signaling and ICE candidates arrive without delay
    if (callData.callId) {
      socketService.joinCall(callData.callId);
    }

    // Ringing ripple animation
    const createRingAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 2200,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = createRingAnimation(ring1, 0);
    const anim2 = createRingAnimation(ring2, 600);
    const anim3 = createRingAnimation(ring3, 1200);

    const badgePulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseBadge, {
          toValue: 1.08,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseBadge, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );

    anim1.start();
    anim2.start();
    anim3.start();
    badgePulse.start();

    // Listen for customer cancelling the call remotely via socket
    let unsubscribeStatus: (() => void) | undefined;
    if (typeof socketService.onCallStatusUpdated === 'function') {
      unsubscribeStatus = socketService.onCallStatusUpdated((payload: any) => {
        const callId = callData?.callId;
        if (payload?.callId === callId && (payload?.status === 'Cancelled' || payload?.status === 'Ended')) {
          console.log('🔴 [WorkerIncomingCallScreen] Customer cancelled/ended the call.');
          setCallStatus('ended');
          try {
            webrtcService.endCall();
          } catch (rtcErr) {
            console.warn('⚠️ [WorkerIncomingCallScreen] WebRTC endCall error:', rtcErr);
          }
          setTimeout(() => {
            if (onDecline) onDecline();
            else if (onEndCall) onEndCall();
          }, 1200);
        }
      });
    }

    // Listen for incoming offer early if caller sent it before accept
    let unsubOffer: (() => void) | undefined;
    if (typeof socketService.onWebRtcOffer === 'function') {
      unsubOffer = socketService.onWebRtcOffer((offerPayload: any) => {
        if (offerPayload?.callId === callData?.callId) {
          console.log('📥 [WorkerIncomingCallScreen] Early WebRTC offer received, buffering...');
          try {
            webrtcService.receiveIncomingOffer(offerPayload.callId, offerPayload.sdp);
          } catch (offerErr) {
            console.warn('⚠️ [WorkerIncomingCallScreen] Error buffering offer:', offerErr);
          }
        }
      });
    }

    return () => {
      try { anim1.stop(); } catch (e) {}
      try { anim2.stop(); } catch (e) {}
      try { anim3.stop(); } catch (e) {}
      try { badgePulse.stop(); } catch (e) {}
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof unsubscribeStatus === 'function') {
        try { unsubscribeStatus(); } catch (e) {}
      }
      if (typeof unsubOffer === 'function') {
        try { unsubOffer(); } catch (e) {}
      }
      try {
        webrtcService.endCall();
      } catch (e) {}
    };
  }, [ring1, ring2, ring3, pulseBadge, callData?.callId]);

  // Format MM:SS duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle Worker Answering Call
  const handleAcceptCall = async () => {
    try {
      const callId = callData?.callId;
      console.log('✅ [WorkerIncomingCallScreen] Worker accepted call:', callId);
      setCallStatus('connected');

      // Start in-call duration timer
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      // Initialize Real-Time WebRTC Two-Way Audio
      const callerId = callData?.callerId || callData?.customer?.id;
      if (callId && callerId) {
        console.log(`🎙️ [WorkerIncomingCallScreen] Starting WebRTC callee audio connection to caller: ${callerId}`);
        webrtcService.startCallAsCallee(callId, callerId).catch((rtcErr) => {
          console.warn('⚠️ [WorkerIncomingCallScreen] WebRTC callee error:', rtcErr);
        });
      }

      if (callId) {
        try {
          await workerApi.updateCallStatus(callId, 'Accepted');
        } catch (err) {
          console.error('Error accepting call:', err);
        }
      }

      if (onAccept) onAccept();
    } catch (err) {
      console.error('❌ [WorkerIncomingCallScreen] Error in handleAcceptCall:', err);
    }
  };

  // Handle Worker Declining / Cutting Call
  const handleCutCall = async () => {
    if (isEndingRef.current) return;
    isEndingRef.current = true;

    try {
      const callId = callData?.callId;
      console.log('🔴 [WorkerIncomingCallScreen] Worker cut/declined call:', callId);
      setCallStatus('ended');
      if (timerRef.current) clearInterval(timerRef.current);

      // Stop WebRTC audio streaming immediately
      try {
        webrtcService.endCall();
      } catch (e) {}

      // Subtle press-down animation on Cut Call button
      Animated.sequence([
        Animated.timing(cutCallAnim, {
          toValue: 0.85,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(cutCallAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();

      if (callId) {
        try {
          await workerApi.updateCallStatus(callId, 'Cancelled');
        } catch (err) {
          console.error('Error cutting call:', err);
        }
      }

      setTimeout(() => {
        if (onEndCall) onEndCall();
        else if (onDecline) onDecline();
      }, 450);
    } catch (cutErr) {
      console.error('❌ [WorkerIncomingCallScreen] Error in handleCutCall:', cutErr);
      if (onEndCall) onEndCall();
      else if (onDecline) onDecline();
    }
  };

  if (!callData) {
    return null;
  }

  const customerName =
    callData?.callerName ||
    callData?.customer?.name ||
    'Customer';

  const customerImage =
    callData?.callerImage ||
    callData?.customer?.profileImage ||
    '';

  const professionRequested =
    callData?.worker?.profession ||
    'Service Direct Request';

  const callId = callData?.callId || '';

  // Helper to resolve customer/caller profile photo
  const getCallerImageSource = () => {
    if (imageError || !customerImage) return DefaultAvatar;
    if (typeof customerImage === 'number') return customerImage;
    if (typeof customerImage === 'object' && customerImage.uri) return customerImage;
    if (typeof customerImage === 'string') {
      const trimmed = customerImage.trim();
      if (
        trimmed.startsWith('http://') ||
        trimmed.startsWith('https://') ||
        trimmed.startsWith('data:image') ||
        trimmed.startsWith('file://') ||
        trimmed.startsWith('content://')
      ) {
        return { uri: trimmed };
      }
    }
    return DefaultAvatar;
  };

  const renderRippleRing = (animValue: Animated.Value) => {
    const scale = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2.3],
    });
    const opacity = animValue.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: [0.6, 0.3, 0],
    });

    return (
      <Animated.View
        style={[
          styles.rippleCircle,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      />
    );
  };

  return (
    <Modal
      visible={visible && Boolean(callData)}
      animationType="slide"
      transparent={false}
      statusBarTranslucent={true}
      onRequestClose={handleCutCall}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" translucent />

        {/* TOP HEADER (Identical to Customer Calling Screen) */}
        <View style={styles.topHeader}>
          <View style={styles.badgePill}>
            <Text style={styles.badgeDot}>🟢</Text>
            <Text style={styles.badgeText}>HunarGo Direct Connect</Text>
          </View>
          <Text style={styles.titleText}>
            {callStatus === 'connected' ? 'In Call' : 'Incoming Call'}
          </Text>
          <Text style={styles.durationText}>
            {callStatus === 'connected' ? formatDuration(callDuration) : 'Calling You...'}
          </Text>
        </View>

        {/* CENTER CALLER INFO WITH PULSING WAVES & CALLER IMAGE */}
        <View style={styles.centerContainer}>
          <View style={styles.avatarWrapper}>
            {renderRippleRing(ring1)}
            {renderRippleRing(ring2)}
            {renderRippleRing(ring3)}

            <View style={[styles.avatarGlowBorder, callStatus === 'connected' && styles.avatarGlowConnected]}>
              <Image
                source={getCallerImageSource()}
                style={styles.avatarImage}
                resizeMode="cover"
                onError={() => setImageError(true)}
              />
            </View>
          </View>

          {/* Caller Identity Details */}
          <View style={styles.callerInfoBox}>
            <Text style={styles.customerNameText} numberOfLines={1}>
              {customerName}
            </Text>
            <View style={styles.professionPill}>
              <Text style={styles.professionText}>{professionRequested}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaBadge}>⭐ Verified Customer</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaBadge}>📍 Nearby Location</Text>
            </View>
          </View>

          {/* Dynamic Ringing / Connected / Ended Status Pill */}
          <Animated.View
            style={[
              styles.statusPill,
              callStatus === 'connected' && styles.statusPillConnected,
              callStatus === 'ended' && styles.statusPillEnded,
              { transform: [{ scale: pulseBadge }] },
            ]}
          >
            {callStatus === 'ringing' && (
              <>
                <Text style={styles.statusIcon}>📞</Text>
                <Text style={styles.statusText}>Incoming Call • Ringing...</Text>
              </>
            )}
            {callStatus === 'connected' && (
              <>
                <Text style={styles.statusIcon}>🟢</Text>
                <Text style={styles.statusTextConnected}>Connected • {formatDuration(callDuration)}</Text>
              </>
            )}
            {callStatus === 'ended' && (
              <>
                <Text style={styles.statusIcon}>🔴</Text>
                <Text style={styles.statusTextEnded}>Call Ended</Text>
              </>
            )}
          </Animated.View>
        </View>

        {/* IN-CALL CONTROLS: MUTE, SPEAKER & CALL CUT / ACCEPT BUTTONS */}
        <View style={styles.bottomSection}>
          {/* Controls Row: Mute & Speaker */}
          <View style={styles.controlsRow}>
            {/* Mute Button */}
            <TouchableOpacity
              style={styles.controlBtn}
              activeOpacity={0.75}
              onPress={() => {
                const muted = webrtcService.toggleMute();
                setIsMuted(muted);
              }}
            >
              <View style={[styles.controlIconBox, isMuted && styles.controlIconBoxActive]}>
                <Text style={styles.controlIcon}>{isMuted ? '🔇' : '🎙️'}</Text>
              </View>
              <Text style={[styles.controlLabel, isMuted && styles.controlLabelActive]}>
                {isMuted ? 'Muted' : 'Mute'}
              </Text>
            </TouchableOpacity>

            {/* Speaker Button */}
            <TouchableOpacity
              style={styles.controlBtn}
              activeOpacity={0.75}
              onPress={() => {
                const speaker = webrtcService.toggleSpeaker();
                setIsSpeakerOn(speaker);
              }}
            >
              <View style={[styles.controlIconBox, isSpeakerOn && styles.controlIconBoxActive]}>
                <Text style={styles.controlIcon}>{isSpeakerOn ? '🔊' : '🔈'}</Text>
              </View>
              <Text style={[styles.controlLabel, isSpeakerOn && styles.controlLabelActive]}>
                {isSpeakerOn ? 'Speaker ON' : 'Speaker'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Primary Action Buttons:
              - While Ringing: Accept (Green) and Cut Call / Decline (Red)
              - When Connected: Cut Call (Red)
          */}
          {callStatus === 'ringing' ? (
            <View style={styles.incomingActionButtonsRow}>
              {/* Cut Call / Decline Button */}
              <View style={styles.actionBtnWrapper}>
                <Animated.View style={{ transform: [{ scale: cutCallAnim }] }}>
                  <TouchableOpacity
                    style={styles.cutCallBtn}
                    activeOpacity={0.8}
                    onPress={handleCutCall}
                  >
                    <Text style={styles.cutCallIcon}>📞</Text>
                  </TouchableOpacity>
                </Animated.View>
                <Text style={styles.cutCallLabel}>Cut Call</Text>
              </View>

              {/* Accept Call Button */}
              <View style={styles.actionBtnWrapper}>
                <TouchableOpacity
                  style={styles.acceptCallBtn}
                  activeOpacity={0.8}
                  onPress={handleAcceptCall}
                >
                  <Text style={styles.acceptCallIcon}>📞</Text>
                </TouchableOpacity>
                <Text style={styles.acceptCallLabel}>Accept</Text>
              </View>
            </View>
          ) : (
            <View style={styles.endCallWrapper}>
              <Animated.View style={{ transform: [{ scale: cutCallAnim }] }}>
                <TouchableOpacity
                  style={styles.cutCallBtn}
                  activeOpacity={0.8}
                  onPress={handleCutCall}
                >
                  <Text style={styles.cutCallIcon}>📞</Text>
                </TouchableOpacity>
              </Animated.View>
              <Text style={styles.cutCallLabel}>Cut Call</Text>
            </View>
          )}

          {/* Security & Info Footer */}
          <View style={styles.footerNoteRow}>
            <Text style={styles.footerNoteText}>
              🔒 HunarGo End-to-End Direct Connection
            </Text>
            {callId ? (
              <Text style={styles.debugCallId}>ID: {String(callId).slice(-6).toUpperCase()}</Text>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 8 : 40,
    paddingBottom: 28,
  },
  topHeader: {
    alignItems: 'center',
    paddingTop: 16,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
    gap: 6,
  },
  badgeDot: {
    fontSize: 9,
  },
  badgeText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  durationText: {
    color: '#38BDF8',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 4,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  avatarWrapper: {
    width: 170,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  rippleCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#0284C7',
  },
  avatarGlowBorder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#38BDF8',
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.65,
    shadowRadius: 18,
    elevation: 14,
  },
  avatarGlowConnected: {
    borderColor: '#4ADE80',
    shadowColor: '#4ADE80',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  callerInfoBox: {
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  customerNameText: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  professionPill: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 14,
    marginBottom: 8,
  },
  professionText: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaBadge: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '500',
  },
  metaDot: {
    color: '#475569',
    fontSize: 14,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: 'rgba(56, 189, 248, 0.4)',
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 24,
    gap: 8,
  },
  statusPillConnected: {
    backgroundColor: 'rgba(34, 197, 94, 0.18)',
    borderColor: 'rgba(34, 197, 94, 0.5)',
  },
  statusPillEnded: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  statusIcon: {
    fontSize: 16,
  },
  statusText: {
    color: '#38BDF8',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  statusTextConnected: {
    color: '#4ADE80',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  statusTextEnded: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 10,
    width: '100%',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
    gap: 40,
  },
  controlBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  controlIconBoxActive: {
    backgroundColor: '#0284C7',
    borderColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  controlIcon: {
    fontSize: 26,
  },
  controlLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  controlLabelActive: {
    color: '#38BDF8',
    fontWeight: '700',
  },
  incomingActionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 48,
    marginBottom: 20,
  },
  actionBtnWrapper: {
    alignItems: 'center',
  },
  endCallWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cutCallBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 10,
  },
  cutCallIcon: {
    fontSize: 34,
    color: '#FFFFFF',
    transform: [{ rotate: '135deg' }],
  },
  cutCallLabel: {
    color: '#F87171',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
    letterSpacing: 0.4,
  },
  acceptCallBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 10,
  },
  acceptCallIcon: {
    fontSize: 34,
    color: '#FFFFFF',
  },
  acceptCallLabel: {
    color: '#4ADE80',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
    letterSpacing: 0.4,
  },
  footerNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerNoteText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '500',
  },
  debugCallId: {
    color: '#475569',
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
});
