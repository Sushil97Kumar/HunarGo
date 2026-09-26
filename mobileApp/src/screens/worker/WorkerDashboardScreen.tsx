export function WorkerDashboardScreen({
  onBackToOnboarding
}) {
  var [isAvailable, setIsAvailable] = useState(true);
  var [activeTab, setActiveTab] = useState('dashboard');
  var [selectedProfessions, setSelectedProfessions] = useState(['Electrician', 'Plumber']);
  var workerProfession = selectedProfessions.join(', ');
  var toggleProfessionSelection = title => {
    if (selectedProfessions.includes(title)) {
      if (selectedProfessions.length > 1) {
        setSelectedProfessions(selectedProfessions.filter(p => p !== title));
      }
    } else {
      setSelectedProfessions([...selectedProfessions, title]);
    }
  };
  var [workerLocation, setWorkerLocation] = useState('Sector 17, Chandigarh');
  var [serviceRadius, setServiceRadius] = useState(15);
  var [workImages, setWorkImages] = useState([{
    id: '1',
    title: 'Fan Repair & Wiring',
    icon: '⚡'
  }, {
    id: '2',
    title: 'Switchboard & MCB Fix',
    icon: '🔌'
  }, {
    id: '3',
    title: 'Inverter Setup',
    icon: '🔋'
  }]);
  var [openSettingsSection, setOpenSettingsSection] = useState(null);
  var [settingsSubScreen, setSettingsSubScreen] = useState(null);
  var [callAlertsEnabled, setCallAlertsEnabled] = useState(true);
  var [soundAlertsEnabled, setSoundAlertsEnabled] = useState(true);
  var [workerAvatarUri, setWorkerAvatarUri] = useState(null);
  var [workerName, setWorkerName] = useState('');
  var [workerMobile, setWorkerMobile] = useState('');
  var [workerEmail, setWorkerEmail] = useState('');
  var [workerAadhaar, setWorkerAadhaar] = useState('');
  var [workerPassword, setWorkerPassword] = useState('••••••••');
  var [workingDays, setWorkingDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  var [workingHours, setWorkingHours] = useState('09:00 AM - 07:00 PM');
  var [emergencyAvailable, setEmergencyAvailable] = useState(true);
  var [privacyProfileVisible, setPrivacyProfileVisible] = useState(true);
  var [hourlyRate, setHourlyRate] = useState('250');
  var [visitingCharge, setVisitingCharge] = useState(150);
  var [experienceYears, setExperienceYears] = useState(5);
  var [profileViews, setProfileViews] = useState(245);
  var [callsReceivedCount, setCallsReceivedCount] = useState(38);
  var [customersServedCount, setCustomersServedCount] = useState(21);
  var [rating, setRating] = useState(4.8);
  var [reviewCount, setReviewCount] = useState(38);
  var [reviewsCurrentPage, setReviewsCurrentPage] = useState(1);

  useEffect(() => {
    var fetchWorkerProfile = async () => {
      try {
        console.log('🔄 [WorkerDashboardScreen] Fetching profile from DB...');
        var res = await workerApi.getProfile();
        console.log('✅ [WorkerDashboardScreen] Profile received:', res);
        if (res && res.success && res.worker) {
          var w = res.worker;
          if (w.fullName) setWorkerName(w.fullName);
          if (w.phoneNumber) setWorkerMobile(w.phoneNumber);
          if (w.email) setWorkerEmail(w.email);
          if (w.aadhaar) setWorkerAadhaar(w.aadhaar);
          if (w.profileImage) setWorkerAvatarUri(w.profileImage);
          if (w.professions && Array.isArray(w.professions) && w.professions.length > 0) {
            setSelectedProfessions(w.professions);
          }
          if (w.location) {
            var loc = w.location.address || w.location.city || (typeof w.location === 'string' ? w.location : '');
            if (loc) setWorkerLocation(loc);
            if (w.location.serviceRadius) setServiceRadius(w.location.serviceRadius);
          }
          if (w.isAvailable !== undefined) setIsAvailable(w.isAvailable);
          if (w.hourlyRate !== undefined) setHourlyRate(String(w.hourlyRate));
          if (w.visitingCharge !== undefined) setVisitingCharge(w.visitingCharge);
          if (w.experienceYears !== undefined) setExperienceYears(w.experienceYears);
          if (w.profileViews !== undefined) setProfileViews(w.profileViews);
          if (w.callsReceivedCount !== undefined) setCallsReceivedCount(w.callsReceivedCount);
          if (w.customersServedCount !== undefined) setCustomersServedCount(w.customersServedCount);
          if (w.rating !== undefined) setRating(w.rating);
          if (w.reviewCount !== undefined) setReviewCount(w.reviewCount);
          if (w.workImages && Array.isArray(w.workImages) && w.workImages.length > 0) {
            setWorkImages(w.workImages.map((img, i) => ({
              id: img._id || img.id || String(i + 1),
              title: img.title || 'Work Photo',
              icon: img.icon || '⚡'
            })));
          }
        }
      } catch (err) {
        console.error('❌ [WorkerDashboardScreen] Error fetching profile:', err);
      }
    };
    fetchWorkerProfile();
  }, []);

  var handlePickProfileImage = async () => {
    try {
      var result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });
      if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
        var selectedUri = result.assets[0].uri;
        setWorkerAvatarUri(selectedUri);
        console.log('📸 Uploading newly picked profile image...');
        var uploadRes = await workerApi.uploadProfileImage(selectedUri);
        if (uploadRes && uploadRes.imageUrl) {
          setWorkerAvatarUri(uploadRes.imageUrl);
          await workerApi.updateProfile({ fullName: workerName, profileImageUri: uploadRes.imageUrl });
        }
      }
    } catch (err) {
      console.error('Failed to pick profile image:', err);
    }
  };

  var handleSaveProfileAccount = async () => {
    try {
      console.log('💾 Saving updated profile details...');
      await workerApi.updateProfile({
        fullName: workerName,
        email: workerEmail,
        aadhaar: workerAadhaar,
        phoneNumber: workerMobile,
        profileImageUri: workerAvatarUri,
      });
      if (workerLocation) {
        await workerApi.updateLocationAndDistance({
          address: workerLocation,
          city: '',
          pincode: '',
          maxDistanceKm: serviceRadius,
        });
      }
      setSettingsSubScreen(null);
    } catch (err) {
      console.error('Failed to save profile account changes:', err);
      setSettingsSubScreen(null);
    }
  };

  var handleToggleAvailability = async () => {
    var newStatus = !isAvailable;
    setIsAvailable(newStatus);
    try {
      console.log('🔄 Toggling worker availability to:', newStatus);
      var res = await workerApi.toggleAvailability(newStatus);
      console.log('✅ Worker availability updated in DB:', res);
    } catch (err) {
      console.error('❌ Failed to toggle availability:', err);
    }
  };

  var handleSaveProfessions = async () => {
    try {
      console.log('💾 Saving professions:', selectedProfessions);
      await workerApi.updateProfessions(selectedProfessions);
      setSettingsSubScreen(null);
    } catch (err) {
      console.error('Failed to save profession changes:', err);
      setSettingsSubScreen(null);
    }
  };
  var toggleSettingsSection = secId => {
    setOpenSettingsSection(openSettingsSection === secId ? null : secId);
  };
  var [newWorkImageTitle, setNewWorkImageTitle] = useState('');
  var handleAddWorkImage = () => {
    if (!newWorkImageTitle.trim()) return;
    var iconEmoji = workerProfession === 'Plumber' ? '🔧' : workerProfession === 'Carpenter' ? '🪚' : workerProfession === 'Painter' ? '🎨' : workerProfession === 'AC Repair' ? '❄️' : workerProfession === 'Mechanic' ? '🚗' : '⚡';
    var newImg = {
      id: Date.now().toString(),
      title: newWorkImageTitle.trim(),
      icon: iconEmoji
    };
    setWorkImages([...workImages, newImg]);
    setNewWorkImageTitle('');
  };
  var handleRemoveWorkImage = id => {
    setWorkImages(workImages.filter(img => img.id !== id));
  };
  var scrollViewRef = useRef(null);
  var handleDashboardPress = () => {
    setActiveTab('dashboard');
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true
    });
  };
  var [callSearch, setCallSearch] = useState('');
  var [currentPage, setCurrentPage] = useState(1);
  var ITEMS_PER_PAGE = 6;
  var allCustomerCalls = [{
    id: '1',
    name: 'Amit Sharma',
    distance: '1.2 km away',
    avatar: '👨'
  }, {
    id: '2',
    name: 'Priya Singh',
    distance: '2.8 km away',
    avatar: '👩'
  }, {
    id: '3',
    name: 'Rohit Verma',
    distance: '4.5 km away',
    avatar: '👨‍💼'
  }, {
    id: '4',
    name: 'Neha Gupta',
    distance: '5.1 km away',
    avatar: '👩‍💼'
  }, {
    id: '5',
    name: 'Vikas Malhotra',
    distance: '6.0 km away',
    avatar: '🧑‍🔧'
  }, {
    id: '6',
    name: 'Sunita Devi',
    distance: '3.1 km away',
    avatar: '👩‍🌾'
  }, {
    id: '7',
    name: 'Rajesh Kumar',
    distance: '1.8 km away',
    avatar: '👨'
  }, {
    id: '8',
    name: 'Pooja Rani',
    distance: '2.4 km away',
    avatar: '👩'
  }, {
    id: '9',
    name: 'Sanjay Patel',
    distance: '3.7 km away',
    avatar: '👨‍💼'
  }, {
    id: '10',
    name: 'Kavita Sharma',
    distance: '4.2 km away',
    avatar: '👩‍💼'
  },
  // Page 2 (Items 11-20)
  {
    id: '11',
    name: 'Deepak Joshi',
    distance: '5.5 km away',
    avatar: '👨'
  }, {
    id: '12',
    name: 'Ananya Roy',
    distance: '6.8 km away',
    avatar: '👩'
  }, {
    id: '13',
    name: 'Manoj Singh',
    distance: '2.1 km away',
    avatar: '👨‍💼'
  }, {
    id: '14',
    name: 'Ritu Agarwal',
    distance: '3.4 km away',
    avatar: '👩‍💼'
  }, {
    id: '15',
    name: 'Karan Mehra',
    distance: '4.9 km away',
    avatar: '👨'
  }, {
    id: '16',
    name: 'Shalini Verma',
    distance: '5.3 km away',
    avatar: '👩'
  }, {
    id: '17',
    name: 'Alok Nath',
    distance: '6.2 km away',
    avatar: '👨‍💼'
  }, {
    id: '18',
    name: 'Meenakshi S.',
    distance: '7.1 km away',
    avatar: '👩‍💼'
  }, {
    id: '19',
    name: 'Vikram Batra',
    distance: '1.5 km away',
    avatar: '👨'
  }, {
    id: '20',
    name: 'Divya Prakash',
    distance: '2.9 km away',
    avatar: '👩'
  },
  // Page 3 (Items 21-24)
  {
    id: '21',
    name: 'Suresh Kumar',
    distance: '3.8 km away',
    avatar: '👨'
  }, {
    id: '22',
    name: 'Nisha Thakur',
    distance: '4.6 km away',
    avatar: '👩'
  }, {
    id: '23',
    name: 'Harish Chander',
    distance: '5.9 km away',
    avatar: '👨‍💼'
  }, {
    id: '24',
    name: 'Bhavna Kapoor',
    distance: '6.4 km away',
    avatar: '👩‍💼'
  }];
  var filteredCalls = allCustomerCalls.filter(call => {
    return call.name.toLowerCase().includes(callSearch.toLowerCase()) || call.distance.toLowerCase().includes(callSearch.toLowerCase());
  });
  var totalPages = Math.ceil(filteredCalls.length / ITEMS_PER_PAGE) || 1;
  var paginatedCalls = filteredCalls.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  var recentCalls = [{
    id: '1',
    name: 'Amit Sharma',
    verified: true,
    service: 'Fan Repair',
    time: 'Today 10:24 AM',
    avatar: '👨',
    status: 'Called'
  }, {
    id: '2',
    name: 'Priya Singh',
    verified: true,
    service: 'Wiring',
    time: 'Yesterday 04:12 PM',
    avatar: '👩',
    status: 'Called'
  }, {
    id: '3',
    name: 'Rohit Verma',
    verified: true,
    service: 'Switch Repair',
    time: '12 Sep 2025 11:36 AM',
    avatar: '👨‍💼',
    status: 'Called'
  }, {
    id: '4',
    name: 'Neha Gupta',
    verified: true,
    service: 'Electrical Installation',
    time: '10 Sep 2025 03:20 PM',
    avatar: '👩‍💼',
    status: 'Called'
  }];
  return <ImageBackground source={require("../../assets/onboarding_bg.png")} style={styles.bgImage} resizeMode="cover">{<SafeAreaView style={styles.dashboardContainer}>{<View style={styles.dashboardTopHeader}>{<TouchableOpacity onPress={handleDashboardPress} activeOpacity={0.8}>{<Image source={require("../../assets/logo.png")} style={styles.dashboardLogo} resizeMode="contain" />}</TouchableOpacity>}{<TouchableOpacity style={styles.notificationBtn} activeOpacity={0.7}>{<Text style={styles.bellEmoji}>🔔</Text>}{<View style={styles.notificationDot} />}</TouchableOpacity>}</View>}{activeTab === 'dashboard' && <ScrollView contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: 95,
        gap: 10
      }} showsVerticalScrollIndicator={false}>{<TouchableOpacity style={styles.workerProfileHeaderCard} onPress={() => setActiveTab('profile')} activeOpacity={0.85}>{<View style={styles.workerAvatarWrapper}>{<Image source={workerAvatarUri ? { uri: workerAvatarUri } : require("../../assets/default_avatar.png")} style={styles.workerAvatarImg} />}{<TouchableOpacity style={styles.cameraBadgeSmall} onPress={handlePickProfileImage} activeOpacity={0.8}>{<Text style={styles.cameraIconSmall}>📷</Text>}</TouchableOpacity>}</View>}{<View style={styles.workerInfoContainer}>{<Text style={styles.welcomeLabel}>Welcome,</Text>}{<View style={styles.workerNameRow}>{<Text style={styles.workerNameText}>{workerName || 'Worker'}</Text>}{<Text style={styles.waveEmoji}> 👋</Text>}</View>}{<Text style={styles.workerProfessionText}>{workerProfession}</Text>}{<View style={styles.verifiedBadgeRow}>{<View style={styles.verifiedBadge}>{<Text style={styles.verifiedCheckIcon}>✔</Text>}{<Text style={styles.verifiedBadgeText}>Verified Worker</Text>}</View>}</View>}{<View style={styles.locationRow}>{<Text style={styles.locationMarkerIcon}>📍</Text>}{<Text style={styles.locationDetailText}>{workerLocation} • {serviceRadius} km radius</Text>}</View>}</View>}</TouchableOpacity>}{<TouchableOpacity style={styles.completionCard} onPress={() => setActiveTab('profile')} activeOpacity={0.85}>{<View style={styles.completionTopRow}>{<Text style={styles.completionLabel}>Profile Completion</Text>}{<View style={styles.completionPercentGroup}>{<Text style={styles.completionPercentText}>85%</Text>}{<Text style={styles.chevronIcon}> ❯</Text>}</View>}</View>}{<View style={styles.progressBarTrack}>{<View style={[styles.progressBarFill, {
              width: '85%'
            }]} />}</View>}</TouchableOpacity>}{<View style={styles.statsGrid}>{<View style={styles.statCardItem}>{<View style={[styles.statIconBox, {
              backgroundColor: '#F3E8FF'
            }]}>{<Text style={styles.statEmoji}>👁️</Text>}</View>}{<Text style={styles.statValue}>{profileViews}</Text>}{<Text style={styles.statLabel}>Profile Views</Text>}</View>}{<View style={styles.statCardItem}>{<View style={[styles.statIconBox, {
              backgroundColor: '#DCFCE7'
            }]}>{<Text style={styles.statEmoji}>📞</Text>}</View>}{<Text style={styles.statValue}>{callsReceivedCount}</Text>}{<Text style={styles.statLabel}>Calls Received</Text>}</View>}{<View style={styles.statCardItem}>{<View style={[styles.statIconBox, {
              backgroundColor: '#E0F2FE'
            }]}>{<Text style={styles.statEmoji}>👥</Text>}</View>}{<Text style={styles.statValue}>{customersServedCount}</Text>}{<Text style={styles.statLabel}>Customers Served</Text>}</View>}{<View style={styles.statCardItem}>{<View style={[styles.statIconBox, {
              backgroundColor: '#FEF9C3'
            }]}>{<Text style={styles.statEmoji}>⭐</Text>}</View>}{<Text style={styles.statValue}>{rating}</Text>}{<Text style={styles.statLabel}>Rating</Text>}</View>}</View>}{<View style={styles.availabilityBannerCard}>{<View style={styles.greenPulseDot} />}{<View style={styles.availabilityTextGroup}>{<Text style={styles.availabilityTitle}>Available Now</Text>}{<Text style={styles.availabilitySubtitle}>You are visible to customers</Text>}</View>}{<TouchableOpacity style={[styles.toggleSwitchTrack, isAvailable && styles.toggleSwitchTrackActive]} onPress={handleToggleAvailability} activeOpacity={0.8}>{<View style={[styles.toggleSwitchThumb, isAvailable && styles.toggleSwitchThumbActive]} />}</TouchableOpacity>}{<Text style={styles.chevronIconGrey} />}</View>}{<View style={styles.dashboardSectionHeader}>{<Text style={styles.dashboardSectionTitle}>Recent Calls</Text>}{<TouchableOpacity onPress={() => setActiveTab('calls')}>{<Text style={styles.dashboardLinkText}>View All ❯</Text>}</TouchableOpacity>}</View>}{<View style={styles.callsListCard}>{recentCalls.slice(0, 3).map((item, index) => <View>{index > 0 && <View style={styles.callDivider} />}{<TouchableOpacity style={styles.callItemRow} onPress={() => setActiveTab('calls')} activeOpacity={0.7}>{<View style={styles.customerAvatarBox}>{<Text style={styles.customerAvatarEmoji}>{item.avatar}</Text>}</View>}{<View style={styles.callInfoGroup}>{<View style={styles.customerNameRow}>{<Text style={styles.customerNameText}>{item.name}</Text>}{item.verified && <Text style={styles.miniVerifiedCheck}> ✔</Text>}</View>}{<Text style={styles.callServiceText}>{item.service}</Text>}</View>}{<View style={styles.callRightGroup}>{<View style={styles.callTimeRow}>{<Text style={styles.calendarMiniIcon}>📅 </Text>}{<Text style={styles.callTimeText}>{item.time}</Text>}</View>}{<View style={styles.callStatusBadge}>{<Text style={styles.callPhoneIcon}>📞 </Text>}{<Text style={styles.callStatusText}>{item.status}</Text>}{<Text style={styles.chevronIconMini}> ❯</Text>}</View>}</View>}</TouchableOpacity>}</View>)}</View>}</ScrollView>}{activeTab === 'calls' && <ScrollView contentContainerStyle={styles.callsTabScrollContent} showsVerticalScrollIndicator={false}>{<View style={styles.callsTabHeader}>{<View>{<Text style={styles.callsTabTitle}>Customer Calls</Text>}{<Text style={styles.callsTabSubtitle}>Manage direct customer inquiries & requests</Text>}</View>}{<View style={styles.totalCallsBadge}>{<Text style={styles.totalCallsBadgeText}>{allCustomerCalls.length} Total Calls</Text>}</View>}</View>}{<View style={styles.callSearchBox}>{<Text style={styles.callSearchIcon}>🔍</Text>}{<TextInput style={styles.callSearchInput} placeholder="Search customer name or location..." placeholderTextColor="#94A3B8" value={callSearch} onChangeText={text => {
            setCallSearch(text);
            setCurrentPage(1);
          }} />}{callSearch.length > 0 && <TouchableOpacity onPress={() => {
            setCallSearch('');
            setCurrentPage(1);
          }} hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
          }}>{<Text style={styles.clearIcon}>✕</Text>}</TouchableOpacity>}</View>}{<View style={styles.callsListContainer}>{paginatedCalls.map(item => <View style={styles.compactCallCard}>{<View style={styles.compactCardLeft}>{<View style={styles.compactAvatarCircle}>{<Text style={styles.compactAvatarEmoji}>{item.avatar}</Text>}</View>}{<View style={styles.compactInfoGroup}>{<Text style={styles.compactCustomerName}>{item.name}</Text>}{<View style={styles.compactDistanceRow}>{<Text style={styles.compactPinIcon}>📍</Text>}{<Text style={styles.compactDistanceText}>{item.distance}</Text>}</View>}</View>}</View>}{<TouchableOpacity style={styles.compactCallBackBtn} activeOpacity={0.8}>{<Text style={styles.callBackBtnIcon}>📞</Text>}{<Text style={styles.callBackBtnText}>Call Back</Text>}</TouchableOpacity>}</View>)}</View>}{<View style={styles.paginationControlsContainer}>{<TouchableOpacity style={[styles.pageBtn, currentPage === 1 && styles.pageBtnDisabled]} onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} activeOpacity={0.75}>{<Text style={[styles.pageBtnText, currentPage === 1 && styles.pageBtnTextDisabled]}>◀ Prev</Text>}</TouchableOpacity>}{<View style={styles.pageNumberBadge}>{<Text style={styles.pageNumberText}>Page {currentPage} of {totalPages}</Text>}</View>}{<TouchableOpacity style={[styles.pageBtn, currentPage >= totalPages && styles.pageBtnDisabled]} onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage >= totalPages} activeOpacity={0.75}>{<Text style={[styles.pageBtnText, currentPage >= totalPages && styles.pageBtnDisabled]}>Next ▶</Text>}</TouchableOpacity>}</View>}</ScrollView>}{activeTab === 'profile' && <View style={styles.profileContainer}>{<View style={styles.profileHeaderNav}>{<Text style={styles.profileNavTitle}>Worker Profile</Text>}{<TouchableOpacity style={styles.profileShareHeaderBtn} activeOpacity={0.7}>{<Text style={styles.profileShareHeaderIcon}>🔗</Text>}</TouchableOpacity>}</View>}{<View style={styles.profileHeroCard}>{<View style={styles.heroAvatarContainer}>{<Image source={workerAvatarUri ? { uri: workerAvatarUri } : require("../../assets/default_avatar.png")} style={styles.heroAvatarImg} />}{<TouchableOpacity style={styles.heroCameraBadge} activeOpacity={0.8} onPress={handlePickProfileImage}>{<Text style={styles.heroCameraIcon}>📷</Text>}</TouchableOpacity>}</View>}{<Text style={styles.heroWorkerName}>{workerName || 'Worker'}</Text>}{<Text style={styles.heroWorkerSkill}>⚡ Master {workerProfession}</Text>}{<View style={styles.heroBadgesRow}>{<View style={styles.heroVerifiedPill}>{<Text style={styles.heroVerifiedCheck}>✔</Text>}{<Text style={styles.heroVerifiedText}>Verified Worker</Text>}</View>}{<View style={styles.heroRatingPill}>{<Text style={styles.heroRatingStar}>⭐</Text>}{<Text style={styles.heroRatingText}>{rating} ({reviewCount} Reviews)</Text>}</View>}</View>}{<View style={styles.heroStatsRow}>{<View style={styles.heroStatBox}>{<Text style={styles.heroStatVal}>{profileViews}</Text>}{<Text style={styles.heroStatLbl}>Views</Text>}</View>}{<View style={styles.heroStatDivider} />}{<View style={styles.heroStatBox}>{<Text style={styles.heroStatVal}>{callsReceivedCount}</Text>}{<Text style={styles.heroStatLbl}>Calls</Text>}</View>}{<View style={styles.heroStatDivider} />}{<View style={styles.heroStatBox}>{<Text style={styles.heroStatVal}>{customersServedCount}</Text>}{<Text style={styles.heroStatLbl}>Served</Text>}</View>}{<View style={styles.heroStatDivider} />}{<View style={styles.heroStatBox}>{<Text style={styles.heroStatVal}>{rating}★</Text>}{<Text style={styles.heroStatLbl}>Rating</Text>}</View>}</View>}</View>}{<View style={[styles.profileTabScrollContent, { flex: 1, paddingBottom: 0 }]}>{<View style={styles.profileSectionCard}>{<Text style={styles.sectionCardHeaderTitle}>Personal & Contact Details</Text>}{<View style={styles.detailItemRow}>{<Text style={styles.detailItemIcon}>📱</Text>}{<View style={styles.detailItemTextGroup}>{<Text style={styles.detailItemLabel}>Mobile Phone</Text>}{<Text style={styles.detailItemValue}>{workerMobile || 'Not provided'}</Text>}</View>}{<View style={styles.verifiedBadgeMini}>{<Text style={styles.verifiedBadgeMiniText}>✔ Verified</Text>}</View>}</View>}{<View style={styles.detailItemDivider} />}{<View style={styles.detailItemRow}>{<Text style={styles.detailItemIcon}>📍</Text>}{<View style={styles.detailItemTextGroup}>{<Text style={styles.detailItemLabel}>Location & Radius</Text>}{<Text style={styles.detailItemValue}>{workerLocation} • {serviceRadius} km Radius</Text>}</View>}</View>}{<View style={styles.detailItemDivider} />}{<View style={styles.detailItemRow}>{<Text style={styles.detailItemIcon}>💼</Text>}{<View style={styles.detailItemTextGroup}>{<Text style={styles.detailItemLabel}>Experience</Text>}{<Text style={styles.detailItemValue}>{experienceYears}+ Years Professional Experience</Text>}</View>}</View>}{<View style={styles.detailItemDivider} />}{<View style={styles.detailItemRow}>{<Text style={styles.detailItemIcon}>💵</Text>}{<View style={styles.detailItemTextGroup}>{<Text style={styles.detailItemLabel}>Service Rates</Text>}{<Text style={styles.detailItemValue}>₹{visitingCharge} Visiting Charge • ₹{hourlyRate}/hr Repair</Text>}</View>}</View>}</View>}{<View style={styles.profileSectionCard}>{<View style={styles.sectionHeaderFlexRow}>{<Text style={styles.sectionCardHeaderTitle}>Work Portfolio & Photos</Text>}{<TouchableOpacity onPress={() => setActiveTab('settings')}>{<Text style={styles.linkTextSmall}>+ Add Photo</Text>}</TouchableOpacity>}</View>}{<View style={styles.portfolioGrid}>{workImages.map(img => <View style={styles.portfolioCardItem}>{<View style={styles.portfolioIconCircle}>{<Text style={styles.portfolioEmoji}>{img.icon}</Text>}</View>}{<Text style={styles.portfolioTitleText} numberOfLines={1}>{img.title}</Text>}</View>)}</View>}</View>}{<View style={styles.profileActionsContainer}>{<TouchableOpacity style={styles.profileEditBtn} onPress={() => setActiveTab('settings')} activeOpacity={0.8}>{<Text style={styles.profileEditBtnIcon}>✏️</Text>}{<Text style={styles.profileEditBtnText}>Edit Profile & Settings</Text>}</TouchableOpacity>}</View>}</View>}</View>}{activeTab === 'settings' && <View style={{
        flex: 1
      }}>{settingsSubScreen === 'profileAccount' ?
        /* Separate Profile & Account Screen (Single Page, No Scroll) */
        <View style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 20,
          backgroundColor: 'transparent'
        }}>{
          /* Top Content Container */
          <View>{
            /* Header Bar with Left Arrow Back Button */
            <View style={[styles.subScreenHeaderNavRow, {
              marginBottom: 12,
              paddingVertical: 4
            }]}>{
              /* Left Arrow Back Button */
              <TouchableOpacity style={styles.subScreenBackButton} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.7} hitSlop={{
                top: 15,
                bottom: 15,
                left: 15,
                right: 15
              }}>{<Text style={styles.subScreenBackArrowIcon}>←</Text>}</TouchableOpacity>}{
              /* Header Title */
              <Text style={styles.subScreenNavTitleText}>Profile & Account</Text>}</View>}{
            /* Profile Avatar Summary Box (Horizontal Compact) */
            <View style={[styles.profileAccountTopSummaryCard, {
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              marginBottom: 12
            }]}>{
              /* Avatar with camera badge */
              <View style={[styles.workerAvatarSettingsWrapper, {
                width: 52,
                height: 52,
                borderRadius: 26,
                marginBottom: 0
              }]}>{<Image source={workerAvatarUri ? { uri: workerAvatarUri } : require("../../assets/default_avatar.png")} style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26
                }} />}{<TouchableOpacity style={[styles.cameraBadgeSettings, {
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  right: -2,
                  bottom: -2
                }]} onPress={handlePickProfileImage} activeOpacity={0.8}>{<Text style={{
                    fontSize: 8
                  }}>📷</Text>}</TouchableOpacity>}</View>}{
              /* Name & Info Column */
              <View style={{
                marginLeft: 14,
                flex: 1
              }}>{<Text style={{
                  fontSize: 16,
                  fontWeight: '800',
                  color: '#0F172A'
                }}>{workerName}</Text>}{<Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#475569',
                  marginTop: 1
                }}>{workerProfession}</Text>}{
                /* Verified Badge Pill */
                <View style={[styles.verifiedBadgeSettingsRow, {
                  marginTop: 3,
                  alignSelf: 'flex-start'
                }]}>{<Text style={{
                    fontSize: 10,
                    marginRight: 3
                  }}>🛡️</Text>}{<Text style={{
                    fontSize: 10,
                    fontWeight: '700',
                    color: '#16A34A'
                  }}>Verified Worker</Text>}</View>}</View>}</View>}{
            /* Personal Details Section Card (Compact Inputs) */
            <View style={[styles.profileSectionCard, {
              padding: 14,
              marginBottom: 0
            }]}>{<Text style={[styles.sectionCardHeaderTitle, {
                fontSize: 15,
                marginBottom: 8
              }]}>Personal Details</Text>}{
              /* Full Name Field */
              <Text style={[styles.settingsInputSubLabel, {
                fontSize: 11,
                marginBottom: 2,
                marginTop: 0
              }]}>Full Name:</Text>}{<TextInput style={[styles.settingsTextInputField, {
                paddingVertical: 6,
                paddingHorizontal: 10,
                fontSize: 13,
                marginBottom: 8,
                height: 38
              }]} value={workerName} onChangeText={setWorkerName} placeholder="Enter full name" />}{
              /* Mobile Number Field */
              <Text style={[styles.settingsInputSubLabel, {
                fontSize: 11,
                marginBottom: 2,
                marginTop: 0
              }]}>Registered Mobile Number:</Text>}{<View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8
              }}>{<TextInput style={[styles.settingsTextInputField, {
                  flex: 1,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  marginBottom: 0,
                  height: 38,
                  marginRight: 8
                }]} value={workerMobile} onChangeText={setWorkerMobile} placeholder="Enter mobile number" />}{<View style={[styles.verifiedBadgeMini, {
                  paddingVertical: 4,
                  paddingHorizontal: 8
                }]}>{<Text style={[styles.verifiedBadgeMiniText, {
                    fontSize: 10
                  }]}>✔ Verified</Text>}</View>}</View>}{
              /* Email Address Field */
              <Text style={[styles.settingsInputSubLabel, {
                fontSize: 11,
                marginBottom: 2,
                marginTop: 0
              }]}>Email Address:</Text>}{<TextInput style={[styles.settingsTextInputField, {
                paddingVertical: 6,
                paddingHorizontal: 10,
                fontSize: 13,
                marginBottom: 8,
                height: 38
              }]} value={workerEmail} onChangeText={setWorkerEmail} placeholder="Enter email address" />}{
              /* Aadhaar Card Number Field */
              <Text style={[styles.settingsInputSubLabel, {
                fontSize: 11,
                marginBottom: 2,
                marginTop: 0
              }]}>Aadhaar Card Number:</Text>}{<View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8
              }}>{<TextInput style={[styles.settingsTextInputField, {
                  flex: 1,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  marginBottom: 0,
                  height: 38,
                  marginRight: 8
                }]} value={workerAadhaar} onChangeText={setWorkerAadhaar} keyboardType="numeric" placeholder="Enter 12-digit Aadhaar number" />}{<View style={[styles.verifiedBadgeMini, {
                  paddingVertical: 4,
                  paddingHorizontal: 8
                }]}>{<Text style={[styles.verifiedBadgeMiniText, {
                    fontSize: 10
                  }]}>✔ Verified</Text>}</View>}</View>}{
              /* Location Field */
              <Text style={[styles.settingsInputSubLabel, {
                fontSize: 11,
                marginBottom: 2,
                marginTop: 0
              }]}>Base Location / Address:</Text>}{<TextInput style={[styles.settingsTextInputField, {
                paddingVertical: 6,
                paddingHorizontal: 10,
                fontSize: 13,
                marginBottom: 4,
                height: 38
              }]} value={workerLocation} onChangeText={setWorkerLocation} placeholder="e.g. Sector 17, Chandigarh" />}</View>}</View>}{
          /* Bottom Action Buttons */
          <View style={{
            gap: 8,
            marginTop: 10
          }}>{
            /* Save Button */
            <TouchableOpacity style={[styles.saveSettingsBtn, {
              marginTop: 0,
              paddingVertical: 11
            }]} onPress={handleSaveProfileAccount} activeOpacity={0.85}>{<Text style={styles.saveSettingsBtnText}>Save Profile & Account Changes</Text>}</TouchableOpacity>}{
            /* Logout Button */
            <TouchableOpacity style={[styles.profileLogoutBtn, {
              paddingVertical: 9
            }]} onPress={onBackToOnboarding} activeOpacity={0.8}>{<Text style={[styles.profileLogoutBtnIcon, {
                fontSize: 14
              }]}>🚪</Text>}{<Text style={styles.profileLogoutBtnText}>Logout Account</Text>}</TouchableOpacity>}</View>}</View> : settingsSubScreen === 'profession' ?
        /* Separate Profession & Services Screen (Fixed Page, Profession List Scroll Only) */
        <View style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 20,
          backgroundColor: 'transparent'
        }}>{
          /* Fixed Header Bar with Left Arrow Back Button & Right Side Save Button */
          <View style={[styles.subScreenHeaderNavRow, {
            marginBottom: 10,
            paddingVertical: 4,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }]}>{
            /* Left Side: Back Arrow + Title */
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1
            }}>{
              /* Left Arrow Back Button */
              <TouchableOpacity style={styles.subScreenBackButton} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.7} hitSlop={{
                top: 15,
                bottom: 15,
                left: 15,
                right: 15
              }}>{<Text style={styles.subScreenBackArrowIcon}>←</Text>}</TouchableOpacity>}{
              /* Header Title */
              <Text style={[styles.subScreenNavTitleText, {
                fontSize: 16
              }]}>Profession & Services</Text>}</View>}{
            /* Right Side: Save Button */
            <TouchableOpacity style={{
              backgroundColor: '#FF6B00',
              paddingHorizontal: 16,
              paddingVertical: 7,
              borderRadius: 8
            }} onPress={handleSaveProfessions} activeOpacity={0.85}>{<Text style={{
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: 13
              }}>Save</Text>}</TouchableOpacity>}</View>}{
          /* Main Profession Card (Flex: 1) */
          <View style={[styles.profileSectionCard, {
            flex: 1,
            padding: 14,
            marginBottom: 0
          }]}>{
            /* Fixed Card Header Row */
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10
            }}>{<Text style={styles.sectionCardHeaderTitle}>Select Professions</Text>}{<View style={styles.verifiedBadgeSettingsRow}>{<Text style={{
                  fontSize: 12,
                  fontWeight: '800',
                  color: '#15803D'
                }}>{selectedProfessions.length} Selected</Text>}</View>}</View>}{
            /* ONLY Profession List is Scrollable */
            <ScrollView style={{
              flex: 1,
              marginVertical: 4
            }} showsVerticalScrollIndicator={true} contentContainerStyle={{
              gap: 8,
              paddingRight: 4
            }}>{[{
                id: 'electrician',
                title: 'Electrician',
                icon: '⚡',
                color: '#FEF9C3',
                category: 'Home Repair'
              }, {
                id: 'plumber',
                title: 'Plumber',
                icon: '🔧',
                color: '#EBF3FF',
                category: 'Home Repair'
              }, {
                id: 'carpenter',
                title: 'Carpenter',
                icon: '🔨',
                color: '#FFEDD5',
                category: 'Home Repair'
              }, {
                id: 'painter',
                title: 'Painter',
                icon: '🎨',
                color: '#FCE7F3',
                category: 'Home Repair'
              }, {
                id: 'ac_repair',
                title: 'AC Repair',
                icon: '❄️',
                color: '#CCFBF1',
                category: 'Appliances'
              }, {
                id: 'car_mechanic',
                title: 'Car Mechanic',
                icon: '🚗',
                color: '#E0F2FE',
                category: 'Vehicle Services'
              }, {
                id: 'bike_mechanic',
                title: 'Bike Mechanic',
                icon: '🏍️',
                color: '#F3E8FF',
                category: 'Vehicle Services'
              }, {
                id: 'home_cleaning',
                title: 'Home Cleaning',
                icon: '🧹',
                color: '#DCFCE7',
                category: 'Cleaning'
              }, {
                id: 'gardener',
                title: 'Gardener',
                icon: '🌱',
                color: '#DCFCE7',
                category: 'Outdoor'
              }, {
                id: 'mason',
                title: 'Mason & Brickwork',
                icon: '🧱',
                color: '#F3E8FF',
                category: 'Construction'
              }, {
                id: 'barber',
                title: 'Barber & Salon',
                icon: '✂️',
                color: '#FCE7F3',
                category: 'Personal Care'
              }, {
                id: 'labour',
                title: 'Construction Labour',
                icon: '👷',
                color: '#FEF9C3',
                category: 'Labour'
              }].map(item => {
                var isSelected = selectedProfessions.includes(item.title);
                return <TouchableOpacity style={[styles.professionCardSelectRow, isSelected && styles.professionCardSelectRowActive]} onPress={() => toggleProfessionSelection(item.title)} activeOpacity={0.8}>{
                  /* Logo Circle */
                  <View style={[styles.professionLogoCircle, {
                    backgroundColor: item.color
                  }]}>{<Text style={{
                      fontSize: 22
                    }}>{item.icon}</Text>}</View>}{
                  /* Profession Info */
                  <View style={{
                    flex: 1,
                    marginRight: 8
                  }}>{<Text style={styles.professionSelectTitle}>{item.title}</Text>}{<Text style={styles.professionSelectCategory}>{item.category}</Text>}</View>}{
                  /* Select/Selected Button */
                  <View style={[styles.professionSelectBtn, isSelected && styles.professionSelectBtnActive]}>{<Text style={[styles.professionSelectBtnText, isSelected && styles.professionSelectBtnTextActive]}>{isSelected ? "✓ Selected" : "+ Select"}</Text>}</View>}</TouchableOpacity>;
              })}</ScrollView>}</View>}</View> : settingsSubScreen === 'location' ?
        /* Separate Location & Service Radius Screen */
        <ScrollView contentContainerStyle={styles.profileTabScrollContent} showsVerticalScrollIndicator={false}>{
          /* Header Bar with Left Arrow Back Button */
          <View style={styles.subScreenHeaderNavRow}>{
            /* Left Arrow Back Button */
            <TouchableOpacity style={styles.subScreenBackButton} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.7} hitSlop={{
              top: 15,
              bottom: 15,
              left: 15,
              right: 15
            }}>{<Text style={styles.subScreenBackArrowIcon}>←</Text>}</TouchableOpacity>}{
            /* Header Title */
            <Text style={styles.subScreenNavTitleText}>Location & Service Radius</Text>}</View>}{
          /* Location Card */
          <View style={styles.profileSectionCard}>{<Text style={styles.settingsInputSubLabel}>Base Location / Area:</Text>}{<TextInput style={styles.settingsTextInputField} value={workerLocation} onChangeText={setWorkerLocation} placeholder="e.g. Sector 17, Chandigarh" />}{<Text style={[styles.settingsInputSubLabel, {
              marginTop: 12
            }]}>Service Distance Radius (km):</Text>}{<View style={styles.quickPillsGrid}>{[5, 10, 15, 25, 50].map(rad => <TouchableOpacity style={[styles.quickChoicePill, serviceRadius === rad && styles.quickChoicePillActive]} onPress={() => setServiceRadius(rad)} activeOpacity={0.7}>{<Text style={[styles.quickChoicePillText, serviceRadius === rad && styles.quickChoicePillTextActive]}>{rad} km</Text>}</TouchableOpacity>)}</View>}</View>}{
          /* Save Button */
          <TouchableOpacity style={[styles.saveSettingsBtn, {
            marginBottom: 30
          }]} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.85}>{<Text style={styles.saveSettingsBtnText}>Save Location Settings</Text>}</TouchableOpacity>}</ScrollView> : settingsSubScreen === 'portfolio' ?
        /* Separate Work Photos & Portfolio Screen */
        <ScrollView contentContainerStyle={styles.profileTabScrollContent} showsVerticalScrollIndicator={false}>{
          /* Header Bar with Left Arrow Back Button */
          <View style={styles.subScreenHeaderNavRow}>{
            /* Left Arrow Back Button */
            <TouchableOpacity style={styles.subScreenBackButton} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.7} hitSlop={{
              top: 15,
              bottom: 15,
              left: 15,
              right: 15
            }}>{<Text style={styles.subScreenBackArrowIcon}>←</Text>}</TouchableOpacity>}{
            /* Header Title */
            <Text style={styles.subScreenNavTitleText}>Work Photos & Portfolio</Text>}</View>}{
          /* Photos Card */
          <View style={styles.profileSectionCard}>{<View style={styles.portfolioGrid}>{workImages.map(img => <View style={styles.portfolioCardItem}>{<TouchableOpacity style={styles.portfolioDeleteBadge} onPress={() => handleRemoveWorkImage(img.id)}>{<Text style={styles.portfolioDeleteText}>✕</Text>}</TouchableOpacity>}{<View style={styles.portfolioIconCircle}>{<Text style={styles.portfolioEmoji}>{img.icon}</Text>}</View>}{<Text style={styles.portfolioTitleText} numberOfLines={1}>{img.title}</Text>}</View>)}</View>}{<View style={styles.addPhotoFormRow}>{<TextInput style={[styles.settingsTextInputField, {
                flex: 1,
                marginBottom: 0,
                marginRight: 8
              }]} value={newWorkImageTitle} onChangeText={setNewWorkImageTitle} placeholder="Add work photo title..." placeholderTextColor="#94A3B8" />}{<TouchableOpacity style={styles.addPhotoBtn} onPress={handleAddWorkImage} activeOpacity={0.8}>{<Text style={styles.addPhotoBtnText}>+ Add</Text>}</TouchableOpacity>}</View>}</View>}{
          /* Save Button */
          <TouchableOpacity style={[styles.saveSettingsBtn, {
            marginBottom: 30
          }]} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.85}>{<Text style={styles.saveSettingsBtnText}>Save Portfolio & Photos</Text>}</TouchableOpacity>}</ScrollView> : settingsSubScreen === 'availability' ?
        /* Separate Working Hours & Availability / Rates Screen */
        <ScrollView contentContainerStyle={styles.profileTabScrollContent} showsVerticalScrollIndicator={false}>{
          /* Header Bar with Left Arrow Back Button */
          <View style={styles.subScreenHeaderNavRow}>{
            /* Left Arrow Back Button */
            <TouchableOpacity style={styles.subScreenBackButton} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.7} hitSlop={{
              top: 15,
              bottom: 15,
              left: 15,
              right: 15
            }}>{<Text style={styles.subScreenBackArrowIcon}>←</Text>}</TouchableOpacity>}{
            /* Header Title */
            <Text style={styles.subScreenNavTitleText}>Rate per Hour</Text>}</View>}{
          /* Availability Card */
          <View style={styles.profileSectionCard}>{
            /* 1. Worker Active Status Toggle */
            <View style={styles.toggleRowBetween}>{<View>{<Text style={styles.toggleRowTitle}>Worker Active Status</Text>}{<Text style={styles.toggleRowSubtitle}>Toggle Online / Offline for incoming calls</Text>}</View>}{<TouchableOpacity style={[styles.toggleSwitchTrack, isAvailable && styles.toggleSwitchTrackActive]} onPress={handleToggleAvailability}>{<View style={[styles.toggleSwitchThumb, isAvailable && styles.toggleSwitchThumbActive]} />}</TouchableOpacity>}</View>}{
            /* Active Status Badge Pill */
            <View style={[styles.verifiedBadgeSettingsRow, {
              backgroundColor: isAvailable ? '#DCFCE7' : '#F1F5F9',
              marginTop: 8,
              marginBottom: 14,
              paddingHorizontal: 10,
              paddingVertical: 6
            }]}>{<Text style={{
                fontSize: 12,
                marginRight: 4
              }}>{isAvailable ? "🟢" : "🔴"}</Text>}{<Text style={{
                fontSize: 12,
                fontWeight: '800',
                color: isAvailable ? '#15803D' : '#64748B'
              }}>{isAvailable ? "ONLINE - Ready to accept job calls" : "OFFLINE - Not visible for calls"}</Text>}</View>}{
            /* Divider */
            <View style={styles.detailItemDivider} />}{
            /* 2. Set Rate Per Hour (₹/hr) */
            <Text style={[styles.settingsInputSubLabel, {
              marginTop: 4
            }]}>Set Rate Per Hour (₹/hr):</Text>}{<View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10
            }}>{<View style={[styles.settingsTextInputField, {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 0,
                paddingHorizontal: 12
              }]}>{<Text style={{
                  fontSize: 16,
                  fontWeight: '900',
                  color: '#FF5436',
                  marginRight: 6
                }}>₹</Text>}{<TextInput style={{
                  flex: 1,
                  fontSize: 15,
                  fontWeight: '800',
                  color: '#0F172A',
                  padding: 0
                }} value={hourlyRate} onChangeText={setHourlyRate} keyboardType="numeric" placeholder="e.g. 350" />}{<Text style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: '#64748B'
                }}>/ hr</Text>}</View>}</View>}{
            /* Quick Choice Rate Pills */
            <Text style={[styles.settingsInputSubLabel, {
              marginTop: 4
            }]}>Quick Select Rate:</Text>}{<View style={styles.quickPillsGrid}>{['50', '100', '150', '200', '250', '300', '350', '400'].map(rateVal => {
                var isSelected = hourlyRate === rateVal;
                return <TouchableOpacity style={[styles.quickChoicePill, isSelected && styles.quickChoicePillActive]} onPress={() => setHourlyRate(rateVal)} activeOpacity={0.7}>{<Text style={[styles.quickChoicePillText, isSelected && styles.quickChoicePillTextActive]}>₹{rateVal}/hr</Text>}</TouchableOpacity>;
              })}</View>}</View>}{
          /* Save Button */
          <TouchableOpacity style={[styles.saveSettingsBtn, {
            marginBottom: 30
          }]} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.85}>{<Text style={styles.saveSettingsBtnText}>Save Active Status & Rate</Text>}</TouchableOpacity>}</ScrollView> : settingsSubScreen === 'reviews' ? (() => {
          var allWorkerReviews = [{
            id: '1',
            name: 'Amit Sharma',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Excellent electrician! Solved short circuit issue quickly.',
            time: '2 days ago'
          }, {
            id: '2',
            name: 'Pooja Verma',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Very punctual and polite behavior. Work done neatly.',
            time: '4 days ago'
          }, {
            id: '3',
            name: 'Rajesh Kumar',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Great service! Fixed main switchboard in no time.',
            time: '1 week ago'
          }, {
            id: '4',
            name: 'Sunita Devi',
            rating: '⭐⭐⭐⭐',
            comment: 'Good work, came on time. Highly recommended.',
            time: '1 week ago'
          }, {
            id: '5',
            name: 'Vikas Singh',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Very professional worker. Charges are reasonable.',
            time: '2 weeks ago'
          }, {
            id: '6',
            name: 'Meena Gupta',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Changed complete wiring of my kitchen cleanly.',
            time: '2 weeks ago'
          }, {
            id: '7',
            name: 'Rahul Mehta',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Fixed inverter connection issue very quickly.',
            time: '3 weeks ago'
          }, {
            id: '8',
            name: 'Priya Nair',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Prompt response and great work ethic.',
            time: '3 weeks ago'
          }, {
            id: '9',
            name: 'Suresh Patel',
            rating: '⭐⭐⭐⭐',
            comment: 'Arrived within 30 mins of calling. Good job!',
            time: '1 month ago'
          }, {
            id: '10',
            name: 'Anita Roy',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Fixed ceiling fan regulator and light fixtures.',
            time: '1 month ago'
          }, {
            id: '11',
            name: 'Deepak Sharma',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'High quality repair work. Very satisfied.',
            time: '1 month ago'
          }, {
            id: '12',
            name: 'Neha Joshi',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Very neat work and polite behavior.',
            time: '2 months ago'
          }, {
            id: '13',
            name: 'Rohit Malhotra',
            rating: '⭐⭐⭐⭐',
            comment: 'Fixed MCB tripping issue efficiently.',
            time: '2 months ago'
          }, {
            id: '14',
            name: 'Kavita Singhania',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Polite worker, explained the fault clearly.',
            time: '2 months ago'
          }, {
            id: '15',
            name: 'Sanjay Yadav',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Excellent service at reasonable rates.',
            time: '3 months ago'
          }, {
            id: '16',
            name: 'Geeta Rani',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Fast service, fixed socket unit quickly.',
            time: '3 months ago'
          }, {
            id: '17',
            name: 'Manoj Ahuja',
            rating: '⭐⭐⭐⭐',
            comment: 'Good diagnostic skills for electrical faults.',
            time: '3 months ago'
          }, {
            id: '18',
            name: 'Ritu Chawla',
            rating: '⭐⭐⭐⭐⭐',
            comment: 'Highly skilled and professional. Will call again.',
            time: '4 months ago'
          }];
          var REVIEWS_PER_PAGE = 5;
          var totalReviewPages = Math.ceil(allWorkerReviews.length / REVIEWS_PER_PAGE);
          var safePage = Math.min(Math.max(1, reviewsCurrentPage), totalReviewPages);
          var currentReviewsList = allWorkerReviews.slice((safePage - 1) * REVIEWS_PER_PAGE, safePage * REVIEWS_PER_PAGE);
          return /* Separate Ratings & Reviews Screen */ <ScrollView contentContainerStyle={styles.profileTabScrollContent} showsVerticalScrollIndicator={false}>{
            /* Header Bar with Left Arrow Back Button */
            <View style={styles.subScreenHeaderNavRow}>{
              /* Left Arrow Back Button */
              <TouchableOpacity style={styles.subScreenBackButton} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.7} hitSlop={{
                top: 15,
                bottom: 15,
                left: 15,
                right: 15
              }}>{<Text style={styles.subScreenBackArrowIcon}>←</Text>}</TouchableOpacity>}{
              /* Header Title */
              <Text style={styles.subScreenNavTitleText}>Ratings & Reviews</Text>}</View>}{
            /* Reviews Card */
            <View style={styles.profileSectionCard}>{
              /* Score Summary Box */
              <View style={styles.reviewScoreSummaryBox}>{<Text style={styles.bigRatingScoreText}>4.8</Text>}{<View style={styles.starsRowGroup}>{<Text style={styles.starYellow}>⭐⭐⭐⭐⭐</Text>}{<Text style={styles.totalReviewsSubText}>Based on {allWorkerReviews.length} customer reviews</Text>}</View>}</View>}{
              /* Page Subtitle Row */
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 16,
                marginBottom: 10
              }}>{<Text style={styles.sectionCardHeaderTitle}>Recent Reviews</Text>}{<Text style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: '#64748B'
                }}>Page {safePage} of {totalReviewPages}</Text>}</View>}{
              /* 6 Reviews for current page */
              <View style={{
                gap: 10
              }}>{currentReviewsList.map(rev => <View style={styles.recentReviewItem}>{<View style={styles.reviewerTopRow}>{<Text style={styles.reviewerName}>{rev.name}</Text>}{<View style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>{<Text style={{
                        fontSize: 11,
                        color: '#94A3B8',
                        marginRight: 6
                      }}>{rev.time}</Text>}{<Text style={styles.reviewStarsMini}>{rev.rating}</Text>}</View>}</View>}{<Text style={styles.reviewCommentText}>{rev.comment}</Text>}</View>)}</View>}{
              /* Pagination Controls (Matching Customer Calls page style) */
              <View style={styles.paginationControlsContainer}>{
                /* Prev Button */
                <TouchableOpacity style={[styles.pageBtn, safePage === 1 && styles.pageBtnDisabled]} onPress={() => setReviewsCurrentPage(p => Math.max(1, p - 1))} disabled={safePage === 1} activeOpacity={0.75}>{<Text style={[styles.pageBtnText, safePage === 1 && styles.pageBtnTextDisabled]}>◀ Prev</Text>}</TouchableOpacity>}{
                /* Page Number Badge */
                <View style={styles.pageNumberBadge}>{<Text style={styles.pageNumberText}>Page {safePage} of {totalReviewPages}</Text>}</View>}{
                /* Next Button */
                <TouchableOpacity style={[styles.pageBtn, safePage >= totalReviewPages && styles.pageBtnDisabled]} onPress={() => setReviewsCurrentPage(p => Math.min(totalReviewPages, p + 1))} disabled={safePage >= totalReviewPages} activeOpacity={0.75}>{<Text style={[styles.pageBtnText, safePage >= totalReviewPages && styles.pageBtnTextDisabled]}>Next ▶</Text>}</TouchableOpacity>}</View>}</View>}</ScrollView>;
        })() : settingsSubScreen === 'notifications' ?
        /* Separate Notification Alerts Screen */
        <ScrollView contentContainerStyle={styles.profileTabScrollContent} showsVerticalScrollIndicator={false}>{
          /* Header Bar with Left Arrow Back Button */
          <View style={styles.subScreenHeaderNavRow}>{
            /* Left Arrow Back Button */
            <TouchableOpacity style={styles.subScreenBackButton} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.7} hitSlop={{
              top: 15,
              bottom: 15,
              left: 15,
              right: 15
            }}>{<Text style={styles.subScreenBackArrowIcon}>←</Text>}</TouchableOpacity>}{
            /* Header Title */
            <Text style={styles.subScreenNavTitleText}>Notification Alerts</Text>}</View>}{
          /* Notifications Card */
          <View style={styles.profileSectionCard}>{<View style={styles.toggleRowBetween}>{<View>{<Text style={styles.toggleRowTitle}>Incoming Call Sound</Text>}{<Text style={styles.toggleRowSubtitle}>Play ringtone when customer calls</Text>}</View>}{<TouchableOpacity style={[styles.toggleSwitchTrack, callAlertsEnabled && styles.toggleSwitchTrackActive]} onPress={() => setCallAlertsEnabled(!callAlertsEnabled)}>{<View style={[styles.toggleSwitchThumb, callAlertsEnabled && styles.toggleSwitchThumbActive]} />}</TouchableOpacity>}</View>}{<View style={styles.detailItemDivider} />}{<View style={styles.toggleRowBetween}>{<View>{<Text style={styles.toggleRowTitle}>Push Lead Notifications</Text>}{<Text style={styles.toggleRowSubtitle}>Instant alerts for nearby jobs</Text>}</View>}{<TouchableOpacity style={[styles.toggleSwitchTrack, soundAlertsEnabled && styles.toggleSwitchTrackActive]} onPress={() => setSoundAlertsEnabled(!soundAlertsEnabled)}>{<View style={[styles.toggleSwitchThumb, soundAlertsEnabled && styles.toggleSwitchThumbActive]} />}</TouchableOpacity>}</View>}</View>}{
          /* Save Button */
          <TouchableOpacity style={[styles.saveSettingsBtn, {
            marginBottom: 30
          }]} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.85}>{<Text style={styles.saveSettingsBtnText}>Save Notification Settings</Text>}</TouchableOpacity>}</ScrollView> : settingsSubScreen === 'privacy' ?
        /* Separate Privacy & Security Screen */
        <ScrollView contentContainerStyle={styles.profileTabScrollContent} showsVerticalScrollIndicator={false}>{
          /* Header Bar with Left Arrow Back Button */
          <View style={styles.subScreenHeaderNavRow}>{
            /* Left Arrow Back Button */
            <TouchableOpacity style={styles.subScreenBackButton} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.7} hitSlop={{
              top: 15,
              bottom: 15,
              left: 15,
              right: 15
            }}>{<Text style={styles.subScreenBackArrowIcon}>←</Text>}</TouchableOpacity>}{
            /* Header Title */
            <Text style={styles.subScreenNavTitleText}>Privacy & Security</Text>}</View>}{
          /* Privacy Card */
          <View style={styles.profileSectionCard}>{<View style={styles.toggleRowBetween}>{<View>{<Text style={styles.toggleRowTitle}>Public Profile Visibility</Text>}{<Text style={styles.toggleRowSubtitle}>Show profile to nearby searching customers</Text>}</View>}{<TouchableOpacity style={[styles.toggleSwitchTrack, privacyProfileVisible && styles.toggleSwitchTrackActive]} onPress={() => setPrivacyProfileVisible(!privacyProfileVisible)}>{<View style={[styles.toggleSwitchThumb, privacyProfileVisible && styles.toggleSwitchThumbActive]} />}</TouchableOpacity>}</View>}{<View style={styles.detailItemDivider} />}{<View style={styles.accountInfoRow}>{<View>{<Text style={styles.accountInfoLabel}>Active Login Device</Text>}{<Text style={styles.accountInfoValue}>Android App • Active Now</Text>}</View>}{<View style={styles.verifiedBadgeMini}>{<Text style={styles.verifiedBadgeMiniText}>Protected</Text>}</View>}</View>}</View>}{
          /* Save Button */
          <TouchableOpacity style={[styles.saveSettingsBtn, {
            marginBottom: 30
          }]} onPress={() => setSettingsSubScreen(null)} activeOpacity={0.85}>{<Text style={styles.saveSettingsBtnText}>Save Privacy Preferences</Text>}</TouchableOpacity>}</ScrollView> :
        /* Main Worker Settings Screen (Fixed Header & Top Card, Items Scroll Only) */
        <View style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 0,
          backgroundColor: 'transparent'
        }}>{
          /* Screen Title & Subtitle Header (Fixed) */
          <View style={{
            marginBottom: 10,
            marginTop: 4
          }}>{<Text style={{
              fontSize: 24,
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: 2
            }}>Worker Settings</Text>}{<Text style={{
              fontSize: 13,
              color: '#64748B',
              fontWeight: '500'
            }}>Manage your account, services and preferences</Text>}</View>}{
          /* Top Worker Profile Card (Fixed) */
          <TouchableOpacity style={[styles.workerProfileSettingsTopCard, {
            marginBottom: 10
          }]} onPress={() => setSettingsSubScreen('profileAccount')} activeOpacity={0.85}>{
            /* Avatar with camera icon badge */
            <View style={styles.workerAvatarSettingsWrapper}>{<Image source={require("../../assets/default_avatar.png")} style={styles.workerAvatarSettingsImg} />}{<View style={styles.cameraBadgeSettings}>{<Text style={{
                  fontSize: 11
                }}>📷</Text>}</View>}</View>}{
            /* Worker Info Column */
            <View style={{
              flex: 1,
              marginLeft: 14
            }}>{<Text style={{
                fontSize: 12,
                color: '#64748B',
                fontWeight: '500'
              }}>Welcome,</Text>}{<View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>{<Text style={{
                  fontSize: 17,
                  fontWeight: '800',
                  color: '#0F172A'
                }}>{workerName}</Text>}{<Text style={{
                  fontSize: 16,
                  marginLeft: 4
                }}>👋</Text>}</View>}{<Text style={{
                fontSize: 13,
                color: '#475569',
                fontWeight: '600',
                marginTop: 1
              }}>{workerProfession}</Text>}{
              /* Verified Badge */
              <View style={styles.verifiedBadgeSettingsRow}>{<Text style={{
                  fontSize: 11,
                  marginRight: 3
                }}>🛡️</Text>}{<Text style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: '#16A34A'
                }}>Verified Worker</Text>}</View>}{
              /* Location line */
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 3
              }}>{<Text style={{
                  fontSize: 12,
                  color: '#64748B',
                  marginRight: 3
                }}>📍</Text>}{<Text style={{
                  fontSize: 12,
                  color: '#64748B'
                }}>{workerLocation} • {serviceRadius} km away</Text>}</View>}</View>}{
            /* Right Chevron */
            <Text style={{
              fontSize: 18,
              color: '#94A3B8',
              fontWeight: 'bold'
            }}>❯</Text>}</TouchableOpacity>}{
          /* Scrollable List for 10 Settings Option Cards */
          <ScrollView style={{
            flex: 1
          }} contentContainerStyle={{
            gap: 5,
            paddingBottom: 160
          }} showsVerticalScrollIndicator={false}>{
            /* 1. Profile & Account */
            <View style={styles.settingsOptionCard}>{<TouchableOpacity style={styles.settingsCardHeaderRow} onPress={() => setSettingsSubScreen('profileAccount')} activeOpacity={0.75}>{<View style={[styles.settingsIconCircle, {
                  backgroundColor: '#DBEAFE'
                }]}>{<Text style={{
                    fontSize: 20
                  }}>👤</Text>}</View>}{<View style={{
                  flex: 1
                }}>{<Text style={styles.settingsCardTitleText}>Profile & Account</Text>}{<Text style={styles.settingsCardSubText}>Edit profile, change mobile, email</Text>}</View>}{<Text style={styles.settingsChevronText}>❯</Text>}</TouchableOpacity>}</View>}{
            /* 2. Profession & Services */
            <View style={styles.settingsOptionCard}>{<TouchableOpacity style={styles.settingsCardHeaderRow} onPress={() => setSettingsSubScreen('profession')} activeOpacity={0.75}>{<View style={[styles.settingsIconCircle, {
                  backgroundColor: '#FFEDD5'
                }]}>{<Text style={{
                    fontSize: 20
                  }}>🛠️</Text>}</View>}{<View style={{
                  flex: 1
                }}>{<Text style={styles.settingsCardTitleText}>Profession & Services</Text>}{<Text style={styles.settingsCardSubText}>Update profession, add services, multi-select</Text>}</View>}{<Text style={styles.settingsChevronText}>❯</Text>}</TouchableOpacity>}</View>}{
            /* 3. Location & Service Radius */
            <View style={styles.settingsOptionCard}>{<TouchableOpacity style={styles.settingsCardHeaderRow} onPress={() => setSettingsSubScreen('location')} activeOpacity={0.75}>{<View style={[styles.settingsIconCircle, {
                  backgroundColor: '#DCFCE7'
                }]}>{<Text style={{
                    fontSize: 20
                  }}>📍</Text>}</View>}{<View style={{
                  flex: 1
                }}>{<Text style={styles.settingsCardTitleText}>Location & Service Radius</Text>}{<Text style={styles.settingsCardSubText}>Set base location and service area</Text>}</View>}{<Text style={styles.settingsChevronText}>❯</Text>}</TouchableOpacity>}</View>}{
            /* 4. Work Photos & Portfolio */
            <View style={styles.settingsOptionCard}>{<TouchableOpacity style={styles.settingsCardHeaderRow} onPress={() => setSettingsSubScreen('portfolio')} activeOpacity={0.75}>{<View style={[styles.settingsIconCircle, {
                  backgroundColor: '#F3E8FF'
                }]}>{<Text style={{
                    fontSize: 20
                  }}>🖼️</Text>}</View>}{<View style={{
                  flex: 1
                }}>{<Text style={styles.settingsCardTitleText}>Work Photos & Portfolio</Text>}{<Text style={styles.settingsCardSubText}>Add and manage your work photos</Text>}</View>}{<Text style={styles.settingsChevronText}>❯</Text>}</TouchableOpacity>}</View>}{
            /* 5. Working Hours & Availability -> Worker Active Status & Hourly Rate */
            <View style={styles.settingsOptionCard}>{<TouchableOpacity style={styles.settingsCardHeaderRow} onPress={() => setSettingsSubScreen('availability')} activeOpacity={0.75}>{<View style={[styles.settingsIconCircle, {
                  backgroundColor: '#CCFBF1'
                }]}>{<Text style={{
                    fontSize: 20
                  }}>💵</Text>}</View>}{<View style={{
                  flex: 1
                }}>{<Text style={styles.settingsCardTitleText}>Rate per Hour</Text>}{<Text style={styles.settingsCardSubText}>{isAvailable ? "🟢 Active Online" : "🔴 Offline"} • ₹{hourlyRate}/hr</Text>}</View>}{<Text style={styles.settingsChevronText}>❯</Text>}</TouchableOpacity>}</View>}{
            /* 6. Ratings & Reviews */
            <View style={styles.settingsOptionCard}>{<TouchableOpacity style={styles.settingsCardHeaderRow} onPress={() => setSettingsSubScreen('reviews')} activeOpacity={0.75}>{<View style={[styles.settingsIconCircle, {
                  backgroundColor: '#FEF9C3'
                }]}>{<Text style={{
                    fontSize: 20
                  }}>⭐</Text>}</View>}{<View style={{
                  flex: 1
                }}>{<Text style={styles.settingsCardTitleText}>Ratings & Reviews</Text>}{<Text style={styles.settingsCardSubText}>View customer reviews and ratings</Text>}</View>}{<Text style={styles.settingsChevronText}>❯</Text>}</TouchableOpacity>}</View>}{
            /* 7. Call History */
            <View style={styles.settingsOptionCard}>{<TouchableOpacity style={styles.settingsCardHeaderRow} onPress={() => setActiveTab('calls')} activeOpacity={0.75}>{<View style={[styles.settingsIconCircle, {
                  backgroundColor: '#E0F2FE'
                }]}>{<Text style={{
                    fontSize: 20
                  }}>📞</Text>}</View>}{<View style={{
                  flex: 1
                }}>{<Text style={styles.settingsCardTitleText}>Call History</Text>}{<Text style={styles.settingsCardSubText}>View your recent calls</Text>}</View>}{<Text style={styles.settingsChevronText}>❯</Text>}</TouchableOpacity>}</View>}{
            /* 8. Notification Alerts */
            <View style={styles.settingsOptionCard}>{<TouchableOpacity style={styles.settingsCardHeaderRow} onPress={() => setSettingsSubScreen('notifications')} activeOpacity={0.75}>{<View style={[styles.settingsIconCircle, {
                  backgroundColor: '#FEE2E2'
                }]}>{<Text style={{
                    fontSize: 20
                  }}>🔔</Text>}</View>}{<View style={{
                  flex: 1
                }}>{<Text style={styles.settingsCardTitleText}>Notification Alerts</Text>}{<Text style={styles.settingsCardSubText}>Manage notification preferences</Text>}</View>}{<Text style={styles.settingsChevronText}>❯</Text>}</TouchableOpacity>}</View>}{
            /* 9. Privacy & Security */
            <View style={styles.settingsOptionCard}>{<TouchableOpacity style={styles.settingsCardHeaderRow} onPress={() => setSettingsSubScreen('privacy')} activeOpacity={0.75}>{<View style={[styles.settingsIconCircle, {
                  backgroundColor: '#F3E8FF'
                }]}>{<Text style={{
                    fontSize: 20
                  }}>🛡️</Text>}</View>}{<View style={{
                  flex: 1
                }}>{<Text style={styles.settingsCardTitleText}>Privacy & Security</Text>}{<Text style={styles.settingsCardSubText}>Change password, login sessions, privacy settings</Text>}</View>}{<Text style={styles.settingsChevronText}>❯</Text>}</TouchableOpacity>}</View>}{
            /* 10. Logout */
            <View style={styles.settingsOptionCard}>{<TouchableOpacity style={styles.settingsCardHeaderRow} onPress={onBackToOnboarding} activeOpacity={0.75}>{<View style={[styles.settingsIconCircle, {
                  backgroundColor: '#FEE2E2'
                }]}>{<Text style={{
                    fontSize: 20
                  }}>🚪</Text>}</View>}{<View style={{
                  flex: 1
                }}>{<Text style={[styles.settingsCardTitleText, {
                    color: '#EF4444'
                  }]}>Logout</Text>}{<Text style={styles.settingsCardSubText}>Sign out from your account</Text>}</View>}{<Text style={[styles.settingsChevronText, {
                  color: '#EF4444'
                }]}>❯</Text>}</TouchableOpacity>}</View>}</ScrollView>}</View>}{<View style={styles.bottomTabBarContainer}>{<TouchableOpacity style={styles.tabItem} onPress={handleDashboardPress} activeOpacity={0.75}>{<Text style={[styles.tabIcon, activeTab === 'dashboard' && styles.tabIconActive]}>🏠</Text>}{<Text style={[styles.tabLabel, activeTab === 'dashboard' && styles.tabLabelActive]}>Dashboard</Text>}{activeTab === 'dashboard' && <View style={styles.activeTabIndicator} />}</TouchableOpacity>}{<TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('calls')} activeOpacity={0.75}>{<Text style={[styles.tabIcon, activeTab === 'calls' && styles.tabIconActive]}>📞</Text>}{<Text style={[styles.tabLabel, activeTab === 'calls' && styles.tabLabelActive]}>Calls</Text>}{activeTab === 'calls' && <View style={styles.activeTabIndicator} />}</TouchableOpacity>}{<TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('profile')} activeOpacity={0.75}>{<Text style={[styles.tabIcon, activeTab === 'profile' && styles.tabIconActive]}>👤</Text>}{<Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}>Profile</Text>}{activeTab === 'profile' && <View style={styles.activeTabIndicator} />}</TouchableOpacity>}{<TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('settings')} activeOpacity={0.75}>{<Text style={[styles.tabIcon, activeTab === 'settings' && styles.tabIconActive]}>⚙️</Text>}{<Text style={[styles.tabLabel, activeTab === 'settings' && styles.tabLabelActive]}>Settings</Text>}{activeTab === 'settings' && <View style={styles.activeTabIndicator} />}</TouchableOpacity>}</View>}</SafeAreaView>}</ImageBackground>;
}

export default WorkerDashboardScreen;
