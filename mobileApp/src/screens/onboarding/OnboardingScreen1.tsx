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
import { scale } from '../../utils/responsive';
import { HunarGoLogo, HeroIllustration, OnboardingBg } from '../../utils/assets';

interface Props {
  onNext: () => void;
  onSkip: () => void;
}

export const OnboardingScreen1: React.FC<Props> = ({ onNext, onSkip }) => {
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
          contentContainerStyle={styles.onboardingContent}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          <View style={styles.illustrationContainer}>
            <Image source={HeroIllustration} style={styles.onboardingIllustration} resizeMode="contain" />
          </View>

          <View style={styles.textSection}>
            <Text style={styles.titleLine1}>Skilled People,</Text>
            <Text style={styles.titleLine2}>Just Around You</Text>

            <View style={styles.pillRow}>
              <View style={[styles.servicePill, { backgroundColor: '#FFF4E5' }]}>
                <Text style={styles.pillEmoji}>🏠</Text>
                <Text style={styles.servicePillText}>Home Repairs</Text>
              </View>
              <View style={[styles.servicePill, { backgroundColor: '#EBF3FF' }]}>
                <Text style={styles.pillEmoji}>🧹</Text>
                <Text style={styles.servicePillText}>Cleaning</Text>
              </View>
              <View style={[styles.servicePill, { backgroundColor: '#F3EBF6' }]}>
                <Text style={styles.pillEmoji}>💅</Text>
                <Text style={styles.servicePillText}>Beauty</Text>
              </View>
              <View style={[styles.servicePill, { backgroundColor: '#EAF8F6' }]}>
                <Text style={styles.pillEmoji}>💆</Text>
                <Text style={styles.servicePillText}>Body Massage</Text>
              </View>
            </View>

            <Text style={styles.descriptionText}>
              Find <Text style={styles.boldDarkGray}>trusted & verified</Text> workers near your location instantly.
            </Text>
          </View>

          <View style={styles.paginationContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>

          <TouchableOpacity
            style={[styles.nextButton, { marginTop: scale(2), marginBottom: scale(24) }]}
            onPress={onNext}
            activeOpacity={0.85}
          >
            <Text style={styles.nextButtonText}>Next  ➔</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
