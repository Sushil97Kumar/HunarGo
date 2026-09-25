import { StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale, wp, hp, SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/responsive';

export const styles = StyleSheet.create({
  homeSafeArea: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  homeScrollContent: {
    paddingBottom: 90
  },
  homeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 42,
    paddingBottom: 6
  },
  homeIconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  homeMenuIconText: {
    fontSize: 24,
    color: '#1E293B',
    fontWeight: '600'
  },
  bellIconText: {
    fontSize: 22,
    color: '#1E293B'
  },
  bellDotBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444'
  },
  homeLogoLocationCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeMainLogo: {
    width: '90%',
    maxWidth: 420,
    height: scale(115),
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  homeLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  locationPinText: {
    fontSize: 14,
    marginRight: 4
  },
  locationCityName: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#1E293B'
  },
  locationArrowText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569'
  },
  homeSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 14,
    marginBottom: 18
  },
  homeSearchInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderRadius: 28,
    paddingLeft: 8,
    paddingRight: 16,
    height: 54,
    marginRight: 10,
    shadowColor: '#FF5436',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4
  },
  searchIconBadgeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF0ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  searchLensIcon: {
    fontSize: 16,
    color: '#FF5436'
  },
  homeSearchTextInput: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '600',
    color: '#0F172A'
  },
  filterBtnBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#FF5436',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF5436',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6
  },
  filterCustomIconWrapper: {
    width: 22,
    height: 18,
    justifyContent: 'space-between'
  },
  filterLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  filterLineBar: {
    height: 2.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 1.5
  },
  filterLineDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFFFFF'
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 12,
    marginTop: 8
  },
  sectionMainTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A'
  },
  viewAllBadge: {
    backgroundColor: '#FFF0ED',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12
  },
  viewAllLinkText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#FF5436'
  },
  categoryGridBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    marginBottom: 6
  },
  categoryTileCard: {
    width: '30%',
    marginHorizontal: '1.66%',
    marginBottom: 8,
    borderRadius: 14,
    paddingVertical: 7,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
  },
  categoryIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2
  },
  categoryTileIcon: {
    fontSize: 16
  },
  categoryTileTitle: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 13
  },
  bannerCardContainer: {
    marginHorizontal: 18,
    marginBottom: 18,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  bannerCardImage: {
    width: '100%',
    height: 155
  },
  carouselDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8
  },
  carouselDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 4
  },
  carouselDotActive: {
    backgroundColor: '#EF4444',
    width: 18
  },
  popularServicesHorizontalScroll: {
    paddingLeft: 18,
    paddingRight: 10,
    paddingBottom: 16
  },
  popularCardItem: {
    width: 145,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  },
  popularCardPhoto: {
    width: '100%',
    height: 100
  },
  popularCardLabelBox: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF'
  },
  popularCardTitleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center'
  },
  bottomNavigationCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 6
  },
  bottomNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  bottomNavIcon: {
    fontSize: 20,
    marginBottom: 2
  },
  bottomNavIconActive: {
    transform: [{
      scale: 1.1
    }]
  },
  bottomNavLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8'
  },
  bottomNavLabelActive: {
    color: '#EF4444',
    fontWeight: '800'
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  onboardingContainer: {
    flex: 1
  },
  topBarRight: {
    paddingHorizontal: 24,
    paddingTop: 12,
    alignItems: 'flex-end'
  },
  topBarCentered: {
    paddingHorizontal: 16,
    paddingTop: scale(76),
    paddingBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%'
  },
  backButtonAbsolute: {
    position: 'absolute',
    left: 18,
    top: scale(76),
    padding: 10,
    zIndex: 99,
    elevation: 99
  },
  backArrowText: {
    fontSize: 24,
    color: '#FF5436',
    fontWeight: '700'
  },
  skipButtonAbsolute: {
    position: 'absolute',
    right: 18,
    top: scale(76),
    paddingHorizontal: 12,
    paddingVertical: 6,
    zIndex: 99,
    elevation: 99
  },
  topLogoCompact: {
    width: '100%',
    maxWidth: 420,
    height: scale(145),
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  skipButton: {
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  skipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B'
  },
  loginContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40
  },
  textSectionLogin: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
    paddingHorizontal: 15
  },
  phoneInputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    width: '92%',
    marginVertical: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flagEmoji: {
    fontSize: 22,
    marginRight: 4
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#64748B',
    marginRight: 8
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A'
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 14
  },
  phoneTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500'
  },
  onboardingContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: scale(20)
  },
  onboardingContent2: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: scale(14)
  },
  textSection2: {
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 4,
    paddingHorizontal: 15
  },
  descriptionText2: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 320,
    marginTop: 2
  },
  illustrationContainer2: {
    width: '100%',
    maxHeight: scale(145),
    height: scale(130),
    marginTop: 0,
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  onboardingIllustration2: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 4,
    width: '94%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2
  },
  featureItem: {
    alignItems: 'center',
    flex: 1
  },
  featureIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3
  },
  featureEmoji: {
    fontSize: 17
  },
  featureText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 12.5
  },
  workerButton: {
    width: '90%',
    height: scale(44),
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 4
  },
  workerButtonText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700'
  },
  loginContainer: {
    marginTop: 4,
    marginBottom: 4,
    padding: 2
  },
  loginText: {
    fontSize: 14,
    color: '#475569'
  },
  loginLink: {
    color: '#FF5436',
    fontWeight: '700'
  },
  scriptBadge: {
    marginTop: 14,
    alignSelf: 'flex-end',
    marginRight: 10
  },
  scriptText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#94A3B8',
    textAlign: 'right',
    lineHeight: 15
  },
  logoContainer: {
    marginTop: 42,
    marginBottom: 5,
    alignItems: 'center'
  },
  onboardingLogo: {
    width: '90%',
    maxWidth: 390,
    height: scale(150),
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  illustrationContainer: {
    width: '100%',
    maxHeight: scale(240),
    height: scale(220),
    marginTop: 2,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  onboardingIllustration: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  textSection: {
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 6,
    paddingHorizontal: 15
  },
  titleLine1: {
    fontSize: moderateScale(26),
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: moderateScale(32)
  },
  titleLine2: {
    fontSize: moderateScale(26),
    fontWeight: '800',
    color: '#FF5436',
    textAlign: 'center',
    lineHeight: moderateScale(32),
    marginBottom: 6
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6
  },
  servicePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    marginHorizontal: 4,
    marginVertical: 4,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2
  },
  pillEmoji: {
    fontSize: 18,
    marginRight: 6
  },
  servicePillText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.1
  },
  descriptionText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 330,
    marginTop: 6,
    letterSpacing: 0.1
  },
  boldDarkGray: {
    fontWeight: '700',
    color: '#0F172A'
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 6
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 4
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF5436'
  },
  nextButton: {
    width: '88%',
    height: scale(52),
    backgroundColor: '#FF5436',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(18),
    marginBottom: 4,
    shadowColor: '#FF5436',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700'
  },
  disabledButton: {
    backgroundColor: '#FFB8AC',
    shadowOpacity: 0.1,
    elevation: 1
  },
  phoneHighlight: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginVertical: 4
  },
  otpContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 25,
    paddingHorizontal: 4
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
  },
  otpBoxFilled: {
    borderColor: '#FF5436',
    backgroundColor: '#FFFFFF'
  },
  otpBoxComplete: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
    color: '#15803D'
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  resendLabel: {
    fontSize: 13,
    color: '#64748B'
  },
  resendLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF5436'
  },
  resendDisabled: {
    color: '#FF8C78'
  },
  timerText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500'
  },
  // Toast Error Notification Styles
  toastContainer: {
    position: 'absolute',
    top: 70,
    right: 16,
    zIndex: 99999,
    elevation: 99999
  },
  toastContent: {
    backgroundColor: '#FEE2E2',
    // Light red color
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    // Soft red border
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    minWidth: 280,
    maxWidth: 340,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8
  },
  toastIcon: {
    fontSize: 18,
    marginRight: 10
  },
  toastText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#991B1B',
    // Dark red text
    flexShrink: 1,
    flexGrow: 1,
    marginRight: 8
  },
  toastCloseBtn: {
    padding: 4
  },
  toastCloseText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#991B1B'
  },
  inputCardError: {
    borderColor: '#EF4444',
    borderWidth: 1.5
  },
  fieldErrorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
    marginTop: 4,
    marginLeft: 2
  },
  // Complete Profile Screen Styles
  profileContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16
  },
  sectionContainer: {
    width: '100%',
    marginTop: 4
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4
  },
  requiredStar: {
    color: '#FF5436',
    fontWeight: '800'
  },
  optionalText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#64748B'
  },
  profileImageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 14,
    position: 'relative',
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#CBD5E1'
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderIcon: {
    fontSize: 20,
    color: '#94A3B8'
  },
  placeholderText: {
    fontSize: 8,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 1
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF5436',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4
  },
  cameraBadgeIcon: {
    fontSize: 10
  },
  uploadCard: {
    flex: 1,
    height: 60,
    backgroundColor: '#FFF5F2',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FFE2DB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  uploadCardUploaded: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0'
  },
  uploadIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: '#FF5436',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF'
  },
  uploadIconText: {
    fontSize: 14
  },
  uploadTextContainer: {
    flex: 1
  },
  uploadTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 1
  },
  uploadSubtitle: {
    fontSize: 10,
    color: '#64748B',
    lineHeight: 13
  },
  formInputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 42,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1
  },
  fieldIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#64748B'
  },
  formTextInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A'
  },
  clearIcon: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
    padding: 4
  },
  securityCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    width: '100%',
    marginVertical: 4
  },
  securityIconBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  securityEmoji: {
    fontSize: 14
  },
  securityTextContainer: {
    flex: 1
  },
  securityTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 1
  },
  securitySubtitle: {
    fontSize: 10,
    color: '#3B82F6',
    lineHeight: 13
  },
  // Select Professions Screen Styles
  professionsContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 50
  },
  categoryBlock: {
    width: '100%',
    marginTop: 8
  },
  categoryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingHorizontal: 2
  },
  categoryTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryEmoji: {
    fontSize: 15,
    marginRight: 6
  },
  categoryTitleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A'
  },
  countBadge: {
    backgroundColor: '#FFF0ED',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFDCD4'
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FF5436'
  },
  professionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4
  },
  professionCard: {
    width: '30.8%',
    marginHorizontal: '1.2%',
    marginBottom: 6,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
  },
  professionCardSelected: {
    borderColor: '#16A34A',
    borderWidth: 2
  },
  checkCircle: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  checkCircleActive: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A'
  },
  checkIconText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900'
  },
  professionIcon: {
    fontSize: 22,
    marginBottom: 3,
    marginTop: 2
  },
  professionCardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 14
  },
  fixedBottomContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 20,
    backgroundColor: 'transparent'
  },
  // Select Location & Distance Screen Styles
  locationScrollContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 2
  },
  locationSectionCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1
  },
  locationSectionLabel: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 3
  },
  locationInputBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 38
  },
  locationPinIcon: {
    fontSize: 14,
    marginRight: 6
  },
  locationTextInput: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: '600',
    color: '#0F172A'
  },
  suggestionsDropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginTop: 4,
    marginBottom: 6,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    maxHeight: 180
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  suggestionPinIcon: {
    fontSize: 14,
    marginRight: 6
  },
  suggestionText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A'
  },
  cityBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    marginLeft: 4
  },
  cityBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB'
  },
  useGpsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 4,
    marginTop: 4
  },
  useGpsIcon: {
    fontSize: 13,
    marginRight: 5
  },
  useGpsText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#2563EB'
  },
  distanceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  distanceMetricBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#86EFAC'
  },
  distanceMetricText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#15803D'
  },
  distanceHelperText: {
    fontSize: 10.5,
    color: '#64748B',
    lineHeight: 13,
    marginBottom: 4
  },
  boldDistanceText: {
    fontWeight: '700',
    color: '#0F172A'
  },
  presetPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -2,
    marginBottom: 4
  },
  distancePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginHorizontal: 2,
    marginVertical: 2
  },
  distancePillSelected: {
    backgroundColor: '#FF5436',
    borderColor: '#FF5436'
  },
  distancePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569'
  },
  distancePillTextSelected: {
    color: '#FFFFFF'
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  stepperBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1
  },
  stepperBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A'
  },
  stepperValueContainer: {
    flex: 1,
    alignItems: 'center'
  },
  stepperValueText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B'
  },
  mapRadarCard: {
    width: '100%',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    marginTop: 4
  },
  radarIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6
  },
  radarEmoji: {
    fontSize: 18
  },
  radarTextGroup: {
    flex: 1
  },
  radarTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 2
  },
  radarSubtitle: {
    fontSize: 11.5,
    color: '#047857',
    lineHeight: 16
  },
  radarHighlight: {
    fontWeight: '800',
    color: '#064E3B'
  },
  // Worker Dashboard Styles
  dashboardContainer: {
    flex: 1
  },
  dashboardTopHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 6
  },
  dashboardLogo: {
    width: 270,
    height: scale(95),
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  notificationBtn: {
    position: 'absolute',
    right: 18,
    top: 52,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  bellEmoji: {
    fontSize: 20
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 11,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF'
  },
  dashboardScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100
  },
  workerProfileHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 6
  },
  workerAvatarWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    position: 'relative',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FFDCD4'
  },
  workerAvatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 26
  },
  cameraBadgeSmall: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF5436',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF'
  },
  cameraIconSmall: {
    fontSize: 10
  },
  workerInfoContainer: {
    flex: 1
  },
  welcomeLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500'
  },
  workerNameRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  workerNameText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A'
  },
  waveEmoji: {
    fontSize: 18
  },
  workerProfessionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F52BA',
    marginVertical: 1
  },
  verifiedBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#86EFAC'
  },
  verifiedCheckIcon: {
    fontSize: 10,
    color: '#15803D',
    fontWeight: '900',
    marginRight: 3
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D'
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  locationMarkerIcon: {
    fontSize: 11,
    marginRight: 3
  },
  locationDetailText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600'
  },
  completionCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1
  },
  completionTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  completionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A'
  },
  completionPercentGroup: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  completionPercentText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A'
  },
  chevronIcon: {
    fontSize: 11,
    color: '#0F172A',
    fontWeight: '800'
  },
  progressBarTrack: {
    height: 5,
    width: '100%',
    backgroundColor: '#E2E8F0',
    borderRadius: 2.5,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF5436',
    borderRadius: 2.5
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  statCardItem: {
    width: '23.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 5,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1
  },
  statIconBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1
  },
  statEmoji: {
    fontSize: 13
  },
  statValue: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 1
  },
  statLabel: {
    fontSize: 9.5,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 11
  },
  availabilityBannerCard: {
    width: '100%',
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 4
  },
  greenPulseDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#D1FAE5'
  },
  availabilityTextGroup: {
    flex: 1
  },
  availabilityTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#065F46'
  },
  availabilitySubtitle: {
    fontSize: 9.5,
    color: '#047857',
    marginTop: 0
  },
  toggleSwitchTrack: {
    width: 36,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#CBD5E1',
    padding: 2,
    justifyContent: 'center',
    marginRight: 2
  },
  toggleSwitchTrackActive: {
    backgroundColor: '#10B981'
  },
  toggleSwitchThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2
  },
  toggleSwitchThumbActive: {
    transform: [{
      translateX: 16
    }]
  },
  chevronIconGrey: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '700'
  },
  dashboardSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  dashboardSectionTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A'
  },
  dashboardLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FF5436'
  },
  quickActionsScroll: {
    paddingBottom: 20
  },
  actionItemCard: {
    alignItems: 'center',
    marginRight: 14
  },
  actionIconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  actionEmoji: {
    fontSize: 26
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B'
  },
  callsListCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1
  },
  callItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  callDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    width: '100%'
  },
  customerAvatarBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  customerAvatarEmoji: {
    fontSize: 16
  },
  callInfoGroup: {
    flex: 1
  },
  customerNameRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  customerNameText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F172A'
  },
  miniVerifiedCheck: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '900'
  },
  callServiceText: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 0
  },
  callRightGroup: {
    alignItems: 'flex-end'
  },
  callTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },
  calendarMiniIcon: {
    fontSize: 9.5
  },
  callTimeText: {
    fontSize: 9.5,
    color: '#94A3B8',
    fontWeight: '600'
  },
  callStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8
  },
  callPhoneIcon: {
    fontSize: 9
  },
  callStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D'
  },
  chevronIconMini: {
    fontSize: 10,
    color: '#15803D',
    fontWeight: '800'
  },
  bottomTabBarContainer: {
    position: 'absolute',
    bottom: 52,
    left: 36,
    right: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    position: 'relative'
  },
  tabIcon: {
    fontSize: 15,
    color: '#94A3B8'
  },
  tabIconActive: {
    color: '#FF5436'
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 0
  },
  tabLabelActive: {
    color: '#FF5436',
    fontWeight: '800'
  },
  activeTabIndicator: {
    height: 2,
    width: 12,
    backgroundColor: '#FF5436',
    borderRadius: 1,
    marginTop: 1
  },
  // Customer Calls Tab Styles
  callsTabScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 125
  },
  callsTabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 14
  },
  callsTabTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A'
  },
  callsTabSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2
  },
  totalCallsBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE'
  },
  totalCallsBadgeText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#2563EB'
  },
  callSearchBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 38,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1
  },
  callSearchIcon: {
    fontSize: 18,
    marginRight: 8
  },
  callSearchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A'
  },
  callStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  callStatMiniCard: {
    width: '31%',
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  callStatEmoji: {
    fontSize: 18,
    marginBottom: 4
  },
  callStatNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A'
  },
  callStatText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2
  },
  filterPillsScroll: {
    marginBottom: 16
  },
  filterPillBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginRight: 8
  },
  filterPillBtnActive: {
    backgroundColor: '#FF5436',
    borderColor: '#FF5436'
  },
  filterPillText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#475569'
  },
  filterPillTextActive: {
    color: '#FFFFFF'
  },
  callsListContainer: {
    width: '100%'
  },
  customerCallCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  },
  customerCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  customerAvatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  customerAvatarEmojiBig: {
    fontSize: 24
  },
  customerMetaGroup: {
    flex: 1
  },
  customerNameTitleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  customerCardName: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A'
  },
  blueCheckBadge: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '700'
  },
  customerCardService: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#FF5436',
    marginTop: 2
  },
  callStatusPill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#86EFAC'
  },
  statusPillMissed: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5'
  },
  statusPillPending: {
    backgroundColor: '#FEF9C3',
    borderColor: '#FDE047'
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D'
  },
  statusTextMissed: {
    color: '#DC2626'
  },
  statusTextPending: {
    color: '#A16207'
  },
  callDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  detailIcon: {
    fontSize: 12,
    marginRight: 6
  },
  detailText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500'
  },
  callCardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9'
  },
  callBackActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 10,
    marginRight: 8,
    shadowColor: '#22C55E',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  },
  callBackActionBtnUrgent: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444'
  },
  actionBtnIcon: {
    fontSize: 14,
    marginRight: 6
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800'
  },
  messageActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingVertical: 10
  },
  messageBtnText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '700'
  },
  // Compact Customer Call Card & Pagination Styles
  compactCallCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1
  },
  compactCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8
  },
  compactAvatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  compactAvatarEmoji: {
    fontSize: 16
  },
  compactInfoGroup: {
    flex: 1
  },
  compactCustomerName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 1
  },
  compactDistanceRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  compactPinIcon: {
    fontSize: 10,
    marginRight: 3
  },
  compactDistanceText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B'
  },
  compactCallBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: '#22C55E',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1
  },
  callBackBtnIcon: {
    fontSize: 11,
    marginRight: 4
  },
  callBackBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800'
  },
  paginationControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 20,
    paddingHorizontal: 4
  },
  pageBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FF5436',
    shadowColor: '#FF5436',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  },
  pageBtnDisabled: {
    backgroundColor: '#E2E8F0',
    shadowOpacity: 0,
    elevation: 0
  },
  pageBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800'
  },
  pageBtnTextDisabled: {
    color: '#94A3B8'
  },
  pageNumberBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1'
  },
  pageNumberText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A'
  },
  // Worker Profile Tab Styles
  profileContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 4
  },
  profileTabScrollContent: {
    paddingHorizontal: 0,
    paddingBottom: 0
  },
  profileHeaderNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 10,
    paddingHorizontal: 4
  },
  profileNavBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  profileNavBackIcon: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '800',
    marginRight: 4
  },
  profileNavBackText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A'
  },
  profileNavTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A'
  },
  profileShareHeaderBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  profileShareHeaderIcon: {
    fontSize: 14
  },
  profileHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2
  },
  heroAvatarContainer: {
    position: 'relative',
    marginBottom: 6
  },
  heroAvatarImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FFDCD4'
  },
  heroCameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF5436',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF'
  },
  heroCameraIcon: {
    fontSize: 8
  },
  heroWorkerName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A'
  },
  heroWorkerSkill: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0F52BA',
    marginTop: 1,
    marginBottom: 2
  },
  heroBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },
  heroVerifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 10,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#86EFAC'
  },
  heroVerifiedCheck: {
    fontSize: 10,
    color: '#15803D',
    fontWeight: '900',
    marginRight: 3
  },
  heroVerifiedText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#15803D'
  },
  heroRatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE047'
  },
  heroRatingStar: {
    fontSize: 10,
    marginRight: 3
  },
  heroRatingText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#A16207'
  },
  heroStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  heroStatBox: {
    alignItems: 'center',
    flex: 1
  },
  heroStatVal: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0F172A'
  },
  heroStatLbl: {
    fontSize: 9,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 1
  },
  heroStatDivider: {
    width: 1,
    height: 18,
    backgroundColor: '#CBD5E1'
  },
  profileAvailabilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12
  },
  statusDotOnline: {
    backgroundColor: '#22C55E'
  },
  statusDotOffline: {
    backgroundColor: '#94A3B8'
  },
  availabilityInfoGroup: {
    flex: 1,
    marginRight: 10
  },
  availabilityCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A'
  },
  availabilityCardSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2
  },
  profileSectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1
  },
  sectionCardHeaderTitle: {
    fontSize: 14.5,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6
  },
  detailItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  detailItemIcon: {
    fontSize: 16,
    marginRight: 10,
    width: 20
  },
  detailItemTextGroup: {
    flex: 1
  },
  detailItemLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B'
  },
  detailItemValue: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 0
  },
  detailItemDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4
  },
  verifiedBadgeMini: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 7
  },
  verifiedBadgeMiniText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D'
  },
  servicesWrapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  serviceChipPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  serviceChipIcon: {
    fontSize: 14,
    marginRight: 6
  },
  serviceChipText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#334155'
  },
  verificationRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  verificationIconGreen: {
    fontSize: 20,
    marginRight: 12
  },
  verificationTextGroup: {
    flex: 1
  },
  verificationTitleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A'
  },
  verificationSubText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1
  },
  greenCheckMark: {
    fontSize: 16,
    color: '#22C55E',
    fontWeight: '900'
  },
  profileActionsContainer: {
    gap: 6,
    marginTop: 4,
    marginBottom: 6
  },
  profileEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5436',
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: '#FF5436',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  },
  profileEditBtnIcon: {
    fontSize: 14,
    marginRight: 6
  },
  profileEditBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  profileLogoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FECACA'
  },
  profileLogoutBtnIcon: {
    fontSize: 16,
    marginRight: 8
  },
  profileLogoutBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#EF4444'
  },
  // Settings & Portfolio Customization Styles
  settingsInputSubLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 6
  },
  settingsTextInputField: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10
  },
  quickPillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  quickChoicePill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1'
  },
  quickChoicePillActive: {
    backgroundColor: '#FF5436',
    borderColor: '#FF5436'
  },
  quickChoicePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569'
  },
  quickChoicePillTextActive: {
    color: '#FFFFFF'
  },
  professionCardSelectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 6
  },
  professionCardSelectRowActive: {
    borderColor: '#FF5436',
    backgroundColor: '#FFF5F2'
  },
  professionLogoCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  professionSelectTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#0F172A'
  },
  professionSelectCategory: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 1
  },
  professionSelectBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#F1F5F9'
  },
  professionSelectBtnActive: {
    backgroundColor: '#FF5436'
  },
  professionSelectBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569'
  },
  professionSelectBtnTextActive: {
    color: '#FFFFFF'
  },
  sectionHeaderFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  linkTextSmall: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#FF5436'
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4
  },
  portfolioCardItem: {
    width: '30%',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 7,
    alignItems: 'center',
    position: 'relative'
  },
  portfolioIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  portfolioEmoji: {
    fontSize: 17
  },
  portfolioTitleText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center'
  },
  portfolioDeleteBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  },
  portfolioDeleteText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900'
  },
  addPhotoFormRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  addPhotoBtn: {
    backgroundColor: '#FF5436',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addPhotoBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800'
  },
  // Worker Settings Screen Custom Styles
  workerProfileSettingsTopCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  workerAvatarSettingsWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    position: 'relative'
  },
  workerAvatarSettingsImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FF5436'
  },
  cameraBadgeSettings: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF5436',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF'
  },
  verifiedBadgeSettingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginVertical: 3
  },
  settingsOptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1
  },
  settingsCardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingsIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  settingsCardTitleText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A'
  },
  settingsCardSubText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1
  },
  settingsChevronText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#94A3B8',
    marginLeft: 6
  },
  saveSettingsBtn: {
    backgroundColor: '#FF5436',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },
  saveSettingsBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800'
  },
  // 6 Settings Categories Styles
  settingsItemHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  settingsItemIconEmoji: {
    fontSize: 22,
    marginRight: 14,
    width: 28,
    textAlign: 'center'
  },
  settingsItemTextGroup: {
    flex: 1
  },
  settingsItemTitleText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A'
  },
  settingsItemSubText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2
  },
  settingsSubPanel: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9'
  },
  toggleRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6
  },
  toggleRowTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A'
  },
  toggleRowSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 1
  },
  accountInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  accountInfoLabel: {
    fontSize: 11.5,
    color: '#64748B',
    fontWeight: '600'
  },
  accountInfoValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2
  },
  profileLogoutBtnInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    marginTop: 8
  },
  reviewScoreSummaryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDE047'
  },
  bigRatingScoreText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#A16207',
    marginRight: 14
  },
  starsRowGroup: {
    flex: 1
  },
  starYellow: {
    fontSize: 16,
    marginBottom: 2
  },
  totalReviewsSubText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#854D0E'
  },
  recentReviewItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  reviewerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A'
  },
  reviewStarsMini: {
    fontSize: 12
  },
  reviewCommentText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 16
  },
  // Home Screen Styles
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC'
  },
  scrollContent: {
    padding: 20
  },
  homeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    position: 'relative'
  },
  backBadge: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 12
  },
  backBadgeText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600'
  },
  homeLogo: {
    width: '60%',
    maxWidth: 200,
    height: scale(65),
    resizeMode: 'contain'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginBottom: 20
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A202C'
  },
  banner: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 24,
    marginBottom: 25
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 16,
    lineHeight: 20
  },
  bannerButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start'
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A'
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF5722',
    fontWeight: '600'
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25
  },
  serviceCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10
  },
  serviceIcon: {
    fontSize: 28,
    marginBottom: 8
  },
  serviceTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center'
  },
  ctaCard: {
    backgroundColor: '#FFF5F2',
    borderColor: '#FFD0C2',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20
  },
  ctaTextContainer: {
    marginBottom: 12
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C2410C',
    marginBottom: 4
  },
  ctaSubtitle: {
    fontSize: 13,
    color: '#9A3412'
  },
  ctaButton: {
    backgroundColor: '#EA580C',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14
  },
  subScreenHeaderNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16
  },
  subScreenBackButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 0
  },
  subScreenBackArrowIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF5436'
  },
  subScreenNavTitleText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A'
  },
  profileAccountTopSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9'
  },
  paginationBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    minWidth: 38,
    alignItems: 'center'
  },
  paginationBtnActive: {
    backgroundColor: '#FF5436',
    borderColor: '#FF5436'
  },
  paginationBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155'
  },
  paginationBtnTextActive: {
    color: '#FFFFFF'
  },
  paginationBtnDisabled: {
    opacity: 0.35
  },
  // Image Picker Modal Styles
  imagePickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end'
  },
  imagePickerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    gap: 12
  },
  imagePickerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6,
    textAlign: 'center'
  },
  imagePickerOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  imagePickerOptionIcon: {
    fontSize: 24,
    marginRight: 14
  },
  imagePickerOptionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A'
  },
  imagePickerOptionSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2
  },
  imagePickerCancelBtn: {
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    marginTop: 4
  },
  imagePickerCancelText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#64748B'
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 1
  },
  statInfoGroup: {
    marginLeft: 8
  },
  statValueText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A'
  },
  statLabelText: {
    fontSize: 9.5,
    fontWeight: '600',
    color: '#64748B'
  },
  callsSectionContainer: {
    marginTop: 8
  },
  callsSectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  callsSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A'
  },
  walletCardLarge: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    alignItems: 'center'
  },
  walletLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600'
  },
  walletBalanceText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginVertical: 8
  },
  rechargeBtn: {
    backgroundColor: '#FF5436',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 6
  },
  rechargeBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13
  },
  profileAvatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: 10
  },
  profileNameLarge: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginTop: 8
  },
  profileRoleText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2
  },
  settingsRow: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  settingsRowText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444'
  }
});
