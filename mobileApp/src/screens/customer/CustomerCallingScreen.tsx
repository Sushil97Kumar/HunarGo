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
import { customerApi } from '../../api/customerApi';
import { socketService } from '../../services/socketService';
import { webrtcService, requestAudioPermission } from '../../services/webrtcService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DefaultAvatar = require('../../assets/default_avatar.png');

export interface CallingWorkerData {
  id?: string;
  _id?: string;
  name?: string;
  fullName?: string;
  profession?: string;
  professions?: string[];
  rating?: string | number;
  reviews?: string | number;
  distance?: string;
  distanceText?: string;
  phone?: string;
  phoneNumber?: string;
  avatar?: any;
  profileImage?: string;
}

interface Props {
  visible: boolean;
  worker: CallingWorkerData | null;
  onEndCall: () => void;
}

export const CustomerCallingScreen: React.FC<Props> = ({
  visible,
  worker,
  onEndCall,
}) => {
  // Call State
  const [callStatus, setCallStatus] = useState<'connecting' | 'ringing' | 'connected' | 'ended'>('connecting');
  const [callDuration, setCallDuration] = useState<number>(0);
  const [callId, setCallId] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  // Animated Ripple Waves
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const ring3 = useRef(new Animated.Value(0)).current;
  const pulseBadge = useRef(new Animated.Value(1)).current;
  const endCallAnim = useRef(new Animated.Value(1)).current;

  // Timer Ref
  const timerRef = useRef<any>(null);
  const isEndingRef = useRef<boolean>(false);
  const activeCallIdRef = useRef<string>('');

  // Reset state and initiate call when screen becomes visible
  useEffect(() => {
    if (!visible || !worker) {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
      setCallStatus('connecting');
      setCallId('');
      activeCallIdRef.current = '';
      setIsMuted(false);
      setIsSpeakerOn(true);
      setImageError(false);
      isEndingRef.current = false;
      webrtcService.endCall();
      return;
    }

    isEndingRef.current = false;
    setCallStatus('connecting');
    setCallDuration(0);
    setIsMuted(false);
    setIsSpeakerOn(true);
    setImageError(false);
    activeCallIdRef.current = '';

    // Proactively request and verify audio permissions upfront
    requestAudioPermission().then((granted) => {
      console.log('🎤 [CustomerCallingScreen] Upfront mic permission granted:', granted);
    });

    // Start ripple animations
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
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseBadge, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );

    anim1.start();
    anim2.start();
    anim3.start();
    badgePulse.start();

    // After 1.2s, transition connecting to ringing for natural UX
    const ringingTimer = setTimeout(() => {
      if (!isEndingRef.current) {
        setCallStatus((prev) => (prev === 'connecting' ? 'ringing' : prev));
      }
    }, 1200);

    // Trigger Outgoing Call via API
    const initiateCall = async () => {
      const targetWorkerId = worker._id || worker.id;
      const workerName = worker.name || worker.fullName || 'Worker';

      if (!targetWorkerId) {
        console.warn('⚠️ [CustomerCallingScreen] Worker ID missing for outgoing call.');
        return;
      }

      try {
        const workerPhone = worker.phone || worker.phoneNumber || '';
        console.log(`📞 [CustomerCallingScreen] Placing call to Worker ID: ${targetWorkerId}, Phone: ${workerPhone}`);
        const res = await customerApi.callWorker(targetWorkerId, workerName, workerPhone);

        if (isEndingRef.current) return;

        if (res && res.success && res.callId) {
          activeCallIdRef.current = res.callId;
          setCallId(res.callId);
          // Pre-join signaling room early so all offers and ICE candidates are received seamlessly
          socketService.joinCall(res.callId);
        } else if (res && !res.success) {
          console.warn('⚠️ [CustomerCallingScreen] Worker unreachable or not found:', res.message);
          setCallStatus('ended');
          setTimeout(() => {
            onEndCall();
          }, 1500);
        }
      } catch (err) {
        console.warn('⚠️ [CustomerCallingScreen] Error placing call API:', err);
      }
    };

    initiateCall();

    // Listen for real-time status update from backend socket
    const unsubscribeStatus = socketService.onCallStatusUpdated((payload: any) => {
      console.log('📡 [CustomerCallingScreen] Received status update:', payload);
      if (payload?.status === 'Accepted') {
        setCallStatus('connected');
        // Start duration counter when answered
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setCallDuration((prev) => prev + 1);
        }, 1000);

        // Initiate WebRTC two-way audio streaming to Worker (prioritize real backend workerId)
        const targetWorkerId = payload?.workerId || worker._id || worker.id;
        const currentCallId = payload?.callId || activeCallIdRef.current || callId;
        if (currentCallId && targetWorkerId) {
          console.log(`🎙️ [CustomerCallingScreen] Starting WebRTC caller audio connection to worker: ${targetWorkerId}`);
          webrtcService.startCallAsCaller(currentCallId, targetWorkerId).catch((err) => {
            console.warn('⚠️ [CustomerCallingScreen] WebRTC caller error:', err);
          });
        }
      } else if (payload?.status === 'Cancelled' || payload?.status === 'Declined') {
        setCallStatus('ended');
        webrtcService.endCall();
        setTimeout(() => {
          onEndCall();
        }, 1200);
      }
    });

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(ringingTimer);
      anim1.stop();
      anim2.stop();
      anim3.stop();
      badgePulse.stop();
      if (unsubscribeStatus) unsubscribeStatus();
      webrtcService.endCall();
    };
  }, [visible, worker]);

  // Handle Cut Call / Hang Up
  const handleHangUp = async () => {
    if (isEndingRef.current) return;
    isEndingRef.current = true;

    setCallStatus('ended');
    if (timerRef.current) clearInterval(timerRef.current);
    webrtcService.endCall();

    // Subtle press-down animation on End Call button
    Animated.sequence([
      Animated.timing(endCallAnim, {
        toValue: 0.85,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(endCallAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    // Notify backend if callId is available
    if (callId) {
      try {
        if (typeof customerApi.updateCallStatus === 'function') {
          await customerApi.updateCallStatus(callId, 'Cancelled');
        }
      } catch (e) {
        console.warn('⚠️ Error sending cancel call status:', e);
      }
    }

    // Delay closing slightly so user sees the call cut smoothly
    setTimeout(() => {
      onEndCall();
    }, 450);
  };

  // Format MM:SS duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
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

  if (!visible || !worker) {
    return null;
  }

  const workerName = worker.name || worker.fullName || 'Worker';
  const workerProfession =
    worker.profession ||
    (Array.isArray(worker.professions) && worker.professions.length > 0
      ? worker.professions[0]
      : 'Service Specialist');

  const distanceText = worker.distance || worker.distanceText || '1.2 km away';
  const ratingText = worker.rating ? String(worker.rating) : '4.8';

  // Helper to resolve worker profile photo
  const getWorkerImageSource = () => {
    if (imageError) return DefaultAvatar;
    const img = worker.avatar || worker.profileImage;
    if (!img) return DefaultAvatar;
    if (typeof img === 'number') return img;
    if (typeof img === 'object' && img.uri) return img;
    if (typeof img === 'string') {
      const trimmed = img.trim();
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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      statusBarTranslucent={true}
      onRequestClose={handleHangUp}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" translucent />

        {/* TOP HEADER */}
        <View style={styles.topHeader}>
          <View style={styles.badgePill}>
            <Text style={styles.badgeDot}>🟢</Text>
            <Text style={styles.badgeText}>HunarGo Direct Connect</Text>
          </View>
          <Text style={styles.titleText}>
            {callStatus === 'connected' ? 'In Call' : 'Outgoing Call'}
          </Text>
          <Text style={styles.durationText}>
            {callStatus === 'connected' ? formatDuration(callDuration) : 'Connecting...'}
          </Text>
        </View>

        {/* CENTER CALLER INFO WITH PULSING WAVES & WORKER IMAGE */}
        <View style={styles.centerContainer}>
          <View style={styles.avatarWrapper}>
            {renderRippleRing(ring1)}
            {renderRippleRing(ring2)}
            {renderRippleRing(ring3)}

            <View style={styles.avatarGlowBorder}>
              <Image
                source={getWorkerImageSource()}
                style={styles.avatarImage}
                resizeMode="cover"
                onError={() => setImageError(true)}
              />
            </View>
          </View>

          {/* Worker Identity Details */}
          <View style={styles.callerInfoBox}>
            <Text style={styles.workerNameText} numberOfLines={1}>
              {workerName}
            </Text>
            <View style={styles.professionPill}>
              <Text style={styles.professionText}>{workerProfession}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaBadge}>⭐ {ratingText}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaBadge}>📍 {distanceText}</Text>
            </View>
          </View>

          {/* Dynamic Ringing / Calling / Connected Status Pill */}
          <Animated.View
            style={[
              styles.statusPill,
              callStatus === 'connected' && styles.statusPillConnected,
              callStatus === 'ended' && styles.statusPillEnded,
              { transform: [{ scale: pulseBadge }] },
            ]}
          >
            {callStatus === 'connecting' && (
              <>
                <Text style={styles.statusIcon}>📡</Text>
                <Text style={styles.statusText}>Calling...</Text>
              </>
            )}
            {callStatus === 'ringing' && (
              <>
                <Text style={styles.statusIcon}>📞</Text>
                <Text style={styles.statusText}>Ringing...</Text>
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

        {/* IN-CALL CONTROLS: MUTE, SPEAKER & CALL CUT BUTTON */}
        <View style={styles.bottomSection}>
          {/* Controls Row: Mute & Speaker */}
          <View style={styles.controlsRow}>
            {/* Mute Button */}
            <TouchableOpacity
              style={[styles.controlBtn, isMuted && styles.controlBtnActive]}
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
              style={[styles.controlBtn, isSpeakerOn && styles.controlBtnActive]}
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

          {/* Calling Cut Button (Large Glowing Red End Call Button) */}
          <View style={styles.endCallWrapper}>
            <Animated.View style={{ transform: [{ scale: endCallAnim }] }}>
              <TouchableOpacity
                style={styles.endCallBtn}
                activeOpacity={0.8}
                onPress={handleHangUp}
              >
                <Text style={styles.endCallIcon}>📞</Text>
              </TouchableOpacity>
            </Animated.View>
            <Text style={styles.endCallLabel}>Cut Call</Text>
          </View>

          {/* Security & Info Footer */}
          <View style={styles.footerNoteRow}>
            <Text style={styles.footerNoteText}>
              🔒 HunarGo End-to-End Direct Connection
            </Text>
            {callId ? (
              <Text style={styles.debugCallId}>ID: {callId.slice(-6).toUpperCase()}</Text>
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
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  callerInfoBox: {
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  workerNameText: {
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
  controlBtnActive: {},
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
  endCallWrapper: {
    alignItems: 'center',
    marginBottom: 22,
  },
  endCallBtn: {
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
  endCallIcon: {
    fontSize: 34,
    color: '#FFFFFF',
    transform: [{ rotate: '135deg' }],
  },
  endCallLabel: {
    color: '#F87171',
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
