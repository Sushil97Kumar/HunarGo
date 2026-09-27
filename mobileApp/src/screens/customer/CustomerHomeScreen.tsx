import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  ImageBackground,
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
import { customerApi } from '../../api/customerApi';

interface Props {
  onBackToOnboarding: () => void;
}

export const CustomerHomeScreen: React.FC<Props> = ({ onBackToOnboarding }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'requests' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState('Zirakpur, Punjab');
  const [isLocating, setIsLocating] = useState(false);

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

  const workers = [
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
    {
      id: '2',
      name: 'Sushil Kumar',
      profession: 'Electrician & Plumber',
      rating: '4.9',
      reviews: '98',
      distance: '2.1 km away',
      phone: '+919876543211',
      avatar: DefaultAvatar,
    },
  ];

  const handleCallWorker = (workerId: string) => {
    customerApi.callWorker(workerId);
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setUserLocation('Zirakpur, Punjab');
      setIsLocating(false);
    }, 600);
  };

  return (
    <ImageBackground source={OnboardingBg} style={localStyles.bgImage} resizeMode="cover">
      <SafeAreaView style={localStyles.dashboardContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {activeTab === 'home' && (
        <View style={localStyles.homeFixedContent}>
          {/* Top Bar Header */}
          <View style={localStyles.topBar}>
            <View style={{ width: 40 }} />

            <Image source={HunarGoLogo} style={localStyles.logoImage} resizeMode="contain" />

            <TouchableOpacity style={localStyles.topIconButton}>
              <Text style={localStyles.bellIcon}>🔔</Text>
              <View style={localStyles.redBadgeDot} />
            </TouchableOpacity>
          </View>

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
                placeholder="What service do you need?"
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={localStyles.filterButton} activeOpacity={0.85}>
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
            style={{ flexGrow: 0 }}
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
                onPress={() => setSearchQuery(cat.title)}
              >
                <Text style={localStyles.chipEmoji}>{cat.emoji}</Text>
                <Text style={[localStyles.chipText, { color: cat.color }]}>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Browse Services Section */}
          <View style={localStyles.sectionHeaderRow}>
            <Text style={localStyles.sectionTitle}>Browse Services</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={localStyles.viewAllLink}>View All ➔</Text>
            </TouchableOpacity>
          </View>

          {/* Category Cards */}
          <View style={localStyles.categoryContainer}>
            {/* Top Row: 3 cards */}
            <View style={localStyles.categoryGridRow}>
              <TouchableOpacity style={[localStyles.categoryCard, { backgroundColor: '#FEF9C3' }]}>
                <View style={localStyles.categoryIconWrapper}>
                  <Text style={{ fontSize: 16 }}>🏠</Text>
                </View>
                <Text style={localStyles.categoryCardTitle}>Home Repair</Text>
                <View style={localStyles.categoryChevronBtn}>
                  <Text style={localStyles.categoryChevronText}>❯</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[localStyles.categoryCard, { backgroundColor: '#FEE2E2' }]}>
                <View style={localStyles.categoryIconWrapper}>
                  <Text style={{ fontSize: 16 }}>🚗</Text>
                </View>
                <Text style={localStyles.categoryCardTitle}>Vehicle Services</Text>
                <View style={localStyles.categoryChevronBtn}>
                  <Text style={localStyles.categoryChevronText}>❯</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[localStyles.categoryCard, { backgroundColor: '#F3E8FF' }]}>
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
              <TouchableOpacity style={[localStyles.categoryCardWide, { backgroundColor: '#DCFCE7' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, marginRight: 4 }}>🧹</Text>
                  <Text style={localStyles.categoryCardTitle}>Cleaning</Text>
                </View>
                <View style={localStyles.categoryChevronBtn}>
                  <Text style={localStyles.categoryChevronText}>❯</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[localStyles.categoryCardWide, { backgroundColor: '#F0FDF4' }]}>
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
              <TouchableOpacity style={localStyles.promoButton} activeOpacity={0.85}>
                <Text style={localStyles.promoButtonText}>Find a Worker ➔</Text>
              </TouchableOpacity>
            </View>
            <Image source={HeroIllustration} style={localStyles.promoImage} resizeMode="contain" />
          </View>

          {/* Popular Services Section */}
          <View style={localStyles.sectionHeaderRow}>
            <Text style={localStyles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={localStyles.viewAllLink}>View All ➔</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={localStyles.popularScrollContent}>
            <TouchableOpacity style={localStyles.popularCard} activeOpacity={0.85}>
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

            <TouchableOpacity style={localStyles.popularCard} activeOpacity={0.85}>
              <View style={localStyles.popularImgBox}>
                <Image source={Screen2Illustration} style={localStyles.popularImg} resizeMode="cover" />
                <View style={localStyles.ratingBadgeOverlay}>
                  <Text style={localStyles.ratingBadgeText}>⭐ 4.7</Text>
                </View>
              </View>
              <View style={localStyles.popularCardFooter}>
                <View>
                  <Text style={localStyles.popularCardTitle}>AC Technician</Text>
                  <Text style={localStyles.popularCardSub}>Available near you</Text>
                </View>
                <View style={localStyles.miniChevronBtn}>
                  <Text style={localStyles.miniChevronText}>❯</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.popularCard} activeOpacity={0.85}>
              <View style={localStyles.popularImgBox}>
                <Image source={HeroIllustration} style={localStyles.popularImg} resizeMode="cover" />
                <View style={localStyles.ratingBadgeOverlay}>
                  <Text style={localStyles.ratingBadgeText}>⭐ 4.6</Text>
                </View>
              </View>
              <View style={localStyles.popularCardFooter}>
                <View>
                  <Text style={localStyles.popularCardTitle}>Car Mechanic</Text>
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
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={localStyles.viewAllLink}>View All ➔</Text>
            </TouchableOpacity>
          </View>

          <View style={localStyles.workersListContainer}>
            {workers.slice(0, 1).map((worker) => (
              <View key={worker.id} style={localStyles.workerCard}>
                <View style={localStyles.workerAvatarWrapper}>
                  <Image source={worker.avatar} style={localStyles.workerAvatar} />
                  <View style={localStyles.onlineDot} />
                </View>
                <View style={localStyles.workerInfo}>
                  <Text style={localStyles.workerName}>{worker.name}</Text>
                  <Text style={localStyles.workerProfession}>{worker.profession}</Text>
                  <View style={localStyles.workerMetaRow}>
                    <Text style={localStyles.workerRating}>⭐ {worker.rating} <Text style={localStyles.reviewsText}>({worker.reviews} reviews)</Text></Text>
                    <Text style={localStyles.workerDistance}>📍 {worker.distance}</Text>
                  </View>
                </View>
                <TouchableOpacity style={localStyles.callPillBtn} activeOpacity={0.85} onPress={() => handleCallWorker(worker.id)}>
                  <Text style={localStyles.callPillText}>📞 Call</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Customer Calls History */}
      {activeTab === 'search' && <CustomerCallsScreen />}

      {/* Bookings / Requests */}
      {activeTab === 'requests' && (
        <ScrollView contentContainerStyle={localStyles.scrollContent}>
          <View style={{ padding: 18 }}>
            <Text style={localStyles.sectionTitle}>My Job Requests</Text>
          </View>
        </ScrollView>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <ScrollView contentContainerStyle={localStyles.scrollContent}>
          <View style={{ padding: 18 }}>
            <Text style={localStyles.sectionTitle}>Customer Account</Text>
            <TouchableOpacity style={localStyles.logoutBtn} onPress={onBackToOnboarding}>
              <Text style={localStyles.logoutBtnText}>🚪 Switch Role / Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Bottom Floating Navigation Tab Bar */}
      <View style={localStyles.bottomNavbar}>
        <TouchableOpacity style={localStyles.navTabItem} onPress={() => setActiveTab('home')} activeOpacity={0.75}>
          <Text style={[localStyles.navTabIcon, activeTab === 'home' && localStyles.navTabIconActive]}>🏠</Text>
          <Text style={[localStyles.navTabLabel, activeTab === 'home' && localStyles.navTabLabelActive]}>Home</Text>
          {activeTab === 'home' && <View style={localStyles.activeTabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity style={localStyles.navTabItem} onPress={() => setActiveTab('search')} activeOpacity={0.75}>
          <Text style={[localStyles.navTabIcon, activeTab === 'search' && localStyles.navTabIconActive]}>🔍</Text>
          <Text style={[localStyles.navTabLabel, activeTab === 'search' && localStyles.navTabLabelActive]}>Search</Text>
          {activeTab === 'search' && <View style={localStyles.activeTabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity style={localStyles.navTabItem} onPress={() => setActiveTab('requests')} activeOpacity={0.75}>
          <Text style={[localStyles.navTabIcon, activeTab === 'requests' && localStyles.navTabIconActive]}>📋</Text>
          <Text style={[localStyles.navTabLabel, activeTab === 'requests' && localStyles.navTabLabelActive]}>Requests</Text>
          {activeTab === 'requests' && <View style={localStyles.activeTabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity style={localStyles.navTabItem} onPress={() => setActiveTab('profile')} activeOpacity={0.75}>
          <Text style={[localStyles.navTabIcon, activeTab === 'profile' && localStyles.navTabIconActive]}>👤</Text>
          <Text style={[localStyles.navTabLabel, activeTab === 'profile' && localStyles.navTabLabelActive]}>Profile</Text>
          {activeTab === 'profile' && <View style={localStyles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>
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
    paddingBottom: 125,
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
    paddingVertical: 0,
    paddingBottom: 0,
  },
  chipPill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 22,
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: 10,
    marginRight: 5,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  chipEmoji: {
    fontSize: 10,
    marginRight: 2,
  },
  chipText: {
    fontSize: 9.5,
    fontWeight: '800',
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
    bottom: 70,
    left: 24,
    right: 24,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 3,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  navTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    position: 'relative',
  },
  navTabIcon: {
    fontSize: 15,
    color: '#94A3B8',
  },
  navTabIconActive: {
    color: '#FF5436',
  },
  navTabLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 0,
  },
  navTabLabelActive: {
    color: '#FF5436',
    fontWeight: '800',
  },
  activeTabIndicator: {
    height: 2,
    width: 12,
    backgroundColor: '#FF5436',
    borderRadius: 1,
    marginTop: 1,
  },
});
