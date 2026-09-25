import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/styles';
import { scale } from '../../utils/responsive';
import { HunarGoLogo, OnboardingBg } from '../../utils/assets';
import { workerApi } from '../../api/workerApi';

interface Props {
  onBack: () => void;
  onFinish: () => void;
  userRole?: string;
}

const LOCATION_DATABASE = [
  { city: 'Dehradun', name: 'Rajpur Road, Dehradun' },
  { city: 'Dehradun', name: 'Clock Tower, Dehradun' },
  { city: 'Dehradun', name: 'Clement Town, Dehradun' },
  { city: 'Dehradun', name: 'Vasant Vihar, Dehradun' },
  { city: 'Dehradun', name: 'Prem Nagar, Dehradun' },
  { city: 'Zirakpur', name: 'VIP Road, Zirakpur' },
  { city: 'Zirakpur', name: 'Baltana, Zirakpur' },
  { city: 'Chandigarh', name: 'Sector 17, Chandigarh' },
  { city: 'Chandigarh', name: 'Sector 35, Chandigarh' },
  { city: 'Mohali', name: 'Phase 3B2, Mohali' },
  { city: 'Delhi', name: 'Connaught Place, New Delhi' },
  { city: 'Noida', name: 'Sector 18, Noida' },
  { city: 'Gurugram', name: 'Cyber City, Gurugram' },
];

export const SelectLocationDistanceScreen: React.FC<Props> = ({
  onBack,
  onFinish,
  userRole = 'worker',
}) => {
  const [locationText, setLocationText] = useState('Connaught Place, New Delhi');
  const [distanceKm, setDistanceKm] = useState(15);
  const [isLocating, setIsLocating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const presetDistances = [5, 10, 15, 25, 50, 75];

  const getFilteredSuggestions = () => {
    const query = (locationText || '').trim().toLowerCase();
    if (!query) return LOCATION_DATABASE.slice(0, 6);

    let matches = LOCATION_DATABASE.filter(
      (item) =>
        item.name.toLowerCase().includes(query) || item.city.toLowerCase().includes(query)
    );

    if (matches.length < 3 && query.length >= 2) {
      const capitalized = locationText.trim().charAt(0).toUpperCase() + locationText.trim().slice(1);
      const customAdditions = [
        { city: capitalized, name: `${capitalized} Center Point` },
        { city: capitalized, name: `${capitalized} Main Market` },
      ];
      matches = [...matches, ...customAdditions];
    }
    return matches.slice(0, 8);
  };

  const suggestions = getFilteredSuggestions();

  const handleCurrentLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setLocationText('Current GPS Location (Delhi NCR)');
      setIsLocating(false);
      setShowSuggestions(false);
    }, 800);
  };

  const handleFinish = async () => {
    try {
      setIsSaving(true);
      await workerApi.updateLocationAndDistance({
        address: locationText,
        city: locationText.split(',').pop()?.trim() || 'New Delhi',
        pincode: '',
        maxDistanceKm: distanceKm,
      });
      onFinish();
    } catch (err) {
      console.error('Failed to update location:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ImageBackground source={OnboardingBg} style={styles.bgImage} resizeMode="cover">
      <SafeAreaView style={styles.onboardingContainer}>
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

        <View style={[styles.textSectionLogin, { marginTop: 4, marginBottom: 6 }]}>
          <Text style={styles.titleLine1}>
            {userRole === 'customer' ? 'Your Current Location' : 'Location & Service Radius'}
          </Text>
          <Text style={styles.descriptionText2}>
            {userRole === 'customer'
              ? 'Enter or select your location to find skilled workers nearby.'
              : "Select your center work location and how far you're willing to travel for jobs."}
          </Text>
        </View>

        <ScrollView
          style={{ flex: 1, width: '100%' }}
          scrollEnabled={userRole === 'customer'}
          contentContainerStyle={styles.locationScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.locationSectionCard}>
            <Text style={styles.locationSectionLabel}>
              {userRole === 'customer' ? '📍 Your Current Location' : '📍 Primary Work Location (Center Point)'}
            </Text>
            <View style={styles.locationInputBox}>
              <Text style={styles.locationPinIcon}>📍</Text>
              <TextInput
                style={styles.locationTextInput}
                placeholder="Enter city, area or landmark..."
                placeholderTextColor="#94A3B8"
                value={locationText}
                onFocus={() => setShowSuggestions(true)}
                onChangeText={(text) => {
                  setLocationText(text);
                  setShowSuggestions(true);
                }}
              />
              {locationText.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setLocationText('');
                    setShowSuggestions(true);
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.clearIcon}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {showSuggestions && suggestions.length > 0 && (
              <View style={styles.suggestionsDropdown}>
                {suggestions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionRow}
                    onPress={() => {
                      setLocationText(item.name);
                      setShowSuggestions(false);
                      Keyboard.dismiss();
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.suggestionPinIcon}>📍</Text>
                    <Text style={styles.suggestionText} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <View style={styles.cityBadge}>
                      <Text style={styles.cityBadgeText}>{item.city}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.useGpsButton}
              onPress={handleCurrentLocation}
              activeOpacity={0.8}
            >
              <Text style={styles.useGpsIcon}>{isLocating ? '⏳' : '🎯'}</Text>
              <Text style={styles.useGpsText}>
                {isLocating ? 'Locating your GPS position...' : 'Use My Current GPS Location'}
              </Text>
            </TouchableOpacity>
          </View>

          {userRole !== 'customer' && (
            <View style={styles.locationSectionCard}>
              <View style={styles.distanceHeaderRow}>
                <Text style={styles.locationSectionLabel}>📐 Distance Range (Radius)</Text>
                <View style={styles.distanceMetricBadge}>
                  <Text style={styles.distanceMetricText}>{distanceKm} km</Text>
                </View>
              </View>
              <Text style={styles.distanceHelperText}>
                You will receive customer job alerts within a{' '}
                <Text style={styles.boldDistanceText}>{distanceKm} km</Text> radius around your center
                location.
              </Text>

              <View style={styles.presetPillRow}>
                {presetDistances.map((km) => {
                  const isSelected = distanceKm === km;
                  return (
                    <TouchableOpacity
                      key={km}
                      style={[styles.distancePill, isSelected && styles.distancePillSelected]}
                      onPress={() => setDistanceKm(km)}
                      activeOpacity={0.75}
                    >
                      <Text
                        style={[
                          styles.distancePillText,
                          isSelected && styles.distancePillTextSelected,
                        ]}
                      >
                        {km} km
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.stepperRow}>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => setDistanceKm((prev) => Math.max(1, prev - 1))}
                  activeOpacity={0.7}
                >
                  <Text style={styles.stepperBtnText}>−</Text>
                </TouchableOpacity>
                <View style={styles.stepperValueContainer}>
                  <Text style={styles.stepperValueText}>{distanceKm} Kilometers Radius</Text>
                </View>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => setDistanceKm((prev) => Math.min(100, prev + 1))}
                  activeOpacity={0.7}
                >
                  <Text style={styles.stepperBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {userRole !== 'customer' && (
            <View style={styles.mapRadarCard}>
              <View style={styles.radarIconCircle}>
                <Text style={styles.radarEmoji}>📡</Text>
              </View>
              <View style={styles.radarTextGroup}>
                <Text style={styles.radarTitle}>Active Coverage Radar</Text>
                <Text style={styles.radarSubtitle}>
                  Estimated{' '}
                  <Text style={styles.radarHighlight}>~850+ active customer requests</Text>{' '}
                  available within {distanceKm} km.
                </Text>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.nextButton,
              { marginTop: scale(10), marginBottom: scale(16) },
              isSaving && styles.disabledButton,
            ]}
            onPress={handleFinish}
            disabled={isSaving}
            activeOpacity={0.85}
          >
            <Text style={styles.nextButtonText}>
              {isSaving
                ? 'Saving...'
                : userRole === 'customer'
                ? 'Complete Profile  ➔'
                : 'Next  ➔'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
