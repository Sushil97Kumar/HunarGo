import React, { useState, useRef, useEffect } from 'react';
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
import { DEFAULT_MASTER_CATEGORIES, MasterCategory } from '../../utils/professionUtils';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export const SelectProfessionsScreen: React.FC<Props> = ({ onBack, onNext }) => {
  const [selectedProfessions, setSelectedProfessions] = useState(['plumber']);
  const [categories, setCategories] = useState<MasterCategory[]>(DEFAULT_MASTER_CATEGORIES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfessionsData = async () => {
      try {
        const masterRes = await workerApi.getMasterProfessions();
        if (masterRes && masterRes.success && Array.isArray(masterRes.categories) && masterRes.categories.length > 0) {
          setCategories(masterRes.categories);
        }
      } catch (err) {
        console.warn('Could not fetch master professions:', err);
      }

      try {
        const res = await workerApi.getProfessions();
        if (res && res.success && Array.isArray(res.professions) && res.professions.length > 0) {
          setSelectedProfessions(res.professions);
        }
      } catch (err) {
        console.warn('Could not fetch saved professions:', err);
      }
    };
    loadProfessionsData();
  }, []);

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

  const toggleProfession = (id: string) => {
    setSelectedProfessions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        triggerToast('You can select a maximum of 3 professions.');
        return prev;
      }
      return [...prev, id];
    });
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
            {`Select 1 to 3 professions to continue.\n(${selectedProfessions.length}/3 selected)`}
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
                    const isLimitReached = !isSelected && selectedProfessions.length >= 3;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.professionCard,
                          { backgroundColor: item.color },
                          isSelected && styles.professionCardSelected,
                          isLimitReached && { opacity: 0.55 },
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
