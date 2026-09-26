import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/styles';
import { HunarGoLogo, Screen2Illustration, OnboardingBg } from '../../utils/assets';

interface Props {
  onSkip: () => void;
  onFinish: () => void;
  onWorker: () => void;
  onLogin?: () => void;
}

export const OnboardingScreen2: React.FC<Props> = ({ onSkip, onFinish, onWorker, onLogin }) => {
  return (
    <ImageBackground source={OnboardingBg} style={styles.bgImage} resizeMode="cover">
      <SafeAreaView style={styles.onboardingContainer}>
        <View style={styles.topBarCentered}>
          <Image source={HunarGoLogo} style={styles.topLogoCompact} resizeMode="contain" />
          <TouchableOpacity style={styles.skipButtonAbsolute} onPress={onSkip} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.onboardingContent2}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          <View style={styles.textSection2}>
            <Text style={styles.titleLine1}>Skilled Help</Text>
            <Text style={styles.titleLine2}>Near You</Text>
            <Text style={styles.descriptionText2}>
              Find verified workers for your home, vehicle, personal and outdoor needs.
            </Text>
          </View>

          <View style={styles.illustrationContainer2}>
            <Image source={Screen2Illustration} style={styles.onboardingIllustration2} resizeMode="contain" />
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIconBox, { backgroundColor: '#F3E8FF' }]}>
                <Text style={styles.featureEmoji}>🛡️</Text>
              </View>
              <Text style={styles.featureText}>{'Verified\nWorkers'}</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIconBox, { backgroundColor: '#DCFCE7' }]}>
                <Text style={styles.featureEmoji}>📞</Text>
              </View>
              <Text style={styles.featureText}>{'Direct\nCall'}</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIconBox, { backgroundColor: '#FFEDD5' }]}>
                <Text style={styles.featureEmoji}>₹</Text>
              </View>
              <Text style={styles.featureText}>{'Transparent\nRates'}</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIconBox, { backgroundColor: '#E0F2FE' }]}>
                <Text style={styles.featureEmoji}>⚡</Text>
              </View>
              <Text style={styles.featureText}>{'Quick & Easy\nBooking'}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={onFinish} activeOpacity={0.85}>
            <Text style={styles.nextButtonText}>Get Started  ➔</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.workerButton} onPress={onWorker} activeOpacity={0.85}>
            <Text style={styles.workerButtonText}>{"I'm a Worker  ➔"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginContainer} onPress={onLogin || onFinish} activeOpacity={0.7}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink}>Login</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.scriptBadge}>
            <Text style={styles.scriptText}>{'Local People\nStronger Communities\nBetter Lives'}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
