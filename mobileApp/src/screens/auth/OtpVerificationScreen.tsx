import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/styles';
import { HunarGoLogo, OnboardingBg } from '../../utils/assets';
import { authApi } from '../../api/authApi';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
  phoneNumber: string;
  userRole?: string;
  onBack: () => void;
  onVerify: (otpString: string, isProfileComplete?: boolean, actualRole?: string) => void;
}

export const OtpVerificationScreen: React.FC<Props> = ({ phoneNumber, onBack, onVerify, userRole = 'customer' }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef<any[]>([]);
  const scrollViewRef = useRef<any>(null);
  const toastAnim = useRef(new Animated.Value(350)).current;

  const scrollBottom = () => {
    if (scrollViewRef.current && scrollViewRef.current.scrollToEnd) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toastAnim.setValue(350);
      Animated.spring(toastAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }).start();

      const timerId = setTimeout(() => {
        Animated.timing(toastAnim, {
          toValue: 350,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setErrorMessage(''));
      }, 4500);

      return () => clearTimeout(timerId);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setTimeout(scrollBottom, 50);
        setTimeout(scrollBottom, 150);
        setTimeout(scrollBottom, 300);
      }
    );
    return () => {
      showSub.remove();
    };
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    if (errorMessage) {
      Animated.timing(toastAnim, {
        toValue: 350,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setErrorMessage(''));
    }
    const sanitized = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    if (sanitized.length > 1) {
      const pasted = sanitized.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pasted[i] || '';
      }
      setOtp(newOtp);
      const lastFilled = Math.min(pasted.length - 1, 5);
      inputRefs.current[lastFilled]?.focus();
      setTimeout(scrollBottom, 50);
      return;
    }
    newOtp[index] = sanitized;
    setOtp(newOtp);
    if (sanitized && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    setTimeout(scrollBottom, 50);
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const clearOtpAndFocus = () => {
    setOtp(['', '', '', '', '', '']);
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  };

  const handleVerify = async () => {
    if (!isOtpComplete || isSubmitting) return;
    const otpString = otp.join('');
    setErrorMessage('');
    try {
      setIsSubmitting(true);
      const targetRole = userRole || 'customer';
      const res = await authApi.verifyOtp({ phoneNumber, otp: otpString, role: targetRole });
      console.log('OTP Verification Response:', res);
      if (res && res.success) {
        const actualRole = res.user?.role || targetRole;
        const isComplete = Boolean(
          res.isProfileComplete ||
          (res.user && res.user.fullName && res.user.fullName.trim().length > 0 && (actualRole === 'customer' || (res.user.professions && res.user.professions.length > 0)))
        );
        onVerify(otpString, isComplete, actualRole);
      } else {
        const msg = res?.message || 'OTP is not correct. Please enter the valid code.';
        setErrorMessage(msg);
        clearOtpAndFocus();
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      setErrorMessage('Network error while verifying OTP.');
      clearOtpAndFocus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedPhone =
    phoneNumber && phoneNumber.length === 10
      ? `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`
      : '+91 98765 43210';
  const isOtpComplete = otp.every((digit) => digit.length === 1);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `(${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')})`;
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    setErrorMessage('');
    try {
      setTimer(45);
      await authApi.sendOtp({ phoneNumber, role: 'worker' });
    } catch (err) {
      console.error('Resend OTP Error:', err);
    }
  };

  return (
    <ImageBackground source={OnboardingBg} style={styles.bgImage} resizeMode="cover">
      <SafeAreaView style={styles.onboardingContainer}>
        {!!errorMessage && (
          <Animated.View
            style={{
              position: 'absolute',
              top: Platform.OS === 'ios' ? 70 : 60,
              left: 16,
              right: 16,
              transform: [{ translateX: toastAnim }],
              zIndex: 999999,
              elevation: 20,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setErrorMessage('')}
              style={{
                backgroundColor: '#FEE2E2',
                borderRadius: 14,
                paddingVertical: 12,
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#EF4444',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 8,
                borderWidth: 1.5,
                borderColor: '#FCA5A5',
              }}
            >
              <Text style={{ fontSize: 18, marginRight: 10 }}>⚠️</Text>

              <Text style={{ flex: 1, color: '#991B1B', fontSize: 13, fontWeight: '700', lineHeight: 18, marginRight: 8 }}>
                {errorMessage}
              </Text>

              <TouchableOpacity
                onPress={() => setErrorMessage('')}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Text style={{ color: '#991B1B', fontSize: 16, fontWeight: '800' }}>✕</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>
        )}

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.topBarCentered}>
            <TouchableOpacity
              style={styles.backButtonAbsolute}
              onPress={onBack}
              activeOpacity={0.7}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Text style={styles.backArrowText}>←</Text>
            </TouchableOpacity>
            <Image source={HunarGoLogo} style={styles.topLogoCompact} resizeMode="contain" />
          </View>

          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.otpContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.textSectionLogin}>
              <Text style={styles.titleLine1}>Verify Your</Text>
              <Text style={styles.titleLine2}>Mobile Number</Text>
              <Text style={styles.descriptionText2}>We've sent a 6-digit OTP to</Text>
              <Text style={styles.phoneHighlight}>{formattedPhone}</Text>
              <Text style={styles.descriptionText2}>Please enter the code below to continue.</Text>
            </View>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.otpBox,
                    digit !== '' && styles.otpBoxFilled,
                    isOtpComplete && styles.otpBoxComplete,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => setTimeout(scrollBottom, 50)}
                  selectTextOnFocus
                />
              ))}
            </View>

            <View style={styles.resendContainer}>
              <Text style={styles.resendLabel}>Didn't receive the code? </Text>
              <TouchableOpacity
                disabled={timer > 0}
                onPress={handleResendOtp}
                activeOpacity={0.7}
              >
                <Text style={[styles.resendLink, timer > 0 && styles.resendDisabled]}>
                  {timer > 0 ? `Resend ${formatTimer(timer)}` : 'Resend OTP'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.nextButton, (!isOtpComplete || isSubmitting) && styles.disabledButton]}
              onPress={handleVerify}
              disabled={!isOtpComplete || isSubmitting}
              activeOpacity={0.85}
            >
              <Text style={styles.nextButtonText}>
                {isSubmitting ? 'Verifying...' : 'Verify & Proceed  ➔'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};
