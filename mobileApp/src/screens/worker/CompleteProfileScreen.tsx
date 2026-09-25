import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
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
import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from '../../styles/styles';
import { scale } from '../../utils/responsive';
import { HunarGoLogo, OnboardingBg, DefaultAvatar } from '../../utils/assets';
import { workerApi } from '../../api/workerApi';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export const CompleteProfileScreen: React.FC<Props> = ({ onBack, onNext }) => {
  const [hasProfileImage, setHasProfileImage] = useState(false);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const scrollViewRef = useRef<any>(null);

  // Toast animation state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const slideAnim = useRef(new Animated.Value(200)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<any>(null);

  const scrollBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
        setTimeout(scrollBottom, 50);
        setTimeout(scrollBottom, 200);
        setTimeout(scrollBottom, 400);
      }
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
        setIsInputFocused(false);
      }
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const triggerToast = (message: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToastMessage(message);
    slideAnim.setValue(200);
    opacityAnim.setValue(0);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    timeoutRef.current = setTimeout(() => {
      dismissToast();
    }, 3500);
  };

  const dismissToast = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 200,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToastMessage(null);
    });
  };

  const openGallery = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });
      if (
        response &&
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0 &&
        response.assets[0].uri
      ) {
        setProfileImageUri(response.assets[0].uri);
        setHasProfileImage(true);
        setImageError(false);
      }
    } catch (e) {
      console.warn('Native image picker fallback:', e);
      setProfileImageUri(
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
      );
      setHasProfileImage(true);
      setImageError(false);
    }
  };

  const handleNext = async () => {
    setImageError(false);
    setNameError(false);
    if (!fullName.trim()) {
      setNameError(true);
      triggerToast('Please fill your full name.');
      return;
    }
    try {
      setIsSaving(true);
      await workerApi.updateProfile({
        fullName,
        gender: '',
        dob: '',
        profileImageUri,
      });
      onNext();
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ImageBackground source={OnboardingBg} style={styles.bgImage} resizeMode="cover">
      <SafeAreaView style={styles.onboardingContainer}>
        {toastMessage && (
          <Animated.View
            style={[
              styles.toastContainer,
              {
                opacity: opacityAnim,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <View style={styles.toastContent}>
              <Text style={styles.toastIcon}>⚠️</Text>
              <Text style={styles.toastText}>{toastMessage}</Text>
              <TouchableOpacity
                onPress={dismissToast}
                style={styles.toastCloseBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.toastCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        <View style={styles.topBarCentered}>
          <Image source={HunarGoLogo} style={styles.topLogoCompact} resizeMode="contain" />
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1, width: '100%' }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={[
              styles.profileContent,
              (isKeyboardVisible || isInputFocused) && { paddingBottom: 280 },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.textSectionLogin, { marginBottom: 2 }]}>
              <Text style={styles.titleLine1}>Complete Your Profile</Text>
              <Text style={styles.descriptionText2}>
                Help us get you verified and connect you with more customers.
              </Text>
            </View>

            <View style={[styles.sectionContainer, { marginTop: 4 }]}>
              <Text style={styles.inputLabel}>
                Profile Image <Text style={styles.optionalText}>(Optional)</Text>
              </Text>
              <View style={styles.profileImageRow}>
                <View style={[styles.avatarWrapper, imageError && styles.inputCardError]}>
                  {hasProfileImage ? (
                    <Image
                      source={profileImageUri ? { uri: profileImageUri } : DefaultAvatar}
                      style={styles.avatarImage}
                    />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.placeholderIcon}>👤</Text>
                      <Text style={styles.placeholderText}>No Image</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.cameraBadge}
                    activeOpacity={0.8}
                    onPress={() => {
                      openGallery();
                      setImageError(false);
                    }}
                  >
                    <Text style={styles.cameraBadgeIcon}>📷</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[
                    styles.uploadCard,
                    hasProfileImage && styles.uploadCardUploaded,
                    imageError && styles.inputCardError,
                  ]}
                  activeOpacity={0.85}
                  onPress={() => {
                    openGallery();
                    setImageError(false);
                  }}
                >
                  <View style={styles.uploadIconCircle}>
                    <Text style={styles.uploadIconText}>{hasProfileImage ? '✓' : '📷'}</Text>
                  </View>
                  <View style={styles.uploadTextContainer}>
                    <Text style={styles.uploadTitle}>
                      {hasProfileImage ? 'Photo Uploaded!' : 'Upload your photo'}
                    </Text>
                    <Text style={styles.uploadSubtitle}>
                      {hasProfileImage
                        ? 'Tap to choose another photo'
                        : 'Choose photo directly from phone gallery'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.inputLabel}>
                Full Name <Text style={styles.requiredStar}>*</Text>
              </Text>
              <View style={[styles.formInputCard, nameError && styles.inputCardError]}>
                <Text style={styles.fieldIcon}>👤</Text>
                <TextInput
                  style={styles.formTextInput}
                  placeholder="Enter full name"
                  placeholderTextColor="#94A3B8"
                  value={fullName}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  onChangeText={(text) => {
                    setFullName(text);
                    if (text.trim()) setNameError(false);
                  }}
                />
                {fullName.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setFullName('')}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.clearIcon}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.inputLabel}>
                Email Address <Text style={styles.optionalText}>(Optional)</Text>
              </Text>
              <View style={styles.formInputCard}>
                <Text style={styles.fieldIcon}>✉️</Text>
                <TextInput
                  style={styles.formTextInput}
                  placeholder="Enter email address"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onFocus={() => {
                    setIsInputFocused(true);
                    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 150);
                  }}
                  onBlur={() => setIsInputFocused(false)}
                  onChangeText={setEmail}
                />
                {email.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setEmail('')}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.clearIcon}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.inputLabel}>
                Aadhaar Card Number <Text style={styles.optionalText}>(Optional)</Text>
              </Text>
              <View style={styles.formInputCard}>
                <Text style={styles.fieldIcon}>🪪</Text>
                <TextInput
                  style={styles.formTextInput}
                  placeholder="Enter 12 digit Aadhaar number"
                  placeholderTextColor="#94A3B8"
                  keyboardType="number-pad"
                  maxLength={12}
                  value={aadhaar}
                  onFocus={() => {
                    setIsInputFocused(true);
                    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 150);
                  }}
                  onBlur={() => setIsInputFocused(false)}
                  onChangeText={(text) => setAadhaar(text.replace(/[^0-9]/g, ''))}
                />
                {aadhaar.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setAadhaar('')}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.clearIcon}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.securityCard}>
              <View style={styles.securityIconBox}>
                <Text style={styles.securityEmoji}>🛡️</Text>
              </View>
              <View style={styles.securityTextContainer}>
                <Text style={styles.securityTitle}>Your information is safe and secure.</Text>
                <Text style={styles.securitySubtitle}>
                  We use this only for verification and to build trust with our customers.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.nextButton, { marginTop: scale(4), marginBottom: 10 }, isSaving && styles.disabledButton]}
              onPress={handleNext}
              disabled={isSaving}
              activeOpacity={0.85}
            >
              <Text style={styles.nextButtonText}>
                {isSaving ? 'Saving...' : 'Next  ➔'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};
