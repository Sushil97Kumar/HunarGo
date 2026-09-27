import React, { useState, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Modal,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { HunarGoLogo, DefaultAvatar, Screen2Illustration, HeroIllustration, OnboardingBg } from '../../utils/assets';
import { CustomerCallsScreen } from './CustomerCallsScreen';
import { styles } from '../../styles/styles';
import { customerApi } from '../../api/customerApi';

interface Props {
  onBackToOnboarding: () => void;
}

export const CustomerHomeScreen: React.FC<Props> = ({ onBackToOnboarding }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calls' | 'profile' | 'settings' | 'edit_profile'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState('Zirakpur, Punjab');
  const [isLocating, setIsLocating] = useState(false);

  // Edit Customer Profile Form State
  const [editFullName, setEditFullName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editGender, setEditGender] = useState('Male');
  const [editDob, setEditDob] = useState('');
  const [editProfileImage, setEditProfileImage] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Modal state for All Nearest Workers with Pagination
  const [showAllWorkersModal, setShowAllWorkersModal] = useState(false);
  const [allWorkersList, setAllWorkersList] = useState<any[]>([]);
  const [allWorkersLoading, setAllWorkersLoading] = useState(false);
  const [allWorkersPage, setAllWorkersPage] = useState(1);
  const [allWorkersTotalPages, setAllWorkersTotalPages] = useState(1);
  const [allWorkersHasMore, setAllWorkersHasMore] = useState(false);
  const [allWorkersTotal, setAllWorkersTotal] = useState(0);
  const [modalSelectedCategory, setModalSelectedCategory] = useState('All');
  const [modalSearchText, setModalSearchText] = useState('');

  // Modal & Form state for Help & Customer Support
  const [showHelpSupportModal, setShowHelpSupportModal] = useState(false);
  const [helpTitle, setHelpTitle] = useState('');
  const [helpDescription, setHelpDescription] = useState('');
  const [isSubmittingHelp, setIsSubmittingHelp] = useState(false);

  const modalCategoriesFilters = [
    { id: 'All', title: 'All', emoji: '🌟', bg: '#FFF7ED', color: '#C2410C', border: '#FFD8A8' },
    { id: 'Plumber', title: 'Plumber', emoji: '🔧', bg: '#EBF3FF', color: '#1E40AF', border: '#BFDBFE' },
    { id: 'Electrician', title: 'Electrician', emoji: '⚡', bg: '#FEF9C3', color: '#854D0E', border: '#FDE047' },
    { id: 'Carpenter', title: 'Carpenter', emoji: '🔨', bg: '#FFEDD5', color: '#9A3412', border: '#FFC599' },
    { id: 'Painter', title: 'Painter', emoji: '🎨', bg: '#FCE7F3', color: '#9D174D', border: '#F9A8D4' },
    { id: 'Mason', title: 'Mason', emoji: '🧱', bg: '#F3E8FF', color: '#6B21A8', border: '#D8B4FE' },
    { id: 'Technician', title: 'Technician', emoji: '🧰', bg: '#DCFCE7', color: '#166534', border: '#86EFAC' },
    { id: 'AC Repair', title: 'AC Repair', emoji: '❄️', bg: '#CCFBF1', color: '#115E59', border: '#5EEAD4' },
    { id: 'Car Mechanic', title: 'Car Mechanic', emoji: '🚗', bg: '#E0F2FE', color: '#075985', border: '#7DD3FC' },
    { id: 'Bike Mechanic', title: 'Bike Mechanic', emoji: '🏍️', bg: '#F3E8FF', color: '#6B21A8', border: '#D8B4FE' },
    { id: 'Barber', title: 'Barber', emoji: '✂️', bg: '#FCE7F3', color: '#9D174D', border: '#F9A8D4' },
    { id: 'Cleaner', title: 'Cleaner', emoji: '🧹', bg: '#DCFCE7', color: '#166534', border: '#86EFAC' },
    { id: 'Daily Labour', title: 'Daily Labour', emoji: '🧑‍🔧', bg: '#FFE4E6', color: '#9F1239', border: '#FECDD3' },
  ];

  const quickCategories = [
    { id: 'plumber', title: 'Plumber', emoji: '🔧', bg: '#EBF3FF', color: '#1E40AF', border: '#BFDBFE' },
    { id: 'electrician', title: 'Electrician', emoji: '⚡', bg: '#FEF9C3', color: '#854D0E', border: '#FDE047' },
    { id: 'carpenter', title: 'Carpenter', emoji: '🔨', bg: '#FFEDD5', color: '#9A3412', border: '#FFC599' },
    { id: 'painter', title: 'Painter', emoji: '🎨', bg: '#FCE7F3', color: '#9D174D', border: '#F9A8D4' },
    { id: 'mason', title: 'Mason', emoji: '🧱', bg: '#F3E8FF', color: '#6B21A8', border: '#D8B4FE' },
    { id: 'technician', title: 'Technician', emoji: '🧰', bg: '#DCFCE7', color: '#166534', border: '#86EFAC' },
    { id: 'ac_repair', title: 'AC Repair', emoji: '❄️', bg: '#CCFBF1', color: '#115E59', border: '#5EEAD4' },
    { id: 'car_mechanic', title: 'Car Mechanic', emoji: '🚗', bg: '#E0F2FE', color: '#075985', border: '#7DD3FC' },
    { id: 'bike_mechanic', title: 'Bike Mechanic', emoji: '🏍️', bg: '#F3E8FF', color: '#6B21A8', border: '#D8B4FE' },
    { id: 'barber', title: 'Barber', emoji: '✂️', bg: '#FCE7F3', color: '#9D174D', border: '#F9A8D4' },
    { id: 'hair_stylist', title: 'Hair Stylist', emoji: '💇', bg: '#F3E8FF', color: '#6B21A8', border: '#D8B4FE' },
    { id: 'beautician', title: 'Beautician', emoji: '💆', bg: '#DCFCE7', color: '#166534', border: '#86EFAC' },
    { id: 'home_cleaning', title: 'Home Cleaning', emoji: '🧹', bg: '#DCFCE7', color: '#166534', border: '#86EFAC' },
    { id: 'home_help', title: 'Home Help / Maid', emoji: '👩‍🍳', bg: '#FEF9C3', color: '#854D0E', border: '#FDE047' },
    { id: 'gardener', title: 'Gardener', emoji: '🌱', bg: '#DCFCE7', color: '#166534', border: '#86EFAC' },
    { id: 'farm_labour', title: 'Farm Labour', emoji: '🧑‍🌾', bg: '#FEF9C3', color: '#854D0E', border: '#FDE047' },
    { id: 'construction_labour', title: 'Construction Labour', emoji: '👷', bg: '#F3E8FF', color: '#6B21A8', border: '#D8B4FE' },
    { id: 'daily_labour', title: 'Daily Labour', emoji: '🧑‍🔧', bg: '#FFE4E6', color: '#9F1239', border: '#FECDD3' },
  ];

  const loopingCategories = [...quickCategories, ...quickCategories];

  const chipsScrollRef = useRef<ScrollView>(null);
  const chipsScrollX = useRef(0);
  const totalContentWidth = useRef(2400);
  const modalSearchInputRef = useRef<TextInput>(null);

  const [customerProfile, setCustomerProfile] = useState({
    fullName: 'Sushil Kumar',
    phoneNumber: '+91 98765 43210',
    email: 'sushil.kumar@hunargo.com',
    gender: 'Male',
    dob: '15 Aug 1995',
    profileImage: '',
    location: {
      address: 'Zirakpur, Punjab',
      city: 'Zirakpur',
      pincode: '140603',
    },
  });

  useEffect(() => {
    loadCustomerProfile();
  }, [activeTab]);

  const loadCustomerProfile = async () => {
    try {
      const res = await customerApi.getCustomerProfile();
      if (res && res.profile) {
        setCustomerProfile(res.profile);
        if (res.profile.location && res.profile.location.address) {
          setUserLocation(res.profile.location.address);
        }
      }
    } catch (err) {
      console.error('Error fetching customer profile:', err);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      chipsScrollX.current += 1.2;
      if (chipsScrollX.current >= totalContentWidth.current / 2) {
        chipsScrollX.current = 0;
      }
      chipsScrollRef.current?.scrollTo({ x: chipsScrollX.current, animated: false });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const [nearbyWorkers, setNearbyWorkers] = useState<any[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      profession: 'Plumber',
      rating: '4.8',
      reviews: '124',
      distance: '1.2 km away',
      phone: '+919876543210',
      avatar: DefaultAvatar,
    },
  ]);

  useEffect(() => {
    fetchNearbyWorkers();
  }, [searchQuery, userLocation]);

  const fetchNearbyWorkers = async () => {
    try {
      const res = await customerApi.searchWorkers(undefined, searchQuery, 30.6425, 76.8173);
      if (res && Array.isArray(res.workers) && res.workers.length > 0) {
        setNearbyWorkers(res.workers);
      }
    } catch (err) {
      console.error('Error fetching nearby workers:', err);
    }
  };

  const handleCallWorker = (workerId: string) => {
    customerApi.callWorker(workerId);
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'HunarGo GPS Permission Required 📍',
            message: 'HunarGo needs device GPS location to show nearby workers and services in your area.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'Turn ON / Allow',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          Alert.alert(
            'GPS Location Permission Required 📍',
            'Mobile ki Location/GPS ON permission ki zaroorat hai. Kripya phone settings me location permissions allow karein.',
            [{ text: 'OK' }]
          );
          return false;
        }
      } catch (err) {
        console.warn('Location permission error:', err);
        return false;
      }
    }
    return true;
  };

  const handleDetectLocation = async () => {
    setIsLocating(true);
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setIsLocating(false);
      return;
    }

    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const detectedLoc = `Current GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
          setUserLocation(detectedLoc);
          setIsLocating(false);
          fetchNearbyWorkers();
          Alert.alert(
            'Location Updated 📍',
            `Device GPS location active!\nUpdated to: ${detectedLoc}`
          );
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setIsLocating(false);
          Alert.alert(
            'Turn ON Device Location (GPS) 📍',
            'Aapke mobile ki Location (GPS) OFF hai ya detected nahi ho rahi hai. Kripya apne phone ki Location ON karein aur dobara try karein.',
            [
              {
                text: 'Turn ON / Retry',
                onPress: () => handleDetectLocation(),
              },
              {
                text: 'Use Default Location',
                onPress: () => {
                  setUserLocation('Zirakpur, Punjab');
                  fetchNearbyWorkers();
                },
              },
              { text: 'Cancel', style: 'cancel' },
            ]
          );
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
      );
    } else {
      setTimeout(() => {
        setUserLocation('Zirakpur, Punjab (GPS ON)');
        setIsLocating(false);
        fetchNearbyWorkers();
        Alert.alert('Location Updated 📍', 'Your live location has been updated successfully!');
      }, 700);
    }
  };

  const handleSubmitHelpSupport = async () => {
    if (!helpTitle.trim()) {
      Alert.alert('Title Required ⚠️', 'Please enter a title for your support query.');
      return;
    }
    if (!helpDescription.trim()) {
      Alert.alert('Description Required ⚠️', 'Please enter a description of your issue.');
      return;
    }

    setIsSubmittingHelp(true);
    try {
      const res = await customerApi.createHelpTicket({
        title: helpTitle.trim(),
        description: helpDescription.trim(),
      });

      setIsSubmittingHelp(false);
      if (res && res.success) {
        Alert.alert(
          'Support Ticket Created 🎧',
          'Your support ticket has been saved to the database successfully! Our team will get back to you soon.',
          [
            {
              text: 'OK',
              onPress: () => {
                setHelpTitle('');
                setHelpDescription('');
                setShowHelpSupportModal(false);
              },
            },
          ]
        );
      } else {
        Alert.alert('Submission Error ⚠️', res?.message || 'Could not submit support ticket.');
      }
    } catch (err) {
      setIsSubmittingHelp(false);
      Alert.alert('Error ⚠️', 'Something went wrong while submitting support ticket.');
    }
  };

  const handleOpenEditProfile = () => {
    setEditFullName(customerProfile.fullName || '');
    setEditEmail(customerProfile.email || '');
    setEditGender(customerProfile.gender || 'Male');
    setEditDob(customerProfile.dob || '');
    setEditProfileImage(customerProfile.profileImage || '');
    setActiveTab('edit_profile');
  };

  const handlePickProfileImage = () => {
    try {
      const { launchImageLibrary } = require('react-native-image-picker');
      launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response: any) => {
        if (response && response.assets && response.assets.length > 0) {
          setEditProfileImage(response.assets[0].uri);
        }
      });
    } catch (err) {
      console.warn('Image picker error:', err);
    }
  };

  const handleSaveCustomerProfile = async () => {
    if (!editFullName.trim()) {
      Alert.alert('Validation Error ⚠️', 'Please enter your full name.');
      return;
    }

    setIsSavingProfile(true);
    try {
      const res = await customerApi.updateCustomerProfile({
        fullName: editFullName.trim(),
        email: editEmail.trim(),
        gender: editGender,
        dob: editDob.trim(),
        profileImage: editProfileImage,
      });

      setIsSavingProfile(false);
      if (res && res.success) {
        setCustomerProfile((prev) => ({
          ...prev,
          fullName: editFullName.trim(),
          email: editEmail.trim(),
          gender: editGender,
          dob: editDob.trim(),
          profileImage: editProfileImage,
        }));

        Alert.alert(
          'Profile Updated 👤',
          'Your profile details have been saved to the database successfully!',
          [{ text: 'OK', onPress: () => setActiveTab('settings') }]
        );
      } else {
        Alert.alert('Update Failed ⚠️', res?.message || 'Could not update profile.');
      }
    } catch (err) {
      setIsSavingProfile(false);
      Alert.alert('Error ⚠️', 'An error occurred while saving profile.');
    }
  };

  const handleOpenAllWorkersModal = (cat: string = 'All') => {
    setModalSelectedCategory(cat);
    setModalSearchText('');
    setShowAllWorkersModal(true);
    fetchPaginatedWorkers(1, cat, '');
  };

  const handleDashboardSearchChange = (text: string) => {
    setSearchQuery(text);
    setModalSelectedCategory('All');
    setModalSearchText(text);
    setShowAllWorkersModal(true);
    fetchPaginatedWorkers(1, 'All', text);
    setTimeout(() => {
      modalSearchInputRef.current?.focus();
    }, 120);
  };

  const handleDashboardSearchFocus = () => {
    setShowAllWorkersModal(true);
    fetchPaginatedWorkers(1, 'All', searchQuery);
    setTimeout(() => {
      modalSearchInputRef.current?.focus();
    }, 120);
  };

  const fetchPaginatedWorkers = async (page: number, category?: string, query?: string) => {
    setAllWorkersLoading(true);
    try {
      const selectedCat = category !== undefined ? category : modalSelectedCategory;
      const searchQueryText = query !== undefined ? query : modalSearchText;
      const res = await customerApi.searchWorkers(selectedCat, searchQueryText, 30.6425, 76.8173, page, 6);
      if (res && Array.isArray(res.workers)) {
        setAllWorkersList(res.workers);
        if (res.pagination) {
          setAllWorkersPage(res.pagination.page || page);
          setAllWorkersTotalPages(res.pagination.totalPages || 1);
          setAllWorkersHasMore(!!res.pagination.hasMore);
          setAllWorkersTotal(res.pagination.total || res.workers.length);
        } else {
          setAllWorkersPage(page);
          setAllWorkersTotalPages(1);
          setAllWorkersHasMore(false);
          setAllWorkersTotal(res.workers.length);
        }
      }
    } catch (err) {
      console.error('Error fetching paginated workers:', err);
    } finally {
      setAllWorkersLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > allWorkersTotalPages || allWorkersLoading) return;
    fetchPaginatedWorkers(newPage);
  };

  const handleModalCategorySelect = (catTitle: string) => {
    setModalSelectedCategory(catTitle);
    fetchPaginatedWorkers(1, catTitle, modalSearchText);
  };

  const handleModalSearchChange = (text: string) => {
    setModalSearchText(text);
    fetchPaginatedWorkers(1, modalSelectedCategory, text);
  };

  return (
    <ImageBackground source={OnboardingBg} style={localStyles.bgImage} resizeMode="cover">
      <SafeAreaView style={localStyles.dashboardContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

        {/* Top Bar Header (Common for all tabs) */}
        <View style={localStyles.topBar}>
          <View style={{ width: 40 }} />

          <Image source={HunarGoLogo} style={localStyles.logoImage} resizeMode="contain" />

          <TouchableOpacity style={localStyles.topIconButton}>
            <Text style={localStyles.bellIcon}>🔔</Text>
            <View style={localStyles.redBadgeDot} />
          </TouchableOpacity>
        </View>

        {activeTab === 'dashboard' && (
          <View style={localStyles.homeFixedContent}>
            {/* Current GPS Location Card */}
          <TouchableOpacity style={localStyles.locationCard} activeOpacity={0.85} onPress={handleDetectLocation}>
            <View style={localStyles.locationLeft}>
              <View style={localStyles.redPinContainer}>
                <View style={localStyles.redPinHead}>
                  <View style={localStyles.redPinDot} />
                </View>
                <View style={localStyles.redPinTail} />
              </View>
              <Text style={localStyles.locationLabel} numberOfLines={1}>
                Current GPS Location: <Text style={localStyles.locationValue}>{isLocating ? 'Locating...' : userLocation}</Text>
              </Text>
            </View>
            <Text style={localStyles.locationChevron}>›</Text>
          </TouchableOpacity>

          {/* Search Bar */}
          <View style={localStyles.searchRow}>
            <View style={localStyles.searchInputBox}>
              <Text style={localStyles.searchLens}>🔍</Text>
              <TextInput
                style={localStyles.searchTextInput}
                placeholder="Search worker by name or service..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={handleDashboardSearchChange}
                onFocus={handleDashboardSearchFocus}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  style={localStyles.stylishClearBtn}
                  onPress={() => {
                    setSearchQuery('');
                    setModalSearchText('');
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={localStyles.stylishClearText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={localStyles.filterButton}
              activeOpacity={0.85}
              onPress={() => handleOpenAllWorkersModal('All')}
            >
              <View style={localStyles.funnelIconContainer}>
                <View style={[localStyles.funnelLine, { width: 16 }]} />
                <View style={[localStyles.funnelLine, { width: 11 }]} />
                <View style={[localStyles.funnelLine, { width: 6 }]} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Quick Service Pills Chips (Continuous Auto-Moving Ticker) */}
          <ScrollView
            ref={chipsScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0, marginTop: 4, marginBottom: 8 }}
            contentContainerStyle={localStyles.chipsScrollContent}
            onContentSizeChange={(w) => {
              totalContentWidth.current = w;
            }}
          >
            {loopingCategories.map((cat, idx) => (
              <TouchableOpacity
                key={`${cat.id}-${idx}`}
                style={[localStyles.chipPill, { backgroundColor: cat.bg, borderColor: cat.border }]}
                activeOpacity={0.8}
                onPress={() => handleOpenAllWorkersModal(cat.title)}
              >
                <Text style={localStyles.chipEmoji}>{cat.emoji}</Text>
                <Text style={[localStyles.chipText, { color: cat.color }]}>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Browse Services Section */}
          <View style={localStyles.sectionHeaderRow}>
            <Text style={localStyles.sectionTitle}>Browse Services</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleOpenAllWorkersModal('All')}>
              <Text style={localStyles.viewAllLink}>View All ➔</Text>
            </TouchableOpacity>
          </View>

          {/* Category Cards */}
          <View style={localStyles.categoryContainer}>
            {/* Top Row: 3 cards */}
            <View style={localStyles.categoryGridRow}>
              <TouchableOpacity style={[localStyles.categoryCard, { backgroundColor: '#FEF9C3' }]} onPress={() => handleOpenAllWorkersModal('All')}>
                <View style={localStyles.categoryIconWrapper}>
                  <Text style={{ fontSize: 16 }}>🏠</Text>
                </View>
                <Text style={localStyles.categoryCardTitle}>Home Repair</Text>
                <View style={localStyles.categoryChevronBtn}>
                  <Text style={localStyles.categoryChevronText}>❯</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[localStyles.categoryCard, { backgroundColor: '#FEE2E2' }]} onPress={() => handleOpenAllWorkersModal('Car Mechanic')}>
                <View style={localStyles.categoryIconWrapper}>
                  <Text style={{ fontSize: 16 }}>🚗</Text>
                </View>
                <Text style={localStyles.categoryCardTitle}>Vehicle Services</Text>
                <View style={localStyles.categoryChevronBtn}>
                  <Text style={localStyles.categoryChevronText}>❯</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[localStyles.categoryCard, { backgroundColor: '#F3E8FF' }]} onPress={() => handleOpenAllWorkersModal('Barber')}>
                <View style={localStyles.categoryIconWrapper}>
                  <Text style={{ fontSize: 16 }}>💇‍♀️</Text>
                </View>
                <Text style={localStyles.categoryCardTitle}>Personal & Beauty</Text>
                <View style={localStyles.categoryChevronBtn}>
                  <Text style={localStyles.categoryChevronText}>❯</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Bottom Row: 2 cards */}
            <View style={[localStyles.categoryGridRow, { marginTop: 4 }]}>
              <TouchableOpacity style={[localStyles.categoryCardWide, { backgroundColor: '#DCFCE7' }]} onPress={() => handleOpenAllWorkersModal('Cleaner')}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, marginRight: 4 }}>🧹</Text>
                  <Text style={localStyles.categoryCardTitle}>Cleaning</Text>
                </View>
                <View style={localStyles.categoryChevronBtn}>
                  <Text style={localStyles.categoryChevronText}>❯</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[localStyles.categoryCardWide, { backgroundColor: '#F0FDF4' }]} onPress={() => handleOpenAllWorkersModal('Daily Labour')}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, marginRight: 4 }}>🍃</Text>
                  <Text style={localStyles.categoryCardTitle}>Outdoor & Labour</Text>
                </View>
                <View style={localStyles.categoryChevronBtn}>
                  <Text style={localStyles.categoryChevronText}>❯</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Promotional Hero Banner ("Need help at home?") */}
          <View style={localStyles.promoBanner}>
            <View style={localStyles.promoLeft}>
              <Text style={localStyles.promoTitle}>Need help at home?</Text>
              <Text style={localStyles.promoSubtitle}>Find skilled workers near you</Text>
              <TouchableOpacity style={localStyles.promoButton} activeOpacity={0.85} onPress={() => handleOpenAllWorkersModal('All')}>
                <Text style={localStyles.promoButtonText}>Find a Worker ➔</Text>
              </TouchableOpacity>
            </View>
            <Image source={HeroIllustration} style={localStyles.promoImage} resizeMode="contain" />
          </View>

          {/* Popular Services Section */}
          <View style={localStyles.sectionHeaderRow}>
            <Text style={localStyles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleOpenAllWorkersModal('All')}>
              <Text style={localStyles.viewAllLink}>View All ➔</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={localStyles.popularScrollContent}>
            <TouchableOpacity style={localStyles.popularCard} activeOpacity={0.85} onPress={() => handleOpenAllWorkersModal('Plumber')}>
              <View style={localStyles.popularImgBox}>
                <Image source={HeroIllustration} style={localStyles.popularImg} resizeMode="cover" />
                <View style={localStyles.ratingBadgeOverlay}>
                  <Text style={localStyles.ratingBadgeText}>⭐ 4.8</Text>
                </View>
              </View>
              <View style={localStyles.popularCardFooter}>
                <View>
                  <Text style={localStyles.popularCardTitle}>Plumber</Text>
                  <Text style={localStyles.popularCardSub}>Available near you</Text>
                </View>
                <View style={localStyles.miniChevronBtn}>
                  <Text style={localStyles.miniChevronText}>❯</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.popularCard} activeOpacity={0.85} onPress={() => handleOpenAllWorkersModal('Technician')}>
              <View style={localStyles.popularImgBox}>
                <Image source={Screen2Illustration} style={localStyles.popularImg} resizeMode="cover" />
                <View style={localStyles.ratingBadgeOverlay}>
                  <Text style={localStyles.ratingBadgeText}>⭐ 4.9</Text>
                </View>
              </View>
              <View style={localStyles.popularCardFooter}>
                <View>
                  <Text style={localStyles.popularCardTitle}>Technician</Text>
                  <Text style={localStyles.popularCardSub}>Available near you</Text>
                </View>
                <View style={localStyles.miniChevronBtn}>
                  <Text style={localStyles.miniChevronText}>❯</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.popularCard} activeOpacity={0.85} onPress={() => handleOpenAllWorkersModal('Cleaner')}>
              <View style={localStyles.popularImgBox}>
                <Image source={HeroIllustration} style={localStyles.popularImg} resizeMode="cover" />
                <View style={localStyles.ratingBadgeOverlay}>
                  <Text style={localStyles.ratingBadgeText}>⭐ 4.7</Text>
                </View>
              </View>
              <View style={localStyles.popularCardFooter}>
                <View>
                  <Text style={localStyles.popularCardTitle}>Maid</Text>
                  <Text style={localStyles.popularCardSub}>Available near you</Text>
                </View>
                <View style={localStyles.miniChevronBtn}>
                  <Text style={localStyles.miniChevronText}>❯</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>

          {/* Workers Near You Section */}
          <View style={localStyles.sectionHeaderRow}>
            <Text style={localStyles.sectionTitle}>Workers Near You</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleOpenAllWorkersModal('All')}>
              <Text style={localStyles.viewAllLink}>View All ➔</Text>
            </TouchableOpacity>
          </View>

          <View style={localStyles.workersListContainer}>
            {nearbyWorkers.slice(0, 1).map((worker) => (
              <View key={worker.id} style={localStyles.workerCard}>
                <View style={localStyles.workerAvatarWrapper}>
                  <Image
                    source={
                      worker.avatar && typeof worker.avatar === 'string' && worker.avatar.startsWith('http')
                        ? { uri: worker.avatar }
                        : DefaultAvatar
                    }
                    style={localStyles.workerAvatar}
                  />
                  <View style={localStyles.onlineDot} />
                </View>
                <View style={localStyles.workerInfo}>
                  <Text style={localStyles.workerName}>{worker.name || worker.fullName || 'Rajesh Kumar'}</Text>
                  <Text style={localStyles.workerProfession}>
                    {worker.profession || (Array.isArray(worker.professions) ? worker.professions[0] : 'Handyman')}
                  </Text>
                  <View style={localStyles.workerMetaRow}>
                    <Text style={localStyles.workerRating}>
                      ⭐ {worker.rating || '4.8'}{' '}
                      <Text style={localStyles.reviewsText}>({worker.reviews || '124'} reviews)</Text>
                    </Text>
                    <Text style={localStyles.workerDistance}>📍 {worker.distance || worker.distanceText || '1.2 km away'}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={localStyles.callPillBtn}
                  activeOpacity={0.85}
                  onPress={() => handleCallWorker(worker.id)}
                >
                  <Text style={localStyles.callPillText}>📞 Call</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* ALL NEAREST WORKERS MODAL WITH PAGINATION */}
      <Modal
        visible={showAllWorkersModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowAllWorkersModal(false)}
        onShow={() => {
          setTimeout(() => {
            modalSearchInputRef.current?.focus();
          }, 100);
        }}
      >
        <ImageBackground source={OnboardingBg} style={{ flex: 1 }} resizeMode="cover">
          <SafeAreaView style={localStyles.modalSafeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

            {/* Top Bar Header with HunarGo Logo & Notification Bell (Same dimensions as Customer Dashboard) */}
            <View style={localStyles.topBar}>
              <TouchableOpacity
                style={styles.subScreenBackButton}
                onPress={() => setShowAllWorkersModal(false)}
                activeOpacity={0.7}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <Text style={styles.subScreenBackArrowIcon}>←</Text>
              </TouchableOpacity>

              <Image source={HunarGoLogo} style={localStyles.logoImage} resizeMode="contain" />

              <TouchableOpacity style={localStyles.topIconButton} activeOpacity={0.8}>
                <Text style={localStyles.bellIcon}>🔔</Text>
                <View style={localStyles.redBadgeDot} />
              </TouchableOpacity>
            </View>

            {/* Sub-Header Banner with Title & Location */}
            <View style={localStyles.modalSubHeaderRow}>
              <Text style={localStyles.modalHeaderTitle}>Nearest Workers</Text>
              <Text style={localStyles.modalHeaderSub}>
                📍 {userLocation} • <Text style={{ color: '#FF5436', fontWeight: '700' }}>{allWorkersTotal} Available</Text>
              </Text>
            </View>

            {/* Stylish Modern Search Bar */}
            <View style={localStyles.modalSearchContainer}>
              <View style={localStyles.stylishSearchBox}>
                <Text style={localStyles.stylishSearchLens}>🔍</Text>
                <TextInput
                  ref={modalSearchInputRef}
                  style={localStyles.stylishSearchInput}
                  placeholder="Search worker by name or service..."
                  placeholderTextColor="#94A3B8"
                  value={modalSearchText}
                  onChangeText={handleModalSearchChange}
                />
                {modalSearchText.length > 0 && (
                  <TouchableOpacity
                    style={localStyles.stylishClearBtn}
                    onPress={() => handleModalSearchChange('')}
                    activeOpacity={0.7}
                  >
                    <Text style={localStyles.stylishClearText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Category Filter Chips Carousel */}
            <View style={localStyles.modalCategoryWrapper}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
                {modalCategoriesFilters.map((cat) => {
                  const isActive = modalSelectedCategory === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        localStyles.modalStylishChip,
                        { backgroundColor: isActive ? '#FF5436' : cat.bg, borderColor: isActive ? '#FF5436' : cat.border },
                        isActive && localStyles.modalChipActiveGlow
                      ]}
                      onPress={() => handleModalCategorySelect(cat.id)}
                      activeOpacity={0.8}
                    >
                      <Text style={localStyles.modalChipEmoji}>{cat.emoji}</Text>
                      <Text style={[
                        localStyles.modalChipTitle,
                        { color: isActive ? '#FFFFFF' : cat.color },
                        isActive && { fontWeight: '800' }
                      ]}>
                        {cat.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Worker List / Loading / Empty State */}
            {allWorkersLoading ? (
              <View style={localStyles.loadingCenterState}>
                <ActivityIndicator size="large" color="#FF5436" />
                <Text style={{ marginTop: 12, fontSize: 14, color: '#64748B', fontWeight: '600' }}>
                  Searching nearest workers around {userLocation}...
                </Text>
              </View>
            ) : allWorkersList.length === 0 ? (
              <View style={localStyles.emptyCenterState}>
                <Text style={{ fontSize: 44, marginBottom: 12 }}>🔍</Text>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 6 }}>
                  No Workers Found
                </Text>
                <Text style={{ fontSize: 14, color: '#64748B', textAlign: 'center', paddingHorizontal: 32 }}>
                  We couldn't find any active workers matching "{modalSelectedCategory !== 'All' ? modalSelectedCategory : modalSearchText}" near {userLocation}.
                </Text>
              </View>
            ) : (
              <ScrollView contentContainerStyle={localStyles.modalListScrollContent} showsVerticalScrollIndicator={false}>
                {allWorkersList.map((worker) => (
                  <View key={worker.id} style={localStyles.modalWorkerCard}>
                    <View style={localStyles.modalWorkerLeft}>
                      <View style={localStyles.modalAvatarBox}>
                        <Image
                          source={
                            worker.avatar && typeof worker.avatar === 'string' && worker.avatar.startsWith('http')
                              ? { uri: worker.avatar }
                              : DefaultAvatar
                          }
                          style={localStyles.modalAvatarImg}
                        />
                      </View>
                      <View style={localStyles.modalWorkerInfo}>
                        <Text style={localStyles.modalWorkerName}>{worker.name || worker.fullName || 'Worker'}</Text>
                        <View style={localStyles.modalDistanceRow}>
                          <Text style={localStyles.modalPinEmoji}>📍</Text>
                          <Text style={localStyles.modalDistanceText}>{worker.distance || worker.distanceText || '1.2 km away'}</Text>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={localStyles.modalCallBtn}
                      activeOpacity={0.85}
                      onPress={() => handleCallWorker(worker.id)}
                    >
                      <Text style={localStyles.modalCallBtnText}>📞 Call Back</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Bottom Pagination Controller Bar matching screenshot */}
                <View style={localStyles.paginationInlineRow}>
                  <TouchableOpacity
                    style={[
                      localStyles.pageBtnPrev,
                      (allWorkersPage <= 1 || allWorkersLoading) && localStyles.pageBtnDisabled
                    ]}
                    disabled={allWorkersPage <= 1 || allWorkersLoading}
                    onPress={() => handlePageChange(allWorkersPage - 1)}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      localStyles.pageBtnPrevText,
                      (allWorkersPage <= 1 || allWorkersLoading) && localStyles.pageBtnTextDisabled
                    ]}>
                      ◄ Prev
                    </Text>
                  </TouchableOpacity>

                  <View style={localStyles.pageBadgeCenter}>
                    <Text style={localStyles.pageBadgeText}>
                      Page {allWorkersPage} of {allWorkersTotalPages}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      localStyles.pageBtnNext,
                      (allWorkersPage >= allWorkersTotalPages || allWorkersLoading) && localStyles.pageBtnDisabled
                    ]}
                    disabled={allWorkersPage >= allWorkersTotalPages || allWorkersLoading}
                    onPress={() => handlePageChange(allWorkersPage + 1)}
                    activeOpacity={0.8}
                  >
                    <Text style={localStyles.pageBtnNextText}>
                      Next ►
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}

            {/* Customer Dashboard Footer Navigation Bar */}
            <View style={styles.bottomTabBarContainer}>
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => {
                  setShowAllWorkersModal(false);
                  setActiveTab('dashboard');
                }}
                activeOpacity={0.75}
              >
                <Text style={[styles.tabIcon, styles.tabIconActive]}>🏠</Text>
                <Text style={[styles.tabLabel, styles.tabLabelActive]}>Dashboard</Text>
                <View style={styles.activeTabIndicator} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => {
                  setShowAllWorkersModal(false);
                  setActiveTab('calls');
                }}
                activeOpacity={0.75}
              >
                <Text style={styles.tabIcon}>📞</Text>
                <Text style={styles.tabLabel}>Calls</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => {
                  setShowAllWorkersModal(false);
                  setActiveTab('profile');
                }}
                activeOpacity={0.75}
              >
                <Text style={styles.tabIcon}>👤</Text>
                <Text style={styles.tabLabel}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => {
                  setShowAllWorkersModal(false);
                  setActiveTab('settings');
                }}
                activeOpacity={0.75}
              >
                <Text style={styles.tabIcon}>⚙️</Text>
                <Text style={styles.tabLabel}>Settings</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </Modal>

      {/* Customer Calls History */}
      {activeTab === 'calls' && <CustomerCallsScreen />}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 10, paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
          {/* Main Profile Header Card */}
          <View style={localStyles.profileHeaderCard}>
            <View style={localStyles.profileAvatarWrapper}>
              <Image
                source={customerProfile.profileImage ? { uri: customerProfile.profileImage } : DefaultAvatar}
                style={localStyles.profileAvatarImage}
              />
              <TouchableOpacity style={localStyles.avatarCameraBadge} activeOpacity={0.8}>
                <Text style={{ fontSize: 11 }}>📷</Text>
              </TouchableOpacity>
            </View>
            <View style={localStyles.profileHeaderInfo}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={localStyles.profileHeaderName}>{customerProfile.fullName || 'Sushil Kumar'}</Text>
                <View style={localStyles.verifiedBadgeCircle}>
                  <Text style={{ fontSize: 10, color: '#FFFFFF', fontWeight: '800' }}>✓</Text>
                </View>
              </View>
              <Text style={localStyles.profileHeaderSub}>{customerProfile.phoneNumber || '+91 98765 43210'}</Text>
              <Text style={localStyles.profileHeaderEmail}>{customerProfile.email || 'sushil.kumar@hunargo.com'}</Text>
              <View style={localStyles.customerRoleTag}>
                <Text style={localStyles.customerRoleTagText}>👤 Verified Customer</Text>
              </View>
            </View>
          </View>

          {/* Quick Stats Summary Bar */}
          <View style={localStyles.profileStatsRow}>
            <View style={localStyles.profileStatBox}>
              <Text style={localStyles.profileStatValue}>12</Text>
              <Text style={localStyles.profileStatLabel}>Calls Made</Text>
            </View>
            <View style={localStyles.statDivider} />
            <View style={localStyles.profileStatBox}>
              <Text style={localStyles.profileStatValue}>8</Text>
              <Text style={localStyles.profileStatLabel}>Jobs Done</Text>
            </View>
            <View style={localStyles.statDivider} />
            <View style={localStyles.profileStatBox}>
              <Text style={localStyles.profileStatValue}>4.9 ⭐</Text>
              <Text style={localStyles.profileStatLabel}>Rating</Text>
            </View>
          </View>

          {/* Account Details Card */}
          <View style={localStyles.profileSectionCard}>
            <Text style={localStyles.cardSectionHeaderTitle}>Personal & Address Details</Text>
            <View style={localStyles.detailItemRow}>
              <Text style={localStyles.detailIcon}>📍</Text>
              <View style={localStyles.detailTextGroup}>
                <Text style={localStyles.detailLabel}>Location / Address</Text>
                <Text style={localStyles.detailValue}>
                  {customerProfile.location?.address || userLocation} (Pincode: {customerProfile.location?.pincode || '140603'})
                </Text>
              </View>
            </View>
          </View>

          {/* Account Actions */}
          <View style={localStyles.profileSectionCard}>
            <Text style={localStyles.cardSectionHeaderTitle}>Account Actions</Text>

            <TouchableOpacity style={localStyles.actionRowItem} activeOpacity={0.7} onPress={() => setActiveTab('calls')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[localStyles.actionIconCircle, { backgroundColor: '#E0F2FE' }]}>
                  <Text style={{ fontSize: 16 }}>📞</Text>
                </View>
                <Text style={localStyles.actionItemText}>Call History & Saved Workers</Text>
              </View>
              <Text style={localStyles.actionChevron}>❯</Text>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.actionRowItem} activeOpacity={0.7} onPress={() => handleDetectLocation()}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[localStyles.actionIconCircle, { backgroundColor: '#FFEDD5' }]}>
                  <Text style={{ fontSize: 16 }}>📍</Text>
                </View>
                <Text style={localStyles.actionItemText}>Update Location / GPS</Text>
              </View>
              <Text style={localStyles.actionChevron}>❯</Text>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.actionRowItem} activeOpacity={0.7} onPress={() => setShowHelpSupportModal(true)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[localStyles.actionIconCircle, { backgroundColor: '#DCFCE7' }]}>
                  <Text style={{ fontSize: 16 }}>🎧</Text>
                </View>
                <Text style={localStyles.actionItemText}>Help & Customer Support</Text>
              </View>
              <Text style={localStyles.actionChevron}>❯</Text>
            </TouchableOpacity>
          </View>

          {/* Logout / Switch Role */}
          <TouchableOpacity style={localStyles.logoutBtn} onPress={onBackToOnboarding} activeOpacity={0.85}>
            <Text style={localStyles.logoutBtnText}>🚪 Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 20, paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
          {/* Settings Page Title & Subtitle matching screenshot */}
          <View style={{ marginTop: 12, marginBottom: 14 }}>
            <Text style={localStyles.settingsPageMainTitle}>Customer Settings</Text>
            <Text style={localStyles.settingsPageSubTitle}>Manage your account, services and preferences</Text>
          </View>

          {/* User Info Card matching screenshot */}
          <TouchableOpacity
            style={localStyles.settingsUserCard}
            activeOpacity={0.8}
            onPress={handleOpenEditProfile}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={localStyles.settingsAvatarRing}>
                <Image
                  source={customerProfile.profileImage ? { uri: customerProfile.profileImage } : DefaultAvatar}
                  style={localStyles.settingsAvatarImg}
                />
              </View>
              <View style={{ marginLeft: 14, flex: 1 }}>
                <Text style={localStyles.userWelcomeText}>Welcome,</Text>
                <Text style={localStyles.userNameText}>
                  {customerProfile.fullName || 'Sushil Kumar'} 👋
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                  <View style={localStyles.verifiedBadge}>
                    <Text style={localStyles.verifiedBadgeText}>🛡️ Verified Customer</Text>
                  </View>
                </View>
                <Text style={localStyles.userLocationText}>
                  📍 {userLocation || 'Zirakpur, Punjab'}
                </Text>
              </View>
            </View>
            <Text style={localStyles.cardRightChevron}>❯</Text>
          </TouchableOpacity>

          {/* Separated List Cards */}
          <View style={{ marginTop: 4 }}>
            {/* 👤 Profile & Account Card */}
            <TouchableOpacity
              style={localStyles.separateSettingCard}
              activeOpacity={0.7}
              onPress={handleOpenEditProfile}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[localStyles.actionIconCircle, { backgroundColor: '#EBF3FF' }]}>
                  <Text style={{ fontSize: 18 }}>👤</Text>
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={localStyles.settingItemTitle}>Profile & Account</Text>
                  <Text style={localStyles.settingItemSub}>Edit profile, change mobile, email</Text>
                </View>
              </View>
              <Text style={localStyles.cardRightChevron}>❯</Text>
            </TouchableOpacity>

            {/* 🔔 Notification Alerts Card */}
            <TouchableOpacity
              style={localStyles.separateSettingCard}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Notifications 🔔', 'Notifications & Alerts are active.')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[localStyles.actionIconCircle, { backgroundColor: '#F3E8FF' }]}>
                  <Text style={{ fontSize: 18 }}>🔔</Text>
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={localStyles.settingItemTitle}>Notification Alerts</Text>
                  <Text style={localStyles.settingItemSub}>App alerts and job updates</Text>
                </View>
              </View>
              <Text style={localStyles.cardRightChevron}>❯</Text>
            </TouchableOpacity>

            {/* 🎧 Help & Support Card */}
            <TouchableOpacity
              style={localStyles.separateSettingCard}
              activeOpacity={0.7}
              onPress={() => setShowHelpSupportModal(true)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[localStyles.actionIconCircle, { backgroundColor: '#DCFCE7' }]}>
                  <Text style={{ fontSize: 18 }}>🎧</Text>
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={localStyles.settingItemTitle}>Help & Customer Support</Text>
                  <Text style={localStyles.settingItemSub}>Contact support & submit queries</Text>
                </View>
              </View>
              <Text style={localStyles.cardRightChevron}>❯</Text>
            </TouchableOpacity>

            {/* 📄 Terms & Privacy Card */}
            <TouchableOpacity
              style={localStyles.separateSettingCard}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Terms & Privacy 📄', 'HunarGo Terms of Service and Privacy Policy.')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[localStyles.actionIconCircle, { backgroundColor: '#FEF9C3' }]}>
                  <Text style={{ fontSize: 18 }}>📄</Text>
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={localStyles.settingItemTitle}>Terms & Privacy Policy</Text>
                  <Text style={localStyles.settingItemSub}>Terms of service & privacy details</Text>
                </View>
              </View>
              <Text style={localStyles.cardRightChevron}>❯</Text>
            </TouchableOpacity>

            {/* 🚪 Logout Card */}
            <TouchableOpacity
              style={[localStyles.separateSettingCard, localStyles.logoutSettingCard]}
              onPress={onBackToOnboarding}
              activeOpacity={0.85}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[localStyles.actionIconCircle, { backgroundColor: '#FEE2E2' }]}>
                  <Text style={{ fontSize: 18 }}>🚪</Text>
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={[localStyles.settingItemTitle, { color: '#EF4444' }]}>Logout</Text>
                  <Text style={localStyles.settingItemSub}>Sign out from your account</Text>
                </View>
              </View>
              <Text style={[localStyles.cardRightChevron, { color: '#EF4444' }]}>❯</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Edit Customer Profile & Account Tab */}
      {activeTab === 'edit_profile' && (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 16, paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
          {/* Top Header Bar with Back Arrow */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18, marginTop: 10 }}>
            <TouchableOpacity
              style={styles.subScreenBackButton}
              onPress={() => setActiveTab('settings')}
              activeOpacity={0.7}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <Text style={styles.subScreenBackArrowIcon}>←</Text>
            </TouchableOpacity>
            <View style={{ marginLeft: 12 }}>
              <Text style={localStyles.settingsPageMainTitle}>Edit Profile & Account</Text>
              <Text style={localStyles.settingsPageSubTitle}>Update your personal details and contact info</Text>
            </View>
          </View>

          {/* Profile Photo Section */}
          <View style={localStyles.editProfilePhotoCard}>
            <TouchableOpacity style={localStyles.editAvatarWrapper} onPress={handlePickProfileImage} activeOpacity={0.85}>
              <Image
                source={editProfileImage ? { uri: editProfileImage } : customerProfile.profileImage ? { uri: customerProfile.profileImage } : DefaultAvatar}
                style={localStyles.editAvatarImage}
              />
              <View style={localStyles.cameraBadgeBtn}>
                <Text style={{ fontSize: 13 }}>📷</Text>
              </View>
            </TouchableOpacity>
            <Text style={localStyles.changePhotoText}>Tap to change profile photo</Text>
          </View>

          {/* Edit Form Card */}
          <View style={localStyles.editFormCard}>
            <Text style={localStyles.fieldLabel}>Full Name *</Text>
            <TextInput
              style={localStyles.fieldInput}
              placeholder="Enter your full name"
              placeholderTextColor="#94A3B8"
              value={editFullName}
              onChangeText={setEditFullName}
            />

            <Text style={[localStyles.fieldLabel, { marginTop: 9 }]}>Phone Number (Verified)</Text>
            <View style={localStyles.readOnlyPhoneInput}>
              <Text style={localStyles.readOnlyPhoneText}>{customerProfile.phoneNumber || '+91 98765 43210'}</Text>
              <Text style={{ fontSize: 12, color: '#16A34A', fontWeight: '800' }}>✓ Verified</Text>
            </View>

            <Text style={[localStyles.fieldLabel, { marginTop: 9 }]}>Email Address</Text>
            <TextInput
              style={localStyles.fieldInput}
              placeholder="name@example.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={editEmail}
              onChangeText={setEditEmail}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={localStyles.saveProfileBtn}
            onPress={handleSaveCustomerProfile}
            activeOpacity={0.85}
            disabled={isSavingProfile}
          >
            {isSavingProfile ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={localStyles.saveProfileBtnText}>Save Profile Changes 💾</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Bottom Floating Navigation Tab Bar (Identical to Worker Dashboard) */}
      <View style={styles.bottomTabBarContainer}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('dashboard')} activeOpacity={0.75}>
          <Text style={[styles.tabIcon, activeTab === 'dashboard' && styles.tabIconActive]}>🏠</Text>
          <Text style={[styles.tabLabel, activeTab === 'dashboard' && styles.tabLabelActive]}>Dashboard</Text>
          {activeTab === 'dashboard' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('calls')} activeOpacity={0.75}>
          <Text style={[styles.tabIcon, activeTab === 'calls' && styles.tabIconActive]}>📞</Text>
          <Text style={[styles.tabLabel, activeTab === 'calls' && styles.tabLabelActive]}>Calls</Text>
          {activeTab === 'calls' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('profile')} activeOpacity={0.75}>
          <Text style={[styles.tabIcon, activeTab === 'profile' && styles.tabIconActive]}>👤</Text>
          <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}>Profile</Text>
          {activeTab === 'profile' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('settings')} activeOpacity={0.75}>
          <Text style={[styles.tabIcon, activeTab === 'settings' && styles.tabIconActive]}>⚙️</Text>
          <Text style={[styles.tabLabel, activeTab === 'settings' && styles.tabLabelActive]}>Settings</Text>
          {activeTab === 'settings' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>

      {/* HELP & CUSTOMER SUPPORT POPUP MODAL */}
      <Modal
        visible={showHelpSupportModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowHelpSupportModal(false)}
      >
        <View style={localStyles.helpModalOverlay}>
          <View style={localStyles.helpModalContainer}>
            {/* Modal Header */}
            <View style={localStyles.helpModalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={localStyles.helpIconWrapper}>
                  <Text style={{ fontSize: 20 }}>🎧</Text>
                </View>
                <View>
                  <Text style={localStyles.helpModalTitle}>Help & Support</Text>
                  <Text style={localStyles.helpModalSubtitle}>Submit query to HunarGo support</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setShowHelpSupportModal(false)} style={localStyles.helpCloseBtn}>
                <Text style={{ fontSize: 16, color: '#64748B', fontWeight: '800' }}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Input Form */}
            <View style={{ marginTop: 14 }}>
              <Text style={localStyles.fieldLabel}>Issue Title / Subject *</Text>
              <TextInput
                style={localStyles.fieldInput}
                placeholder="e.g. Payment issue, Worker delay"
                placeholderTextColor="#94A3B8"
                value={helpTitle}
                onChangeText={setHelpTitle}
              />

              <Text style={[localStyles.fieldLabel, { marginTop: 12 }]}>Detailed Description *</Text>
              <TextInput
                style={[localStyles.fieldInput, localStyles.fieldInputMulti]}
                placeholder="Describe your issue or feedback in detail..."
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={helpDescription}
                onChangeText={setHelpDescription}
              />
            </View>

            {/* Modal Actions */}
            <View style={localStyles.helpModalActions}>
              <TouchableOpacity
                style={localStyles.helpCancelBtn}
                onPress={() => setShowHelpSupportModal(false)}
                activeOpacity={0.8}
                disabled={isSubmittingHelp}
              >
                <Text style={localStyles.helpCancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={localStyles.helpSubmitBtn}
                onPress={handleSubmitHelpSupport}
                activeOpacity={0.85}
                disabled={isSubmittingHelp}
              >
                {isSubmittingHelp ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={localStyles.helpSubmitBtnText}>Submit Query 🚀</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  dashboardContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  homeFixedContent: {
    flex: 1,
    paddingBottom: 115,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 6,
  },
  topIconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  hamburgerIcon: {
    fontSize: 22,
    color: '#1E293B',
    fontWeight: '600',
  },
  logoImage: {
    height: 75,
    width: 250,
    marginTop: 30,
  },
  bellIcon: {
    fontSize: 20,
  },
  redBadgeDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBF7',
    marginHorizontal: 24,
    marginTop: 4,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: '#FFE3D3',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  redPinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 14,
    height: 18,
  },
  redPinHead: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redPinDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  redPinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#EF4444',
    marginTop: -2,
  },
  locationLabel: {
    fontSize: 11.5,
    color: '#64748B',
    fontWeight: '600',
    marginLeft: 6,
  },
  locationValue: {
    fontSize: 11.5,
    color: '#1E293B',
    fontWeight: '800',
  },
  locationChevron: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '600',
    marginLeft: 4,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1.8,
    borderColor: '#F97316',
    marginRight: 8,
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  searchLens: {
    fontSize: 14,
    marginRight: 6,
  },
  searchTextInput: {
    flex: 1,
    fontSize: 13,
    color: '#1E293B',
    paddingVertical: 0,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5436',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF5436',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  funnelIconContainer: {
    width: 16,
    height: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  funnelLine: {
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  chipsScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1.5,
  },
  chipEmoji: {
    fontSize: 14,
    marginRight: 5,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: 1,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  viewAllLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F97316',
  },
  categoryContainer: {
    paddingHorizontal: 18,
    marginBottom: 2,
  },
  categoryGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '31%',
    borderRadius: 14,
    padding: 8,
    position: 'relative',
    minHeight: 80,
    justifyContent: 'space-between',
  },
  categoryCardWide: {
    width: '48.5%',
    borderRadius: 14,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
  },
  categoryIconWrapper: {
    marginBottom: 2,
  },
  categoryCardTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#1E293B',
    lineHeight: 14,
  },
  categoryChevronBtn: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  categoryChevronText: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '800',
  },
  promoBanner: {
    marginHorizontal: 18,
    marginTop: 2,
    marginBottom: 4,
    backgroundColor: '#FFEDD5',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  promoLeft: {
    flex: 1,
    marginRight: 8,
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
  },
  promoSubtitle: {
    fontSize: 11.5,
    color: '#475569',
    fontWeight: '600',
    marginBottom: 8,
  },
  promoButton: {
    backgroundColor: '#F97316',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '800',
  },
  promoImage: {
    width: 75,
    height: 75,
  },
  popularScrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 4,
  },
  popularCard: {
    width: 115,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  popularImgBox: {
    height: 55,
    width: '100%',
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  popularImg: {
    width: '100%',
    height: '100%',
  },
  ratingBadgeOverlay: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ratingBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1E293B',
  },
  popularCardFooter: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popularCardTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#1E293B',
  },
  popularCardSub: {
    fontSize: 8.5,
    color: '#64748B',
    marginTop: 0,
  },
  miniChevronBtn: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniChevronText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '800',
  },
  workersListContainer: {
    paddingHorizontal: 18,
    marginBottom: 2,
  },
  workerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  workerAvatarWrapper: {
    position: 'relative',
    marginRight: 6,
  },
  workerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E293B',
  },
  workerProfession: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 0,
  },
  workerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  workerRating: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#1E293B',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 8,
    color: '#94A3B8',
    fontWeight: '500',
  },
  workerDistance: {
    fontSize: 8.5,
    color: '#64748B',
    fontWeight: '600',
  },
  callPillBtn: {
    backgroundColor: '#F97316',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 10,
  },
  callPillText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
  },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: '#FEE2E2',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: '#991B1B',
    fontWeight: '700',
    fontSize: 14,
  },
  bottomNavbar: {
    position: 'absolute',
    bottom: 60,
    left: 18,
    right: 18,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 3,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  navTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    position: 'relative',
  },
  navTabIcon: {
    fontSize: 16,
    color: '#475569',
  },
  navTabIconActive: {
    color: '#FF5436',
  },
  navTabLabel: {
    fontSize: 9.5,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 1,
  },
  navTabLabelActive: {
    color: '#FF5436',
    fontWeight: '800',
  },
  activeTabIndicator: {
    height: 2.5,
    width: 16,
    backgroundColor: '#FF5436',
    borderRadius: 1.5,
    marginTop: 2,
  },
  /* Customer Profile Screen Styles */
  profileHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  profileAvatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  profileAvatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FF5436',
  },
  avatarCameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FF5436',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileHeaderInfo: {
    flex: 1,
  },
  profileHeaderName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
    marginRight: 6,
  },
  verifiedBadgeCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderSub: {
    fontSize: 12.5,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  profileHeaderEmail: {
    fontSize: 11.5,
    color: '#94A3B8',
    marginTop: 1,
  },
  customerRoleTag: {
    backgroundColor: '#FFEDD5',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#FFD8A8',
  },
  customerRoleTagText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#C2410C',
  },
  profileStatsRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
  },
  profileStatBox: {
    flex: 1,
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  profileStatLabel: {
    fontSize: 10.5,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  profileSectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
  },
  cardSectionHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 10,
  },
  detailItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  detailTextGroup: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10.5,
    color: '#94A3B8',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 1,
  },
  actionRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  actionIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  actionItemText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  actionChevron: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '800',
  },
  modalSafeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalSubHeaderRow: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalHeaderSub: {
    fontSize: 11.5,
    color: '#64748B',
    fontWeight: '500',
  },
  modalSearchContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 6,
  },
  stylishSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 14,
    height: 42,
    borderWidth: 1.8,
    borderColor: '#F97316',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  stylishSearchLens: {
    fontSize: 15,
    marginRight: 8,
  },
  stylishSearchInput: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '600',
    color: '#1E293B',
    paddingVertical: 0,
  },
  stylishClearBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  stylishClearText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '800',
  },
  modalCategoryWrapper: {
    paddingVertical: 6,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(241, 245, 249, 0.6)',
  },
  modalStylishChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 6.5,
    borderRadius: 20,
    borderWidth: 1.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  modalChipActiveGlow: {
    shadowColor: '#FF5436',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  modalChipEmoji: {
    fontSize: 13.5,
    marginRight: 6,
  },
  modalChipTitle: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  modalListScrollContent: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 20,
  },
  modalWorkerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  modalWorkerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalAvatarBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  modalAvatarImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  modalWorkerInfo: {
    justifyContent: 'center',
  },
  modalWorkerName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#111827',
  },
  modalDistanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  modalPinEmoji: {
    fontSize: 11,
    marginRight: 2,
  },
  modalDistanceText: {
    fontSize: 11.5,
    color: '#6B7280',
    fontWeight: '500',
  },
  modalCallBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalCallBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  paginationInlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 14,
    marginTop: 6,
    marginBottom: 10,
  },
  pageBtnPrev: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
  },
  pageBtnDisabled: {
    backgroundColor: '#E2E8F0',
    opacity: 0.6,
  },
  pageBtnPrevText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  pageBtnTextDisabled: {
    color: '#94A3B8',
  },
  pageBadgeCenter: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
  },
  pageBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  pageBtnNext: {
    backgroundColor: '#FF5436',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
  },
  pageBtnNextText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  helpModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  helpModalContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  helpModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
  },
  helpIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  helpModalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  helpModalSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  helpCloseBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  fieldInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: '#CBD5E1',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13.5,
    color: '#0F172A',
    fontWeight: '500',
  },
  fieldInputMulti: {
    minHeight: 100,
    paddingTop: 12,
  },
  helpModalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 18,
    gap: 10,
  },
  helpCancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  helpCancelBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#64748B',
  },
  helpSubmitBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FF5436',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#FF5436',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  helpSubmitBtnText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  separateSettingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutSettingCard: {
    borderColor: '#FECDD3',
    backgroundColor: '#FFF5F5',
    marginTop: 6,
  },
  settingItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  settingItemSub: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  settingsPageMainTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  settingsPageSubTitle: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  settingsUserCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  settingsAvatarRing: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: '#FF5436',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  settingsAvatarImg: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  userWelcomeText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  userNameText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 1,
  },
  verifiedBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  verifiedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  userLocationText: {
    fontSize: 11.5,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 4,
  },
  cardRightChevron: {
    fontSize: 18,
    color: '#94A3B8',
    fontWeight: '700',
    marginLeft: 8,
  },
  editProfilePhotoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  editAvatarWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2.5,
    borderColor: '#FF5436',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  editAvatarImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  cameraBadgeBtn: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF5436',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  changePhotoText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#FF5436',
    marginTop: 5,
  },
  editFormCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
  },
  fieldInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    height: 38,
    paddingVertical: 0,
    fontSize: 12.5,
    color: '#0F172A',
    fontWeight: '500',
  },
  readOnlyPhoneInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  readOnlyPhoneText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#475569',
  },
  genderChipBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
  },
  genderChipBtnActive: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FF5436',
  },
  genderChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  genderChipTextActive: {
    color: '#FF5436',
    fontWeight: '800',
  },
  saveProfileBtn: {
    backgroundColor: '#FF5436',
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: 'center',
    shadowColor: '#FF5436',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  saveProfileBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
