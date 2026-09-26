import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
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
  onBack: () => void;
  onContinue: (phone: string) => void;
  userRole?: string;
  isLoginFlow?: boolean;
  onRedirectToGetStarted?: () => void;
}

export const WorkerLoginScreen: React.FC<Props> = ({
  onBack,
  onContinue,
  userRole = 'customer',
  isLoginFlow = false,
  onRedirectToGetStarted,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(isLoginFlow);
  const toastAnim = useRef(new Animated.Value(350)).current;

  useEffect(() => {
    setIsLoginMode(isLoginFlow);
  }, [isLoginFlow]);

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

  const isPhoneValid = phoneNumber.trim().length === 10;

  const handleContinue = async () => {
    if (!isPhoneValid || isLoading) return;
    setErrorMessage('');
    try {
      setIsLoading(true);
      const targetRole = userRole || 'customer';
      const res = await authApi.sendOtp({
        phoneNumber: phoneNumber.trim(),
        role: targetRole,
        isLogin: isLoginMode,
      });
      console.log('📱 Send OTP Response:', res);
      if (res && res.success) {
        onContinue(phoneNumber.trim());
      } else {
        const msg = res?.message || 'Failed to send OTP. Please try again.';
        setErrorMessage(msg);
      }
    } catch (error) {
      console.error('Failed to send OTP:', error);
      setErrorMessage('Network error while sending OTP.');
    } finally {
      setIsLoading(false);
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
            contentContainerStyle={styles.loginContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.textSectionLogin}>
              <Text style={styles.titleLine1}>Enter Your</Text>
              <Text style={styles.titleLine2}>Mobile Number</Text>
              <Text style={styles.descriptionText2}>
                We'll send you a verification code to continue.
              </Text>
            </View>

            <View style={styles.phoneInputCard}>
              <View style={styles.countrySelector}>
                <Text style={styles.flagEmoji}>🇮🇳</Text>
                <Text style={styles.dropdownArrow}>⌄</Text>
                <Text style={styles.countryCode}>+91</Text>
              </View>
              <View style={styles.verticalDivider} />
              <TextInput
                style={styles.phoneTextInput}
                placeholder="Enter mobile number"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text.replace(/[^0-9]/g, ''));
                  if (errorMessage) setErrorMessage('');
                }}
                maxLength={10}
              />
            </View>



            <TouchableOpacity
              style={[styles.nextButton, (!isPhoneValid || isLoading) && styles.disabledButton]}
              onPress={handleContinue}
              disabled={!isPhoneValid || isLoading}
              activeOpacity={0.85}
            >
              <Text style={styles.nextButtonText}>
                {isLoading ? 'Sending OTP...' : 'Continue  ➔'}
              </Text>
            </TouchableOpacity>

            {!isLoginMode && (
              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => {
                  setErrorMessage('');
                  setIsLoginMode(true);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.loginText}>
                  Already have an account? <Text style={styles.loginLink}>Login</Text>
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};
