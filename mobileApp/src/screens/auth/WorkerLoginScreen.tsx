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
}

export const WorkerLoginScreen: React.FC<Props> = ({ onBack, onContinue }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isPhoneValid = phoneNumber.trim().length === 10;

  const handleContinue = async () => {
    if (!isPhoneValid || isLoading) return;
    setErrorMessage('');
    try {
      setIsLoading(true);
      const res = await authApi.sendOtp({ phoneNumber: phoneNumber.trim(), role: 'worker' });
      console.log('Worker Login OTP Sent:', res);
      if (res && res.success) {
        onContinue(phoneNumber.trim());
      } else {
        setErrorMessage(res?.message || 'Failed to send OTP. Please try again.');
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

            {errorMessage ? (
              <Text style={{ color: '#EF4444', textAlign: 'center', marginTop: 10, fontSize: 14, fontWeight: '600' }}>
                {errorMessage}
              </Text>
            ) : null}

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

            <TouchableOpacity
              style={styles.loginContainer}
              onPress={handleContinue}
              activeOpacity={0.7}
            >
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginLink}>Login</Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};
