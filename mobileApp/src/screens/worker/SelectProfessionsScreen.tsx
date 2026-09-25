import React, { useState, useRef } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/styles';
import { HunarGoLogo, OnboardingBg } from '../../utils/assets';
import { workerApi } from '../../api/workerApi';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export const SelectProfessionsScreen: React.FC<Props> = ({ onBack, onNext }) => {
  const [selectedProfessions, setSelectedProfessions] = useState(['plumber']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const slideAnim = useRef(new Animated.Value(200)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<any>(null);

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

  const handleFinish = async () => {
    if (selectedProfessions.length === 0) {
      triggerToast('Please select at least 1 profession to continue.');
      return;
    }
    try {
      setIsSaving(true);
      await workerApi.updateProfessions(selectedProfessions);
      onNext();
    } catch (err) {
      console.error('Failed to update professions:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const isAnySelected = selectedProfessions.length > 0;

  const categories = [
    {
      id: 'home_repair',
      title: 'Home Repair',
      icon: '🏠',
      items: [
        { id: 'plumber', title: 'Plumber', icon: '🔧', color: '#EBF3FF' },
        { id: 'electrician', title: 'Electrician', icon: '⚡', color: '#FEF9C3' },
        { id: 'carpenter', title: 'Carpenter', icon: '🔨', color: '#FFEDD5' },
        { id: 'painter', title: 'Painter', icon: '🎨', color: '#FCE7F3' },
        { id: 'mason', title: 'Mason', icon: '🧱', color: '#F3E8FF' },
        { id: 'technician', title: 'Technician', icon: '🧰', color: '#DCFCE7' },
      ],
    },
    {
      id: 'vehicle_services',
      title: 'Vehicle Services',
      icon: '🚗',
      items: [
        { id: 'car_mechanic', title: 'Car Mechanic', icon: '🚗', color: '#E0F2FE' },
        { id: 'bike_mechanic', title: 'Bike Mechanic', icon: '🏍️', color: '#F3E8FF' },
      ],
    },
    {
      id: 'personal_beauty',
      title: 'Personal & Beauty',
      icon: '👩',
      items: [
        { id: 'barber', title: 'Barber', icon: '✂️', color: '#FCE7F3' },
        { id: 'hair_stylist', title: 'Hair Stylist', icon: '💇', color: '#F3E8FF' },
        { id: 'makeup_artist', title: 'Makeup Artist', icon: '💄', color: '#FFE4E6' },
        { id: 'beautician', title: 'Beautician', icon: '💆', color: '#DCFCE7' },
        { id: 'massage', title: 'Massage', icon: '👐', color: '#FFEDD5' },
      ],
    },
    {
      id: 'cleaning',
      title: 'Cleaning',
      icon: '🧹',
      items: [
        { id: 'bathroom_cleaning', title: 'Bathroom\nCleaning', icon: '🚽', color: '#E0F2FE' },
        { id: 'home_cleaning', title: 'Home Cleaning', icon: '🧹', color: '#DCFCE7' },
        { id: 'home_help', title: 'Home Help / Maid', icon: '👩‍🍳', color: '#FEF9C3' },
      ],
    },
    {
      id: 'outdoor_labour',
      title: 'Outdoor & Labour',
      icon: '🍂',
      items: [
        { id: 'gardener', title: 'Gardener', icon: '🌱', color: '#DCFCE7' },
        { id: 'farm_labour', title: 'Farm Labour', icon: '🧑‍🌾', color: '#FEF9C3' },
        { id: 'construction_labour', title: 'Construction\nLabour', icon: '👷', color: '#F3E8FF' },
        { id: 'loading_unloading', title: 'Loading /\nUnloading', icon: '📦', color: '#E0F2FE' },
        { id: 'daily_labour', title: 'Daily Labour', icon: '🧑‍🔧', color: '#FFE4E6' },
      ],
    },
  ];

  const toggleProfession = (id: string) => {
    setSelectedProfessions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
          <Text style={styles.titleLine1}>Select Your Professions</Text>
          <Text style={styles.descriptionText2}>
            {'Select at least 1 profession to continue.\nYou can select multiple.'}
          </Text>
        </View>

        <ScrollView
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={styles.professionsContent}
          showsVerticalScrollIndicator
          bounces
        >
          {categories.map((category) => {
            const selectedCount = category.items.filter((item) =>
              selectedProfessions.includes(item.id)
            ).length;

            return (
              <View key={category.id} style={styles.categoryBlock}>
                <View style={styles.categoryHeaderRow}>
                  <View style={styles.categoryTitleGroup}>
                    <Text style={styles.categoryEmoji}>{category.icon}</Text>
                    <Text style={styles.categoryTitleText}>{category.title}</Text>
                  </View>
                  {selectedCount > 0 && (
                    <View style={styles.countBadge}>
                      <Text style={styles.countBadgeText}>{selectedCount} selected</Text>
                    </View>
                  )}
                </View>

                <View style={styles.professionsGrid}>
                  {category.items.map((item) => {
                    const isSelected = selectedProfessions.includes(item.id);
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.professionCard,
                          { backgroundColor: item.color },
                          isSelected && styles.professionCardSelected,
                        ]}
                        onPress={() => toggleProfession(item.id)}
                        activeOpacity={0.75}
                      >
                        <View style={[styles.checkCircle, isSelected && styles.checkCircleActive]}>
                          {isSelected && <Text style={styles.checkIconText}>✓</Text>}
                        </View>
                        <Text style={styles.professionIcon}>{item.icon}</Text>
                        <Text style={styles.professionCardTitle}>{item.title}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={[styles.fixedBottomContainer, { marginTop: -30, marginBottom: 55 }]}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              (!isAnySelected || isSaving) && styles.disabledButton,
              { marginTop: 0, marginBottom: 0 },
            ]}
            onPress={handleFinish}
            disabled={!isAnySelected || isSaving}
            activeOpacity={0.85}
          >
            <Text style={styles.nextButtonText}>
              {isSaving ? 'Saving...' : 'Finish & Start  ➔'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
