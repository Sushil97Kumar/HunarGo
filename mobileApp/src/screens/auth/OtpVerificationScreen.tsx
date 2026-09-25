import React, { useState, useRef, useEffect } from 'react';
import {
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

interface Props {
  phoneNumber: string;
  onBack: () => void;
  onVerify: (otpString: string) => void;
}

export const OtpVerificationScreen: React.FC<Props> = ({ phoneNumber, onBack, onVerify }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<any[]>([]);
  const scrollViewRef = useRef<any>(null);

  const scrollBottom = () => {
    if (scrollViewRef.current && scrollViewRef.current.scrollToEnd) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

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

  const handleVerify = async () => {
    if (!isOtpComplete || isSubmitting) return;
    const otpString = otp.join('');
    try {
      setIsSubmitting(true);
      await authApi.verifyOtp({ phoneNumber, otp: otpString });
      onVerify(otpString);
    } catch (error) {
      console.error('Failed to verify OTP:', error);
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

  return (
    <ImageBackground source={OnboardingBg} style={styles.bgImage} resizeMode="cover">
      <SafeAreaView style={styles.onboardingContainer}>
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
                onPress={() => setTimer(45)}
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
