// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import * as _reactNative from 'react-native';
import * as _jsxRuntime from 'react/jsx-runtime';
const _react = React;
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  PixelRatio,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const scale = (size: number) => Math.round((SCREEN_WIDTH / BASE_WIDTH) * size);
const verticalScale = (size: number) => Math.round((SCREEN_HEIGHT / BASE_HEIGHT) * size);
const moderateScale = (size: number, factor: number = 0.5) => Math.round(size + (scale(size) - size) * factor);
const wp = (percentage: number) => (SCREEN_WIDTH * percentage) / 100;
const hp = (percentage: number) => (SCREEN_HEIGHT * percentage) / 100;

const HunarGoLogo = require('./src/assets/logo.png');
const HeroIllustration = require('./src/assets/hero_illustration.png');
const Screen2Illustration = require('./src/assets/screen2_illustration.png');
const OnboardingBg = require('./src/assets/onboarding_bg.png');
const DefaultAvatar = require('./src/assets/default_avatar.png');

function App() {
  var isDarkMode = useColorScheme() === 'dark';
  var [currentScreen, setCurrentScreen] = useState('workerDashboard');
  var [userPhone, setUserPhone] = useState('');
  var [userRole, setUserRole] = useState('worker');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(require("react-native-safe-area-context").SafeAreaProvider, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.StatusBar, {
      barStyle: isDarkMode ? 'light-content' : 'dark-content'
    }), currentScreen === 'onboarding1' && /*#__PURE__*/(0, _jsxRuntime.jsx)(OnboardingScreen1, {
      onNext: () => setCurrentScreen('onboarding2'),
      onSkip: () => setCurrentScreen('home')
    }), currentScreen === 'onboarding2' && /*#__PURE__*/(0, _jsxRuntime.jsx)(OnboardingScreen2, {
      onSkip: () => setCurrentScreen('home'),
      onFinish: () => {
        setUserRole('customer');
        setCurrentScreen('workerLogin');
      },
      onWorker: () => {
        setUserRole('worker');
        setCurrentScreen('workerLogin');
      }
    }), currentScreen === 'workerLogin' && /*#__PURE__*/(0, _jsxRuntime.jsx)(WorkerLoginScreen, {
      onBack: () => setCurrentScreen('onboarding2'),
      onContinue: phone => {
        setUserPhone(phone);
        setCurrentScreen('otpVerification');
      }
    }), currentScreen === 'otpVerification' && /*#__PURE__*/(0, _jsxRuntime.jsx)(OtpVerificationScreen, {
      phoneNumber: userPhone,
      onBack: () => setCurrentScreen('workerLogin'),
      onVerify: () => setCurrentScreen('completeProfile')
    }), currentScreen === 'completeProfile' && /*#__PURE__*/(0, _jsxRuntime.jsx)(CompleteProfileScreen, {
      onBack: () => setCurrentScreen('otpVerification'),
      onNext: () => setCurrentScreen('selectLocationDistance')
    }), currentScreen === 'selectLocationDistance' && /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectLocationDistanceScreen, {
      onBack: () => setCurrentScreen('completeProfile'),
      userRole: userRole,
      onFinish: () => {
        if (userRole === 'customer') {
          setCurrentScreen('home');
        } else {
          setCurrentScreen('selectProfessions');
        }
      }
    }), currentScreen === 'selectProfessions' && /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectProfessionsScreen, {
      onBack: () => setCurrentScreen('selectLocationDistance'),
      onNext: () => setCurrentScreen('workerDashboard')
    }), currentScreen === 'workerDashboard' && /*#__PURE__*/(0, _jsxRuntime.jsx)(WorkerDashboardScreen, {
      onBackToOnboarding: () => setCurrentScreen('onboarding1')
    }), currentScreen === 'home' && /*#__PURE__*/(0, _jsxRuntime.jsx)(HomeScreen, {
      onBackToOnboarding: () => setCurrentScreen('onboarding1')
    })]
  });
}
function OnboardingScreen1({
  onNext,
  onSkip
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ImageBackground, {
    source: require("./src/assets/onboarding_bg.png"),
    style: styles.bgImage,
    resizeMode: "cover",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: styles.onboardingContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.topBarCentered,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
          source: require("./src/assets/logo.png"),
          style: styles.topLogoCompact,
          resizeMode: "contain"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: styles.skipButtonAbsolute,
          onPress: onSkip,
          activeOpacity: 0.7,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.skipText,
            children: "Skip"
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: styles.onboardingContent,
        showsVerticalScrollIndicator: false,
        scrollEnabled: false,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.illustrationContainer,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: require("./src/assets/hero_illustration.png"),
            style: styles.onboardingIllustration,
            resizeMode: "contain"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.textSection,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.titleLine1,
            children: "Skilled People,"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.titleLine2,
            children: "Just Around You"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.pillRow,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.servicePill, {
                backgroundColor: '#FFF4E5'
              }],
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.pillEmoji,
                children: "\uD83C\uDFE0"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.servicePillText,
                children: "Home Repairs"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.servicePill, {
                backgroundColor: '#EBF3FF'
              }],
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.pillEmoji,
                children: "\uD83E\uDDF9"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.servicePillText,
                children: "Cleaning"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.servicePill, {
                backgroundColor: '#F3EBF6'
              }],
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.pillEmoji,
                children: "\uD83D\uDC85"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.servicePillText,
                children: "Beauty"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.servicePill, {
                backgroundColor: '#EAF8F6'
              }],
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.pillEmoji,
                children: "\uD83D\uDC86"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.servicePillText,
                children: "Body Massage"
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
            style: styles.descriptionText,
            children: ["Find ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.boldDarkGray,
              children: "trusted & verified"
            }), " workers near your location instantly."]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.paginationContainer,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: [styles.dot, styles.activeDot]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.dot
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: [styles.nextButton, { marginTop: scale(2), marginBottom: scale(24) }],
          onPress: onNext,
          activeOpacity: 0.85,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.nextButtonText,
            children: "Next  \u2794"
          })
        })]
      })
      ]
    })
  });
}
function OnboardingScreen2({
  onSkip,
  onFinish,
  onWorker
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ImageBackground, {
    source: require("./src/assets/onboarding_bg.png"),
    style: styles.bgImage,
    resizeMode: "cover",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: styles.onboardingContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.topBarCentered,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
          source: require("./src/assets/logo.png"),
          style: styles.topLogoCompact,
          resizeMode: "contain"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: styles.skipButtonAbsolute,
          onPress: onSkip,
          activeOpacity: 0.7,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.skipText,
            children: "Skip"
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: styles.onboardingContent2,
        showsVerticalScrollIndicator: false,
        scrollEnabled: false,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.textSection2,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.titleLine1,
            children: "Skilled Help"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.titleLine2,
            children: "Near You"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.descriptionText2,
            children: "Find verified workers for your home, vehicle, personal and outdoor needs."
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.illustrationContainer2,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: require("./src/assets/screen2_illustration.png"),
            style: styles.onboardingIllustration2,
            resizeMode: "contain"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.featureCard,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.featureItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.featureIconBox, {
                backgroundColor: '#F3E8FF'
              }],
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.featureEmoji,
                children: "\uD83D\uDEE1\uFE0F"
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.featureText,
              children: ["Verified", '\n', "Workers"]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.featureItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.featureIconBox, {
                backgroundColor: '#DCFCE7'
              }],
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.featureEmoji,
                children: "\uD83D\uDCDE"
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.featureText,
              children: ["Direct", '\n', "Call"]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.featureItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.featureIconBox, {
                backgroundColor: '#FFEDD5'
              }],
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.featureEmoji,
                children: "\u20B9"
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.featureText,
              children: ["Transparent", '\n', "Rates"]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.featureItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.featureIconBox, {
                backgroundColor: '#E0F2FE'
              }],
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.featureEmoji,
                children: "\u26A1"
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.featureText,
              children: ["Quick & Easy", '\n', "Booking"]
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: styles.nextButton,
          onPress: onFinish,
          activeOpacity: 0.85,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.nextButtonText,
            children: "Get Started  \u2794"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: styles.workerButton,
          onPress: onWorker,
          activeOpacity: 0.85,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.workerButtonText,
            children: "I'm a Worker  \u2794"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: styles.loginContainer,
          onPress: onFinish,
          activeOpacity: 0.7,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
            style: styles.loginText,
            children: ["Already have an account? ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.loginLink,
              children: "Login"
            })]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.scriptBadge,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
            style: styles.scriptText,
            children: ["Local People", '\n', "Stronger Communities", '\n', "Better Lives"]
          })
        })]
      })]
    })
  });
}
function WorkerLoginScreen({
  onBack,
  onContinue
}) {
  var [phoneNumber, setPhoneNumber] = useState('');
  var isPhoneValid = phoneNumber.trim().length === 10;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ImageBackground, {
    source: require("./src/assets/onboarding_bg.png"),
    style: styles.bgImage,
    resizeMode: "cover",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
      style: styles.onboardingContainer,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.KeyboardAvoidingView, {
        style: { flex: 1 },
        behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : 'height',
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.topBarCentered,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            style: styles.backButtonAbsolute,
            onPress: onBack,
            activeOpacity: 0.7,
            hitSlop: {
              top: 20,
              bottom: 20,
              left: 20,
              right: 20
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.backArrowText,
              children: "\u2190"
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: require("./src/assets/logo.png"),
            style: styles.topLogoCompact,
            resizeMode: "contain"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
          contentContainerStyle: styles.loginContent,
          showsVerticalScrollIndicator: false,
          keyboardShouldPersistTaps: "handled",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.textSectionLogin,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.titleLine1,
              children: "Enter Your"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.titleLine2,
              children: "Mobile Number"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.descriptionText2,
              children: "We'll send you a verification code to continue."
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.phoneInputCard,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.countrySelector,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.flagEmoji,
                children: "\uD83C\uDDEE\uD83C\uDDF3"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.dropdownArrow,
                children: "\u2304"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.countryCode,
                children: "+91"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.verticalDivider
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
              style: styles.phoneTextInput,
              placeholder: "Enter mobile number",
              placeholderTextColor: "#94A3B8",
              keyboardType: "phone-pad",
              value: phoneNumber,
              onChangeText: text => setPhoneNumber(text.replace(/[^0-9]/g, '')),
              maxLength: 10
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            style: [styles.nextButton, !isPhoneValid && styles.disabledButton],
            onPress: () => {
              if (isPhoneValid) {
                onContinue(phoneNumber);
              }
            },
            disabled: !isPhoneValid,
            activeOpacity: 0.85,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.nextButtonText,
              children: "Continue  \u2794"
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            style: styles.loginContainer,
            onPress: () => isPhoneValid && onContinue(phoneNumber),
            activeOpacity: 0.7,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.loginText,
              children: ["Already have an account? ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.loginLink,
                children: "Login"
              })]
            })
          })]
        })]
      })
    })
  });
}
function OtpVerificationScreen({
  phoneNumber,
  onBack,
  onVerify
}) {
  var [otp, setOtp] = useState(['', '', '', '', '', '']);
  var [timer, setTimer] = useState(45);
  var inputRefs = useRef([]);
  var scrollViewRef = useRef(null);

  var scrollBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    if (timer <= 0) return;
    var interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    var showSub = _reactNative.Keyboard.addListener(
      _reactNative.Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setTimeout(scrollBottom, 50);
        setTimeout(scrollBottom, 150);
        setTimeout(scrollBottom, 300);
      }
    );
    return () => {
      showSub.remove();
    };
  }, []);

  var handleOtpChange = (text, index) => {
    var sanitized = text.replace(/[^0-9]/g, '');
    var newOtp = [...otp];
    if (sanitized.length > 1) {
      var pasted = sanitized.slice(0, 6).split('');
      for (var i = 0; i < 6; i++) {
        newOtp[i] = pasted[i] || '';
      }
      setOtp(newOtp);
      var lastFilled = Math.min(pasted.length - 1, 5);
      inputRefs.current[lastFilled]?.focus();
      setTimeout(scrollBottom, 50);
      return;
    }
    newOtp[index] = sanitized;
    setOtp(newOtp);
    if (sanitized && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    setTimeout(scrollBottom, 50);
  };
  var handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  var formattedPhone = phoneNumber.length === 10 ? `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}` : '+91 98765 43210';
  var isOtpComplete = otp.every(digit => digit.length === 1);
  var formatTimer = seconds => {
    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    return `(${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')})`;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ImageBackground, {
    source: require("./src/assets/onboarding_bg.png"),
    style: styles.bgImage,
    resizeMode: "cover",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
      style: styles.onboardingContainer,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.KeyboardAvoidingView, {
        style: { flex: 1 },
        behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : 'height',
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.topBarCentered,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            style: styles.backButtonAbsolute,
            onPress: onBack,
            activeOpacity: 0.7,
            hitSlop: {
              top: 20,
              bottom: 20,
              left: 20,
              right: 20
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.backArrowText,
              children: "\u2190"
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: require("./src/assets/logo.png"),
            style: styles.topLogoCompact,
            resizeMode: "contain"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
          ref: scrollViewRef,
          contentContainerStyle: styles.otpContent,
          showsVerticalScrollIndicator: false,
          keyboardShouldPersistTaps: "handled",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.textSectionLogin,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.titleLine1,
              children: "Verify Your"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.titleLine2,
              children: "Mobile Number"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.descriptionText2,
              children: "We've sent a 6-digit OTP to"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.phoneHighlight,
              children: formattedPhone
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.descriptionText2,
              children: "Please enter the code below to continue."
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.otpContainer,
            children: otp.map((digit, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
              ref: ref => {
                inputRefs.current[index] = ref;
              },
              style: [styles.otpBox, digit !== '' && styles.otpBoxFilled, isOtpComplete && styles.otpBoxComplete],
              keyboardType: "number-pad",
              maxLength: 1,
              value: digit,
              onChangeText: text => handleOtpChange(text, index),
              onKeyPress: e => handleKeyPress(e, index),
              onFocus: () => setTimeout(scrollBottom, 50),
              selectTextOnFocus: true
            }, index))
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.resendContainer,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.resendLabel,
              children: "Didn't receive the code? "
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              disabled: timer > 0,
              onPress: () => setTimer(45),
              activeOpacity: 0.7,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.resendLink, timer > 0 && styles.resendDisabledText],
                children: timer > 0 ? `Resend ${formatTimer(timer)}` : "Resend OTP"
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            style: [styles.nextButton, !isOtpComplete && styles.disabledButton],
            onPress: () => isOtpComplete && onVerify(otp.join('')),
            disabled: !isOtpComplete,
            activeOpacity: 0.85,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.nextButtonText,
              children: "Verify & Proceed  \u2794"
            })
          })]
        })]
      })
    })
  });
}
function CompleteProfileScreen({
  onBack,
  onNext
}) {
  var [hasProfileImage, setHasProfileImage] = useState(false);
  var [profileImageUri, setProfileImageUri] = useState(null);
  var [fullName, setFullName] = useState('');
  var [email, setEmail] = useState('');
  var [aadhaar, setAadhaar] = useState('');
  var [isInputFocused, setIsInputFocused] = useState(false);
  var [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  var scrollViewRef = useRef(null);

  var scrollBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    var showSub = _reactNative.Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
        setTimeout(scrollBottom, 50);
        setTimeout(scrollBottom, 200);
        setTimeout(scrollBottom, 400);
      }
    );
    var hideSub = _reactNative.Keyboard.addListener(
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

  var openGallery = async () => {
    try {
      var response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1
      });
      if (response && !response.didCancel && response.assets && response.assets.length > 0 && response.assets[0].uri) {
        setProfileImageUri(response.assets[0].uri);
        setHasProfileImage(true);
        setImageError(false);
      }
    } catch (e) {
      console.warn('Native image picker error or native module not linked yet:', e);
      setProfileImageUri('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80');
      setHasProfileImage(true);
      setImageError(false);
    }
  };

  // Validation error states
  var [imageError, setImageError] = useState(false);
  var [nameError, setNameError] = useState(false);

  // Toast animation state
  var [toastMessage, setToastMessage] = useState(null);
  var slideAnim = useRef(new _reactNative.Animated.Value(200)).current;
  var opacityAnim = useRef(new _reactNative.Animated.Value(0)).current;
  var timeoutRef = useRef(null);
  var triggerToast = message => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToastMessage(message);
    slideAnim.setValue(200);
    opacityAnim.setValue(0);
    _reactNative.Animated.parallel([_reactNative.Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }), _reactNative.Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    })]).start();

    // Auto hide after 3.5 seconds
    timeoutRef.current = setTimeout(() => {
      dismissToast();
    }, 3500);
  };
  var dismissToast = () => {
    _reactNative.Animated.parallel([_reactNative.Animated.timing(slideAnim, {
      toValue: 200,
      duration: 250,
      useNativeDriver: true
    }), _reactNative.Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    })]).start(() => {
      setToastMessage(null);
    });
  };
  var handleNext = () => {
    setImageError(false);
    setNameError(false);
    if (!fullName.trim()) {
      setNameError(true);
      triggerToast('Please fill your full name.');
      return;
    }
    onNext();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ImageBackground, {
    source: require("./src/assets/onboarding_bg.png"),
    style: styles.bgImage,
    resizeMode: "cover",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: styles.onboardingContainer,
      children: [toastMessage && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        style: [styles.toastContainer, {
          opacity: opacityAnim,
          transform: [{
            translateX: slideAnim
          }]
        }],
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.toastContent,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.toastIcon,
            children: "\u26A0\uFE0F"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.toastText,
            children: toastMessage
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: dismissToast,
            style: styles.toastCloseBtn,
            hitSlop: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.toastCloseText,
              children: "\u2715"
            })
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.topBarCentered,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
          source: require("./src/assets/logo.png"),
          style: styles.topLogoCompact,
          resizeMode: "contain"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
        style: { flex: 1, width: '100%' },
        behavior: Platform.OS === 'ios' ? 'padding' : undefined,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
          ref: scrollViewRef,
          contentContainerStyle: [
            styles.profileContent,
            (isKeyboardVisible || isInputFocused) && { paddingBottom: 280 }
          ],
          showsVerticalScrollIndicator: false,
          scrollEnabled: true,
          keyboardShouldPersistTaps: "handled",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: [styles.textSectionLogin, {
              marginBottom: 2
            }],
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.titleLine1,
              children: "Complete Your Profile"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.descriptionText2,
              children: "Help us get you verified and connect you with more customers."
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: [styles.sectionContainer, {
              marginTop: 4
            }],
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.inputLabel,
              children: ["Profile Image ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.optionalText,
                children: "(Optional)"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.profileImageRow,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: [styles.avatarWrapper, imageError && styles.inputCardError],
                children: [hasProfileImage ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
                  source: profileImageUri ? { uri: profileImageUri } : require("./src/assets/default_avatar.png"),
                  style: styles.avatarImage
                }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.avatarPlaceholder,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.placeholderIcon,
                    children: "\uD83D\uDC64"
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.placeholderText,
                    children: "No Image"
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  style: styles.cameraBadge,
                  activeOpacity: 0.8,
                  onPress: () => {
                    openGallery();
                    setImageError(false);
                  },
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.cameraBadgeIcon,
                    children: "\uD83D\uDCF7"
                  })
                })]
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                style: [styles.uploadCard, hasProfileImage && styles.uploadCardUploaded, imageError && styles.inputCardError],
                activeOpacity: 0.85,
                onPress: () => {
                  openGallery();
                  setImageError(false);
                },
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.uploadIconCircle,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.uploadIconText,
                    children: hasProfileImage ? '✓' : '📷'
                  })
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.uploadTextContainer,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.uploadTitle,
                    children: hasProfileImage ? 'Photo Uploaded!' : 'Upload your photo'
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.uploadSubtitle,
                    children: hasProfileImage ? 'Tap to choose another photo' : 'Choose photo directly from phone gallery'
                  })]
                })]
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.sectionContainer,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.inputLabel,
              children: ["Full Name ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.requiredStar,
                children: "*"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.formInputCard, nameError && styles.inputCardError],
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.fieldIcon,
                children: "\uD83D\uDC64"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                style: styles.formTextInput,
                placeholder: "Enter full name",
                placeholderTextColor: "#94A3B8",
                value: fullName,
                onFocus: () => {
                  setIsInputFocused(true);
                },
                onBlur: () => setIsInputFocused(false),
                onChangeText: text => {
                  setFullName(text);
                  if (text.trim()) setNameError(false);
                }
              }), fullName.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                onPress: () => setFullName(''),
                hitSlop: {
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10
                },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.clearIcon,
                  children: "\u2715"
                })
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.sectionContainer,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.inputLabel,
              children: ["Email Address ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.optionalText,
                children: "(Optional)"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.formInputCard,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.fieldIcon,
                children: "\u2709\uFE0F"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                style: styles.formTextInput,
                placeholder: "Enter email address",
                placeholderTextColor: "#94A3B8",
                keyboardType: "email-address",
                autoCapitalize: "none",
                value: email,
                onFocus: () => {
                  setIsInputFocused(true);
                  setTimeout(() => {
                    if (scrollViewRef.current) {
                      scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                  }, 150);
                },
                onBlur: () => setIsInputFocused(false),
                onChangeText: setEmail
              }), email.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                onPress: () => setEmail(''),
                hitSlop: {
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10
                },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.clearIcon,
                  children: "\u2715"
                })
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.sectionContainer,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.inputLabel,
              children: ["Aadhaar Card Number ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.optionalText,
                children: "(Optional)"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.formInputCard,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.fieldIcon,
                children: "\uD83E\uDEAA"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                style: styles.formTextInput,
                placeholder: "Enter 12 digit Aadhaar number",
                placeholderTextColor: "#94A3B8",
                keyboardType: "number-pad",
                maxLength: 12,
                value: aadhaar,
                onFocus: () => {
                  setIsInputFocused(true);
                  setTimeout(() => {
                    if (scrollViewRef.current) {
                      scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                  }, 150);
                },
                onBlur: () => setIsInputFocused(false),
                onChangeText: text => setAadhaar(text.replace(/[^0-9]/g, ''))
              }), aadhaar.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                onPress: () => setAadhaar(''),
                hitSlop: {
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10
                },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.clearIcon,
                  children: "\u2715"
                })
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.securityCard,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.securityIconBox,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.securityEmoji,
                children: "\uD83D\uDEE1\uFE0F"
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.securityTextContainer,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.securityTitle,
                children: "Your information is safe and secure."
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.securitySubtitle,
                children: "We use this only for verification and to build trust with our customers."
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            style: [styles.nextButton, { marginTop: scale(4), marginBottom: 10 }],
            onPress: handleNext,
            activeOpacity: 0.85,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.nextButtonText,
              children: "Next  \u2794"
            })
          })]
        })
      })]
    })
  });
}
function SelectProfessionsScreen({
  onBack,
  onNext
}) {
  var [selectedProfessions, setSelectedProfessions] = useState(['plumber']);
  var [toastMessage, setToastMessage] = useState(null);
  var slideAnim = useRef(new _reactNative.Animated.Value(200)).current;
  var opacityAnim = useRef(new _reactNative.Animated.Value(0)).current;
  var timeoutRef = useRef(null);

  var triggerToast = message => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToastMessage(message);
    slideAnim.setValue(200);
    opacityAnim.setValue(0);
    _reactNative.Animated.parallel([_reactNative.Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }), _reactNative.Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    })]).start();

    timeoutRef.current = setTimeout(() => {
      dismissToast();
    }, 3500);
  };

  var dismissToast = () => {
    _reactNative.Animated.parallel([_reactNative.Animated.timing(slideAnim, {
      toValue: 200,
      duration: 250,
      useNativeDriver: true
    }), _reactNative.Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    })]).start(() => {
      setToastMessage(null);
    });
  };

  var handleFinish = () => {
    if (selectedProfessions.length === 0) {
      triggerToast('Please select at least 1 profession to continue.');
      return;
    }
    onNext();
  };

  var isAnySelected = selectedProfessions.length > 0;
  var categories = [{
    id: 'home_repair',
    title: 'Home Repair',
    icon: '🏠',
    items: [{
      id: 'plumber',
      title: 'Plumber',
      icon: '🔧',
      color: '#EBF3FF'
    }, {
      id: 'electrician',
      title: 'Electrician',
      icon: '⚡',
      color: '#FEF9C3'
    }, {
      id: 'carpenter',
      title: 'Carpenter',
      icon: '🔨',
      color: '#FFEDD5'
    }, {
      id: 'painter',
      title: 'Painter',
      icon: '🎨',
      color: '#FCE7F3'
    }, {
      id: 'mason',
      title: 'Mason',
      icon: '🧱',
      color: '#F3E8FF'
    }, {
      id: 'technician',
      title: 'Technician',
      icon: '🧰',
      color: '#DCFCE7'
    }]
  }, {
    id: 'vehicle_services',
    title: 'Vehicle Services',
    icon: '🚗',
    items: [{
      id: 'car_mechanic',
      title: 'Car Mechanic',
      icon: '🚗',
      color: '#E0F2FE'
    }, {
      id: 'bike_mechanic',
      title: 'Bike Mechanic',
      icon: '🏍️',
      color: '#F3E8FF'
    }]
  }, {
    id: 'personal_beauty',
    title: 'Personal & Beauty',
    icon: '👩',
    items: [{
      id: 'barber',
      title: 'Barber',
      icon: '✂️',
      color: '#FCE7F3'
    }, {
      id: 'hair_stylist',
      title: 'Hair Stylist',
      icon: '💇',
      color: '#F3E8FF'
    }, {
      id: 'makeup_artist',
      title: 'Makeup Artist',
      icon: '💄',
      color: '#FFE4E6'
    }, {
      id: 'beautician',
      title: 'Beautician',
      icon: '💆',
      color: '#DCFCE7'
    }, {
      id: 'massage',
      title: 'Massage',
      icon: '👐',
      color: '#FFEDD5'
    }]
  }, {
    id: 'cleaning',
    title: 'Cleaning',
    icon: '🧹',
    items: [{
      id: 'bathroom_cleaning',
      title: 'Bathroom\nCleaning',
      icon: '🚽',
      color: '#E0F2FE'
    }, {
      id: 'home_cleaning',
      title: 'Home Cleaning',
      icon: '🧹',
      color: '#DCFCE7'
    }, {
      id: 'home_help',
      title: 'Home Help / Maid',
      icon: '👩‍🍳',
      color: '#FEF9C3'
    }]
  }, {
    id: 'outdoor_labour',
    title: 'Outdoor & Labour',
    icon: '🍂',
    items: [{
      id: 'gardener',
      title: 'Gardener',
      icon: '🌱',
      color: '#DCFCE7'
    }, {
      id: 'farm_labour',
      title: 'Farm Labour',
      icon: '🧑‍🌾',
      color: '#FEF9C3'
    }, {
      id: 'construction_labour',
      title: 'Construction\nLabour',
      icon: '👷',
      color: '#F3E8FF'
    }, {
      id: 'loading_unloading',
      title: 'Loading /\nUnloading',
      icon: '📦',
      color: '#E0F2FE'
    }, {
      id: 'daily_labour',
      title: 'Daily Labour',
      icon: '🧑‍🔧',
      color: '#FFE4E6'
    }]
  }];
  var toggleProfession = id => {
    setSelectedProfessions(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ImageBackground, {
    source: require("./src/assets/onboarding_bg.png"),
    style: styles.bgImage,
    resizeMode: "cover",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: styles.onboardingContainer,
      children: [toastMessage && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        style: [styles.toastContainer, {
          opacity: opacityAnim,
          transform: [{
            translateX: slideAnim
          }]
        }],
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.toastContent,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.toastIcon,
            children: "\u26A0\uFE0F"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.toastText,
            children: toastMessage
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: dismissToast,
            style: styles.toastCloseBtn,
            hitSlop: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.toastCloseText,
              children: "\u2715"
            })
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.topBarCentered,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: styles.backButtonAbsolute,
          onPress: onBack,
          activeOpacity: 0.7,
          hitSlop: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.backArrowText,
            children: "\u2190"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
          source: require("./src/assets/logo.png"),
          style: styles.topLogoCompact,
          resizeMode: "contain"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [styles.textSectionLogin, {
          marginTop: 4,
          marginBottom: 6
        }],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: styles.titleLine1,
          children: "Select Your Professions"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
          style: styles.descriptionText2,
          children: ["Select at least 1 profession to continue.", '\n', "You can select multiple."]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
        style: {
          flex: 1,
          width: '100%'
        },
        contentContainerStyle: styles.professionsContent,
        showsVerticalScrollIndicator: true,
        bounces: true,
        children: categories.map(category => {
          var selectedCount = category.items.filter(item => selectedProfessions.includes(item.id)).length;
          return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.categoryBlock,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.categoryHeaderRow,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.categoryTitleGroup,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.categoryEmoji,
                  children: category.icon
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.categoryTitleText,
                  children: category.title
                })]
              }), selectedCount > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.countBadge,
                children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                  style: styles.countBadgeText,
                  children: [selectedCount, " selected"]
                })
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.professionsGrid,
              children: category.items.map(item => {
                var isSelected = selectedProfessions.includes(item.id);
                return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: [styles.professionCard, {
                    backgroundColor: item.color
                  }, isSelected && styles.professionCardSelected],
                  onPress: () => toggleProfession(item.id),
                  activeOpacity: 0.75,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.checkCircle, isSelected && styles.checkCircleActive],
                    children: isSelected && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.checkIconText,
                      children: "\u2713"
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.professionIcon,
                    children: item.icon
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.professionCardTitle,
                    children: item.title
                  })]
                }, item.id);
              })
            })]
          }, category.id);
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.fixedBottomContainer, { marginTop: -30, marginBottom: 55 }],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: [styles.nextButton, !isAnySelected && styles.disabledButton, { marginTop: 0, marginBottom: 0 }],
          onPress: handleFinish,
          disabled: !isAnySelected,
          activeOpacity: 0.85,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.nextButtonText,
            children: "Finish & Start  \u2794"
          })
        })
      })]
    })
  });
}
function SelectLocationDistanceScreen({
  onBack,
  onFinish,
  userRole
}) {
  var [locationText, setLocationText] = useState('Connaught Place, New Delhi');
  var [distanceKm, setDistanceKm] = useState(15);
  var [isLocating, setIsLocating] = useState(false);
  var [showSuggestions, setShowSuggestions] = useState(false);
  var presetDistances = [5, 10, 15, 25, 50, 75];

  var LOCATION_DATABASE = [
    // Dehradun localities
    { city: 'Dehradun', name: 'Rajpur Road, Dehradun' },
    { city: 'Dehradun', name: 'Clock Tower, Dehradun' },
    { city: 'Dehradun', name: 'Clement Town, Dehradun' },
    { city: 'Dehradun', name: 'Vasant Vihar, Dehradun' },
    { city: 'Dehradun', name: 'Prem Nagar, Dehradun' },
    { city: 'Dehradun', name: 'Ballupur Chowk, Dehradun' },
    { city: 'Dehradun', name: 'Dharampur, Dehradun' },
    { city: 'Dehradun', name: 'ISBT Dehradun, Dehradun' },
    { city: 'Dehradun', name: 'Sahastradhara Road, Dehradun' },
    { city: 'Dehradun', name: 'Patel Nagar, Dehradun' },
    { city: 'Dehradun', name: 'Karanpur, Dehradun' },
    { city: 'Dehradun', name: 'Garhi Cantt, Dehradun' },
    { city: 'Dehradun', name: 'Majra, Dehradun' },
    { city: 'Dehradun', name: 'Rishikesh Highway, Dehradun' },

    // Zirakpur localities
    { city: 'Zirakpur', name: 'VIP Road, Zirakpur' },
    { city: 'Zirakpur', name: 'Baltana, Zirakpur' },
    { city: 'Zirakpur', name: 'Dhakoli, Zirakpur' },
    { city: 'Zirakpur', name: 'Chandigarh-Ambala Highway, Zirakpur' },
    { city: 'Zirakpur', name: 'Gazipur, Zirakpur' },
    { city: 'Zirakpur', name: 'Patiala Chowk, Zirakpur' },
    { city: 'Zirakpur', name: 'Lohgarh, Zirakpur' },
    { city: 'Zirakpur', name: 'Singhpura, Zirakpur' },
    { city: 'Zirakpur', name: 'Shatabdi Enclave, Zirakpur' },
    { city: 'Zirakpur', name: 'High Ground, Zirakpur' },

    // Chandigarh & Tricity
    { city: 'Chandigarh', name: 'Sector 17, Chandigarh' },
    { city: 'Chandigarh', name: 'Sector 35, Chandigarh' },
    { city: 'Chandigarh', name: 'Sector 22, Chandigarh' },
    { city: 'Chandigarh', name: 'Sector 43 ISBT, Chandigarh' },
    { city: 'Chandigarh', name: 'Industrial Area Phase 1, Chandigarh' },
    { city: 'Chandigarh', name: 'Elante Mall Area, Chandigarh' },
    { city: 'Chandigarh', name: 'Manimajra, Chandigarh' },
    { city: 'Mohali', name: 'Phase 3B2, Mohali' },
    { city: 'Mohali', name: 'Phase 7, Mohali' },
    { city: 'Mohali', name: 'Phase 5, Mohali' },
    { city: 'Mohali', name: 'Sector 70, Mohali' },
    { city: 'Mohali', name: 'Sector 82 IT City, Mohali' },
    { city: 'Mohali', name: 'Kharar Landran Road, Mohali' },
    { city: 'Panchkula', name: 'Sector 5, Panchkula' },
    { city: 'Panchkula', name: 'Sector 20, Panchkula' },
    { city: 'Panchkula', name: 'MDC Sector 5, Panchkula' },

    // Delhi NCR
    { city: 'Delhi', name: 'Connaught Place, New Delhi' },
    { city: 'Delhi', name: 'South Extension, New Delhi' },
    { city: 'Delhi', name: 'Lajpat Nagar, New Delhi' },
    { city: 'Delhi', name: 'Dwarka Sector 10, New Delhi' },
    { city: 'Delhi', name: 'Rohini Sector 7, New Delhi' },
    { city: 'Delhi', name: 'Karol Bagh, New Delhi' },
    { city: 'Delhi', name: 'Saket, New Delhi' },
    { city: 'Delhi', name: 'Janakpuri, New Delhi' },
    { city: 'Noida', name: 'Sector 18, Noida' },
    { city: 'Noida', name: 'Sector 62, Noida' },
    { city: 'Noida', name: 'Noida Extension (Greater Noida West)' },
    { city: 'Gurugram', name: 'Cyber City, Gurugram' },
    { city: 'Gurugram', name: 'Golf Course Road, Gurugram' },
    { city: 'Gurugram', name: 'MG Road, Gurugram' },
    { city: 'Gurugram', name: 'Sohna Road, Gurugram' },

    // Regional Hubs
    { city: 'Jaipur', name: 'Malviya Nagar, Jaipur' },
    { city: 'Jaipur', name: 'Vaishali Nagar, Jaipur' },
    { city: 'Jaipur', name: 'C-Scheme, Jaipur' },
    { city: 'Lucknow', name: 'Hazratganj, Lucknow' },
    { city: 'Lucknow', name: 'Gomti Nagar, Lucknow' },
    { city: 'Shimla', name: 'Mall Road, Shimla' },
    { city: 'Shimla', name: 'Sanjauli, Shimla' },
    { city: 'Haridwar', name: 'Har Ki Pauri, Haridwar' },
    { city: 'Rishikesh', name: 'Triveni Ghat, Rishikesh' },
    { city: 'Ludhiana', name: 'Model Town, Ludhiana' },
    { city: 'Ambala', name: 'Ambala Cantt, Ambala' }
  ];

  var getFilteredSuggestions = () => {
    var query = (locationText || '').trim().toLowerCase();
    if (!query) return LOCATION_DATABASE.slice(0, 6);

    var matches = LOCATION_DATABASE.filter(item =>
      item.name.toLowerCase().includes(query) || item.city.toLowerCase().includes(query)
    );

    if (matches.length < 3 && query.length >= 2) {
      var capitalized = locationText.trim().charAt(0).toUpperCase() + locationText.trim().slice(1);
      var customAdditions = [
        { city: capitalized, name: `${capitalized} Center Point` },
        { city: capitalized, name: `${capitalized} Main Market` },
        { city: capitalized, name: `${capitalized} Railway Station Area` },
        { city: capitalized, name: `${capitalized} Bus Stand Area` }
      ];
      matches = [...matches, ...customAdditions];
    }
    return matches.slice(0, 8);
  };

  var suggestions = getFilteredSuggestions();

  var handleCurrentLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setLocationText('Current GPS Location (Delhi NCR)');
      setIsLocating(false);
      setShowSuggestions(false);
    }, 800);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ImageBackground, {
    source: require("./src/assets/onboarding_bg.png"),
    style: styles.bgImage,
    resizeMode: "cover",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: styles.onboardingContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.topBarCentered,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: styles.backButtonAbsolute,
          onPress: onBack,
          activeOpacity: 0.7,
          hitSlop: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.backArrowText,
            children: "\u2190"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
          source: require("./src/assets/logo.png"),
          style: styles.topLogoCompact,
          resizeMode: "contain"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [styles.textSectionLogin, {
          marginTop: 4,
          marginBottom: 6
        }],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: styles.titleLine1,
          children: userRole === 'customer' ? "Your Current Location" : "Location & Service Radius"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: styles.descriptionText2,
          children: userRole === 'customer' ? "Enter or select your location to find skilled workers nearby." : "Select your center work location and how far you're willing to travel for jobs."
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        style: {
          flex: 1,
          width: '100%'
        },
        scrollEnabled: userRole === 'customer',
        contentContainerStyle: styles.locationScrollContent,
        showsVerticalScrollIndicator: false,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.locationSectionCard,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.locationSectionLabel,
            children: userRole === 'customer' ? "\uD83D\uDCCD Your Current Location" : "\uD83D\uDCCD Primary Work Location (Center Point)"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.locationInputBox,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.locationPinIcon,
              children: "\uD83D\uDCCD"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
              style: styles.locationTextInput,
              placeholder: "Enter city, area or landmark...",
              placeholderTextColor: "#94A3B8",
              value: locationText,
              onFocus: () => setShowSuggestions(true),
              onChangeText: text => {
                setLocationText(text);
                setShowSuggestions(true);
              }
            }), locationText.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              onPress: () => {
                setLocationText('');
                setShowSuggestions(true);
              },
              hitSlop: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.clearIcon,
                children: "\u2715"
              })
            })]
          }), showSuggestions && suggestions.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.suggestionsDropdown,
            children: suggestions.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
              key: index,
              style: styles.suggestionRow,
              onPress: () => {
                setLocationText(item.name);
                setShowSuggestions(false);
                _reactNative.Keyboard.dismiss();
              },
              activeOpacity: 0.7,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.suggestionPinIcon,
                children: "\uD83D\uDCCD"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.suggestionText,
                numberOfLines: 1,
                children: item.name
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.cityBadge,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.cityBadgeText,
                  children: item.city
                })
              })]
            }))
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
            style: styles.useGpsButton,
            onPress: handleCurrentLocation,
            activeOpacity: 0.8,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.useGpsIcon,
              children: isLocating ? '⏳' : '🎯'
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.useGpsText,
              children: isLocating ? 'Locating your GPS position...' : 'Use My Current GPS Location'
            })]
          })]
        }), userRole !== 'customer' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.locationSectionCard,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.distanceHeaderRow,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.locationSectionLabel,
              children: "\uD83D\uDCCF Distance Range (Radius)"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.distanceMetricBadge,
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                style: styles.distanceMetricText,
                children: [distanceKm, " km"]
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
            style: styles.distanceHelperText,
            children: ["You will receive customer job alerts within a ", /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.boldDistanceText,
              children: [distanceKm, " km"]
            }), " radius around your center location."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.presetPillRow,
            children: presetDistances.map(km => {
              var isSelected = distanceKm === km;
              return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                style: [styles.distancePill, isSelected && styles.distancePillSelected],
                onPress: () => setDistanceKm(km),
                activeOpacity: 0.75,
                children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                  style: [styles.distancePillText, isSelected && styles.distancePillTextSelected],
                  children: [km, " km"]
                })
              }, km);
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.stepperRow,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: styles.stepperBtn,
              onPress: () => setDistanceKm(prev => Math.max(1, prev - 1)),
              activeOpacity: 0.7,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.stepperBtnText,
                children: "\u2212"
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.stepperValueContainer,
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                style: styles.stepperValueText,
                children: [distanceKm, " Kilometers Radius"]
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: styles.stepperBtn,
              onPress: () => setDistanceKm(prev => Math.min(100, prev + 1)),
              activeOpacity: 0.7,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.stepperBtnText,
                children: "+"
              })
            })]
          })]
        }), userRole !== 'customer' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.mapRadarCard,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.radarIconCircle,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.radarEmoji,
              children: "\uD83D\uDCE1"
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.radarTextGroup,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.radarTitle,
              children: "Active Coverage Radar"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.radarSubtitle,
              children: ["Estimated ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.radarHighlight,
                children: "~850+ active customer requests"
              }), " available within ", distanceKm, " km."]
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: [styles.nextButton, { marginTop: scale(10), marginBottom: scale(16) }],
          onPress: onFinish,
          activeOpacity: 0.85,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.nextButtonText,
            children: userRole === 'customer' ? "Complete Profile  \u2794" : "Next  \u2794"
          })
        })]
      })]
    })
  });
}
function WorkerDashboardScreen({
  onBackToOnboarding
}) {
  var [isAvailable, setIsAvailable] = useState(true);
  var [activeTab, setActiveTab] = useState('dashboard');
  var [selectedProfessions, setSelectedProfessions] = useState(['Electrician', 'Plumber']);
  var workerProfession = selectedProfessions.join(', ');

  var toggleProfessionSelection = (title) => {
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
  var [workerName, setWorkerName] = useState('Raj Kumar');
  var [workerMobile, setWorkerMobile] = useState('+91 98765 43210');
  var [workerEmail, setWorkerEmail] = useState('raj.kumar@example.com');
  var [workerAadhaar, setWorkerAadhaar] = useState('5482 9102 3841');
  var [workerPassword, setWorkerPassword] = useState('••••••••');
  var [workingDays, setWorkingDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  var [workingHours, setWorkingHours] = useState('09:00 AM - 07:00 PM');
  var [emergencyAvailable, setEmergencyAvailable] = useState(true);
  var [privacyProfileVisible, setPrivacyProfileVisible] = useState(true);
  var [hourlyRate, setHourlyRate] = useState('350');
  var [reviewsCurrentPage, setReviewsCurrentPage] = useState(1);

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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ImageBackground, {
    source: require("./src/assets/onboarding_bg.png"),
    style: styles.bgImage,
    resizeMode: "cover",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: styles.dashboardContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.dashboardTopHeader,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          onPress: handleDashboardPress,
          activeOpacity: 0.8,
          style: { alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: require("./src/assets/logo.png"),
            style: styles.dashboardLogo,
            resizeMode: "contain"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
          style: styles.notificationBtn,
          activeOpacity: 0.7,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.bellEmoji,
            children: "\uD83D\uDD14"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.notificationDot
          })]
        })]
      }), activeTab === 'dashboard' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 125, gap: 10 },
        showsVerticalScrollIndicator: false,
        scrollEnabled: false,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
          style: styles.workerProfileHeaderCard,
          onPress: () => setActiveTab('profile'),
          activeOpacity: 0.85,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.workerAvatarWrapper,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
              source: require("./src/assets/default_avatar.png"),
              style: styles.workerAvatarImg
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.cameraBadgeSmall,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.cameraIconSmall,
                children: "\uD83D\uDCF7"
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.workerInfoContainer,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.welcomeLabel,
              children: "Welcome,"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.workerNameRow,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.workerNameText,
                children: "Raj Kumar"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.waveEmoji,
                children: " \uD83D\uDC4B"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.workerProfessionText,
              children: workerProfession
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.verifiedBadgeRow,
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.verifiedBadge,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.verifiedCheckIcon,
                  children: "\u2714"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.verifiedBadgeText,
                  children: "Verified Worker"
                })]
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.locationRow,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.locationMarkerIcon,
                children: "\uD83D\uDCCD"
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                style: styles.locationDetailText,
                children: [workerLocation, " \u2022 ", serviceRadius, " km radius"]
              })]
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
          style: styles.completionCard,
          onPress: () => setActiveTab('profile'),
          activeOpacity: 0.85,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.completionTopRow,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.completionLabel,
              children: "Profile Completion"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.completionPercentGroup,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.completionPercentText,
                children: "85%"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.chevronIcon,
                children: " \u276F"
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.progressBarTrack,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.progressBarFill, {
                width: '85%'
              }]
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.statsGrid,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.statCardItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.statIconBox, {
                backgroundColor: '#F3E8FF'
              }],
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.statEmoji,
                children: "\uD83D\uDC41\uFE0F"
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.statValue,
              children: "245"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.statLabel,
              children: "Profile Views"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.statCardItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.statIconBox, {
                backgroundColor: '#DCFCE7'
              }],
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.statEmoji,
                children: "\uD83D\uDCDE"
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.statValue,
              children: "38"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.statLabel,
              children: "Calls Received"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.statCardItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.statIconBox, {
                backgroundColor: '#E0F2FE'
              }],
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.statEmoji,
                children: "\uD83D\uDC65"
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.statValue,
              children: "21"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.statLabel,
              children: "Customers Served"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.statCardItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.statIconBox, {
                backgroundColor: '#FEF9C3'
              }],
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.statEmoji,
                children: "\u2B50"
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.statValue,
              children: "4.8"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.statLabel,
              children: "Rating"
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.availabilityBannerCard,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.greenPulseDot
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.availabilityTextGroup,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.availabilityTitle,
              children: "Available Now"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.availabilitySubtitle,
              children: "You are visible to customers"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            style: [styles.toggleSwitchTrack, isAvailable && styles.toggleSwitchTrackActive],
            onPress: () => setIsAvailable(!isAvailable),
            activeOpacity: 0.8,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.toggleSwitchThumb, isAvailable && styles.toggleSwitchThumbActive]
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.chevronIconGrey,
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.dashboardSectionHeader,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.dashboardSectionTitle,
            children: "Recent Calls"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: () => setActiveTab('calls'),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.dashboardLinkText,
              children: "View All \u276F"
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.callsListCard,
          children: recentCalls.slice(0, 3).map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            children: [index > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.callDivider
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
              style: styles.callItemRow,
              onPress: () => setActiveTab('calls'),
              activeOpacity: 0.7,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.customerAvatarBox,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.customerAvatarEmoji,
                  children: item.avatar
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.callInfoGroup,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.customerNameRow,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.customerNameText,
                    children: item.name
                  }), item.verified && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.miniVerifiedCheck,
                    children: " \u2714"
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.callServiceText,
                  children: item.service
                })]
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.callRightGroup,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.callTimeRow,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.calendarMiniIcon,
                    children: "\uD83D\uDCC5 "
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.callTimeText,
                    children: item.time
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.callStatusBadge,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.callPhoneIcon,
                    children: "\uD83D\uDCDE "
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.callStatusText,
                    children: item.status
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.chevronIconMini,
                    children: " \u276F"
                  })]
                })]
              })]
            })]
          }, item.id))
        })]
      }), activeTab === 'calls' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: styles.callsTabScrollContent,
        showsVerticalScrollIndicator: false,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.callsTabHeader,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.callsTabTitle,
              children: "Customer Calls"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.callsTabSubtitle,
              children: "Manage direct customer inquiries & requests"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.totalCallsBadge,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.totalCallsBadgeText,
              children: [allCustomerCalls.length, " Total Calls"]
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.callSearchBox,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.callSearchIcon,
            children: "\uD83D\uDD0D"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
            style: styles.callSearchInput,
            placeholder: "Search customer name or location...",
            placeholderTextColor: "#94A3B8",
            value: callSearch,
            onChangeText: text => {
              setCallSearch(text);
              setCurrentPage(1);
            }
          }), callSearch.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: () => {
              setCallSearch('');
              setCurrentPage(1);
            },
            hitSlop: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.clearIcon,
              children: "\u2715"
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.callsListContainer,
          children: paginatedCalls.map(item => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.compactCallCard,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.compactCardLeft,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.compactAvatarCircle,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.compactAvatarEmoji,
                  children: item.avatar
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.compactInfoGroup,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.compactCustomerName,
                  children: item.name
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.compactDistanceRow,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.compactPinIcon,
                    children: "\uD83D\uDCCD"
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.compactDistanceText,
                    children: item.distance
                  })]
                })]
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
              style: styles.compactCallBackBtn,
              activeOpacity: 0.8,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.callBackBtnIcon,
                children: "\uD83D\uDCDE"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.callBackBtnText,
                children: "Call Back"
              })]
            })]
          }, item.id))
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.paginationControlsContainer,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            style: [styles.pageBtn, currentPage === 1 && styles.pageBtnDisabled],
            onPress: () => setCurrentPage(prev => Math.max(1, prev - 1)),
            disabled: currentPage === 1,
            activeOpacity: 0.75,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: [styles.pageBtnText, currentPage === 1 && styles.pageBtnTextDisabled],
              children: "\u25C0 Prev"
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.pageNumberBadge,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.pageNumberText,
              children: ["Page ", currentPage, " of ", totalPages]
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            style: [styles.pageBtn, currentPage >= totalPages && styles.pageBtnDisabled],
            onPress: () => setCurrentPage(prev => Math.min(totalPages, prev + 1)),
            disabled: currentPage >= totalPages,
            activeOpacity: 0.75,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: [styles.pageBtnText, currentPage >= totalPages && styles.pageBtnDisabled],
              children: "Next \u25B6"
            })
          })]
        })]
      }), activeTab === 'profile' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.profileContainer,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.profileHeaderNav,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.profileNavTitle,
            children: "Worker Profile"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            style: styles.profileShareHeaderBtn,
            activeOpacity: 0.7,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.profileShareHeaderIcon,
              children: "\uD83D\uDD17"
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.profileHeroCard,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.heroAvatarContainer,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
              source: require("./src/assets/default_avatar.png"),
              style: styles.heroAvatarImg
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: styles.heroCameraBadge,
              activeOpacity: 0.8,
              onPress: () => setActiveTab('settings'),
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroCameraIcon,
                children: "\uD83D\uDCF7"
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.heroWorkerName,
            children: "Raj Kumar"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
            style: styles.heroWorkerSkill,
            children: ["\u26A1 Master ", workerProfession]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.heroBadgesRow,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.heroVerifiedPill,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroVerifiedCheck,
                children: "\u2714"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroVerifiedText,
                children: "Verified Worker"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.heroRatingPill,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroRatingStar,
                children: "\u2B50"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroRatingText,
                children: "4.8 (38 Reviews)"
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.heroStatsRow,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.heroStatBox,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroStatVal,
                children: "245"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroStatLbl,
                children: "Views"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.heroStatDivider
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.heroStatBox,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroStatVal,
                children: "38"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroStatLbl,
                children: "Calls"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.heroStatDivider
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.heroStatBox,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroStatVal,
                children: "21"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroStatLbl,
                children: "Served"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.heroStatDivider
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.heroStatBox,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroStatVal,
                children: "4.8\u2605"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.heroStatLbl,
                children: "Rating"
              })]
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [styles.profileTabScrollContent, { flex: 1, paddingBottom: 0 }],
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.profileSectionCard,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionCardHeaderTitle,
              children: "Personal & Contact Details"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.detailItemRow,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.detailItemIcon,
                children: "\uD83D\uDCF1"
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.detailItemTextGroup,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.detailItemLabel,
                  children: "Mobile Phone"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.detailItemValue,
                  children: "+91 98765 43210"
                })]
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.verifiedBadgeMini,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.verifiedBadgeMiniText,
                  children: "\u2714 Verified"
                })
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.detailItemDivider
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.detailItemRow,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.detailItemIcon,
                children: "\uD83D\uDCCD"
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.detailItemTextGroup,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.detailItemLabel,
                  children: "Location & Radius"
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                  style: styles.detailItemValue,
                  children: [workerLocation, " \u2022 ", serviceRadius, " km Radius"]
                })]
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.detailItemDivider
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.detailItemRow,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.detailItemIcon,
                children: "\uD83D\uDCBC"
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.detailItemTextGroup,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.detailItemLabel,
                  children: "Experience"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.detailItemValue,
                  children: "5+ Years Professional Experience"
                })]
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.detailItemDivider
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.detailItemRow,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.detailItemIcon,
                children: "\uD83D\uDCB5"
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.detailItemTextGroup,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.detailItemLabel,
                  children: "Service Rates"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.detailItemValue,
                  children: "\u20B9150 Visiting Charge \u2022 \u20B9250/hr Repair"
                })]
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.profileSectionCard,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.sectionHeaderFlexRow,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.sectionCardHeaderTitle,
                children: "Work Portfolio & Photos"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                onPress: () => setActiveTab('settings'),
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.linkTextSmall,
                  children: "+ Add Photo"
                })
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.portfolioGrid,
              children: workImages.map(img => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.portfolioCardItem,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.portfolioIconCircle,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.portfolioEmoji,
                    children: img.icon
                  })
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.portfolioTitleText,
                  numberOfLines: 1,
                  children: img.title
                })]
              }, img.id))
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.profileActionsContainer,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
              style: styles.profileEditBtn,
              onPress: () => setActiveTab('settings'),
              activeOpacity: 0.8,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.profileEditBtnIcon,
                children: "\u270F\uFE0F"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.profileEditBtnText,
                children: "Edit Profile & Settings"
              })]
            })]
          })]
        })]
      }), activeTab === 'settings' && (/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: { flex: 1 },
        children: settingsSubScreen === 'profileAccount' ? /* Separate Profile & Account Screen (Single Page, No Scroll) */ /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: { flex: 1, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 110, backgroundColor: 'transparent' },
          children: [
            /* Top Content Container */
            /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            children: [
                /* Header Bar with Left Arrow Back Button */
                /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.subScreenHeaderNavRow, { marginBottom: 12, paddingVertical: 4 }],
              children: [
                    /* Left Arrow Back Button */
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                style: styles.subScreenBackButton,
                onPress: () => setSettingsSubScreen(null),
                activeOpacity: 0.7,
                hitSlop: { top: 15, bottom: 15, left: 15, right: 15 },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.subScreenBackArrowIcon,
                  children: "←"
                })
              }),
                    /* Header Title */
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.subScreenNavTitleText,
                children: "Profile & Account"
              })
              ]
            }),

                /* Profile Avatar Summary Box (Horizontal Compact) */
                /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.profileAccountTopSummaryCard, { flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 12 }],
              children: [
                    /* Avatar with camera badge */
                    /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: [styles.workerAvatarSettingsWrapper, { width: 52, height: 52, borderRadius: 26, marginBottom: 0 }],
                children: [
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
                  source: require("./src/assets/default_avatar.png"),
                  style: { width: 52, height: 52, borderRadius: 26 }
                }),
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  style: [styles.cameraBadgeSettings, { width: 18, height: 18, borderRadius: 9, right: -2, bottom: -2 }],
                  activeOpacity: 0.8,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: { fontSize: 8 },
                    children: "📷"
                  })
                })
                ]
              }),
                    /* Name & Info Column */
                    /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: { marginLeft: 14, flex: 1 },
                children: [
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
                  children: workerName
                }),
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: { fontSize: 12, fontWeight: '600', color: '#475569', marginTop: 1 },
                  children: workerProfession
                }),
                        /* Verified Badge Pill */
                        /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: [styles.verifiedBadgeSettingsRow, { marginTop: 3, alignSelf: 'flex-start' }],
                  children: [
                            /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: { fontSize: 10, marginRight: 3 },
                    children: "🛡️"
                  }),
                            /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: { fontSize: 10, fontWeight: '700', color: '#16A34A' },
                    children: "Verified Worker"
                  })
                  ]
                })
                ]
              })
              ]
            }),

                /* Personal Details Section Card (Compact Inputs) */
                /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.profileSectionCard, { padding: 14, marginBottom: 0 }],
              children: [
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.sectionCardHeaderTitle, { fontSize: 15, marginBottom: 8 }],
                children: "Personal Details"
              }),

                    /* Full Name Field */
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.settingsInputSubLabel, { fontSize: 11, marginBottom: 2, marginTop: 0 }],
                children: "Full Name:"
              }),
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                style: [styles.settingsTextInputField, { paddingVertical: 6, paddingHorizontal: 10, fontSize: 13, marginBottom: 8, height: 38 }],
                value: workerName,
                onChangeText: setWorkerName,
                placeholder: "Enter full name"
              }),

                    /* Mobile Number Field */
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.settingsInputSubLabel, { fontSize: 11, marginBottom: 2, marginTop: 0 }],
                children: "Registered Mobile Number:"
              }),
                    /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
                children: [
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                  style: [styles.settingsTextInputField, { flex: 1, paddingVertical: 6, paddingHorizontal: 10, fontSize: 13, marginBottom: 0, height: 38, marginRight: 8 }],
                  value: workerMobile,
                  onChangeText: setWorkerMobile,
                  placeholder: "Enter mobile number"
                }),
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: [styles.verifiedBadgeMini, { paddingVertical: 4, paddingHorizontal: 8 }],
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: [styles.verifiedBadgeMiniText, { fontSize: 10 }],
                    children: "✔ Verified"
                  })
                })
                ]
              }),

                    /* Email Address Field */
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.settingsInputSubLabel, { fontSize: 11, marginBottom: 2, marginTop: 0 }],
                children: "Email Address:"
              }),
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                style: [styles.settingsTextInputField, { paddingVertical: 6, paddingHorizontal: 10, fontSize: 13, marginBottom: 8, height: 38 }],
                value: workerEmail,
                onChangeText: setWorkerEmail,
                placeholder: "Enter email address"
              }),

                    /* Aadhaar Card Number Field */
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.settingsInputSubLabel, { fontSize: 11, marginBottom: 2, marginTop: 0 }],
                children: "Aadhaar Card Number:"
              }),
                    /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
                children: [
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                  style: [styles.settingsTextInputField, { flex: 1, paddingVertical: 6, paddingHorizontal: 10, fontSize: 13, marginBottom: 0, height: 38, marginRight: 8 }],
                  value: workerAadhaar,
                  onChangeText: setWorkerAadhaar,
                  keyboardType: "numeric",
                  placeholder: "Enter 12-digit Aadhaar number"
                }),
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: [styles.verifiedBadgeMini, { paddingVertical: 4, paddingHorizontal: 8 }],
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: [styles.verifiedBadgeMiniText, { fontSize: 10 }],
                    children: "✔ Verified"
                  })
                })
                ]
              }),

                    /* Location Field */
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.settingsInputSubLabel, { fontSize: 11, marginBottom: 2, marginTop: 0 }],
                children: "Base Location / Address:"
              }),
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                style: [styles.settingsTextInputField, { paddingVertical: 6, paddingHorizontal: 10, fontSize: 13, marginBottom: 4, height: 38 }],
                value: workerLocation,
                onChangeText: setWorkerLocation,
                placeholder: "e.g. Sector 17, Chandigarh"
              })
              ]
            })
            ]
          }),

            /* Bottom Action Buttons */
            /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: { gap: 8, marginTop: 10 },
            children: [
                /* Save Button */
                /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: [styles.saveSettingsBtn, { marginTop: 0, paddingVertical: 11 }],
              onPress: () => setSettingsSubScreen(null),
              activeOpacity: 0.85,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.saveSettingsBtnText,
                children: "Save Profile & Account Changes"
              })
            }),

                /* Logout Button */
                /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
              style: [styles.profileLogoutBtn, { paddingVertical: 9 }],
              onPress: onBackToOnboarding,
              activeOpacity: 0.8,
              children: [
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.profileLogoutBtnIcon, { fontSize: 14 }],
                children: "🚪"
              }),
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.profileLogoutBtnText,
                children: "Logout Account"
              })
              ]
            })
            ]
          })
          ]
        })
          : settingsSubScreen === 'profession' ? (
          /* Separate Profession & Services Screen (Fixed Page, Profession List Scroll Only) */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: { flex: 1, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 110, backgroundColor: 'transparent' },
            children: [
              /* Fixed Header Bar with Left Arrow Back Button & Right Side Save Button */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.subScreenHeaderNavRow, { marginBottom: 10, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }],
              children: [
                  /* Left Side: Back Arrow + Title */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: { flexDirection: 'row', alignItems: 'center', flex: 1 },
                children: [
                      /* Left Arrow Back Button */
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  style: styles.subScreenBackButton,
                  onPress: () => setSettingsSubScreen(null),
                  activeOpacity: 0.7,
                  hitSlop: { top: 15, bottom: 15, left: 15, right: 15 },
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.subScreenBackArrowIcon,
                    children: "←"
                  })
                }),
                      /* Header Title */
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: [styles.subScreenNavTitleText, { fontSize: 16 }],
                  children: "Profession & Services"
                })
                ]
              }),
                  /* Right Side: Save Button */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                style: { backgroundColor: '#FF6B00', paddingHorizontal: 16, paddingVertical: 7, borderRadius: 8 },
                onPress: () => setSettingsSubScreen(null),
                activeOpacity: 0.85,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
                  children: "Save"
                })
              })
              ]
            }),

              /* Main Profession Card (Flex: 1) */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.profileSectionCard, { flex: 1, padding: 14, marginBottom: 0 }],
              children: [
                  /* Fixed Card Header Row */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.sectionCardHeaderTitle,
                  children: "Select Professions"
                }),
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.verifiedBadgeSettingsRow,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                    style: { fontSize: 12, fontWeight: '800', color: '#15803D' },
                    children: [selectedProfessions.length, " Selected"]
                  })
                })
                ]
              }),

                  /* ONLY Profession List is Scrollable */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
                style: { flex: 1, marginVertical: 4 },
                showsVerticalScrollIndicator: true,
                contentContainerStyle: { gap: 8, paddingRight: 4 },
                children: [
                  { id: 'electrician', title: 'Electrician', icon: '⚡', color: '#FEF9C3', category: 'Home Repair' },
                  { id: 'plumber', title: 'Plumber', icon: '🔧', color: '#EBF3FF', category: 'Home Repair' },
                  { id: 'carpenter', title: 'Carpenter', icon: '🔨', color: '#FFEDD5', category: 'Home Repair' },
                  { id: 'painter', title: 'Painter', icon: '🎨', color: '#FCE7F3', category: 'Home Repair' },
                  { id: 'ac_repair', title: 'AC Repair', icon: '❄️', color: '#CCFBF1', category: 'Appliances' },
                  { id: 'car_mechanic', title: 'Car Mechanic', icon: '🚗', color: '#E0F2FE', category: 'Vehicle Services' },
                  { id: 'bike_mechanic', title: 'Bike Mechanic', icon: '🏍️', color: '#F3E8FF', category: 'Vehicle Services' },
                  { id: 'home_cleaning', title: 'Home Cleaning', icon: '🧹', color: '#DCFCE7', category: 'Cleaning' },
                  { id: 'gardener', title: 'Gardener', icon: '🌱', color: '#DCFCE7', category: 'Outdoor' },
                  { id: 'mason', title: 'Mason & Brickwork', icon: '🧱', color: '#F3E8FF', category: 'Construction' },
                  { id: 'barber', title: 'Barber & Salon', icon: '✂️', color: '#FCE7F3', category: 'Personal Care' },
                  { id: 'labour', title: 'Construction Labour', icon: '👷', color: '#FEF9C3', category: 'Labour' }
                ].map(item => {
                  var isSelected = selectedProfessions.includes(item.title);
                  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                    style: [
                      styles.professionCardSelectRow,
                      isSelected && styles.professionCardSelectRowActive
                    ],
                    onPress: () => toggleProfessionSelection(item.title),
                    activeOpacity: 0.8,
                    children: [
                          /* Logo Circle */
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: [styles.professionLogoCircle, { backgroundColor: item.color }],
                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: { fontSize: 22 },
                        children: item.icon
                      })
                    }),
                          /* Profession Info */
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                      style: { flex: 1, marginRight: 8 },
                      children: [
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.professionSelectTitle,
                        children: item.title
                      }),
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.professionSelectCategory,
                        children: item.category
                      })
                      ]
                    }),
                          /* Select/Selected Button */
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: [
                        styles.professionSelectBtn,
                        isSelected && styles.professionSelectBtnActive
                      ],
                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: [
                          styles.professionSelectBtnText,
                          isSelected && styles.professionSelectBtnTextActive
                        ],
                        children: isSelected ? "✓ Selected" : "+ Select"
                      })
                    })
                    ]
                  }, item.id);
                })
              })
              ]
            })
            ]
          })
          ) : settingsSubScreen === 'location' ? (
          /* Separate Location & Service Radius Screen */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
            contentContainerStyle: styles.profileTabScrollContent,
            showsVerticalScrollIndicator: false,
            children: [
              /* Header Bar with Left Arrow Back Button */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.subScreenHeaderNavRow,
              children: [
                  /* Left Arrow Back Button */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                style: styles.subScreenBackButton,
                onPress: () => setSettingsSubScreen(null),
                activeOpacity: 0.7,
                hitSlop: { top: 15, bottom: 15, left: 15, right: 15 },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.subScreenBackArrowIcon,
                  children: "←"
                })
              }),
                  /* Header Title */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.subScreenNavTitleText,
                children: "Location & Service Radius"
              })
              ]
            }),

              /* Location Card */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.profileSectionCard,
              children: [
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.settingsInputSubLabel,
                children: "Base Location / Area:"
              }),
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                style: styles.settingsTextInputField,
                value: workerLocation,
                onChangeText: setWorkerLocation,
                placeholder: "e.g. Sector 17, Chandigarh"
              }),
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.settingsInputSubLabel, { marginTop: 12 }],
                children: "Service Distance Radius (km):"
              }),
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.quickPillsGrid,
                children: [5, 10, 15, 25, 50].map(rad => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: [styles.quickChoicePill, serviceRadius === rad && styles.quickChoicePillActive],
                  onPress: () => setServiceRadius(rad),
                  activeOpacity: 0.7,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                    style: [styles.quickChoicePillText, serviceRadius === rad && styles.quickChoicePillTextActive],
                    children: [rad, " km"]
                  })]
                }, rad))
              })
              ]
            }),

              /* Save Button */
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: [styles.saveSettingsBtn, { marginBottom: 30 }],
              onPress: () => setSettingsSubScreen(null),
              activeOpacity: 0.85,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.saveSettingsBtnText,
                children: "Save Location Settings"
              })
            })
            ]
          })
          ) : settingsSubScreen === 'portfolio' ? (
          /* Separate Work Photos & Portfolio Screen */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
            contentContainerStyle: styles.profileTabScrollContent,
            showsVerticalScrollIndicator: false,
            children: [
              /* Header Bar with Left Arrow Back Button */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.subScreenHeaderNavRow,
              children: [
                  /* Left Arrow Back Button */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                style: styles.subScreenBackButton,
                onPress: () => setSettingsSubScreen(null),
                activeOpacity: 0.7,
                hitSlop: { top: 15, bottom: 15, left: 15, right: 15 },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.subScreenBackArrowIcon,
                  children: "←"
                })
              }),
                  /* Header Title */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.subScreenNavTitleText,
                children: "Work Photos & Portfolio"
              })
              ]
            }),

              /* Photos Card */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.profileSectionCard,
              children: [
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.portfolioGrid,
                children: workImages.map(img => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.portfolioCardItem,
                  children: [
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                    style: styles.portfolioDeleteBadge,
                    onPress: () => handleRemoveWorkImage(img.id),
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.portfolioDeleteText,
                      children: "✕"
                    })
                  }),
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: styles.portfolioIconCircle,
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.portfolioEmoji,
                      children: img.icon
                    })
                  }),
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.portfolioTitleText,
                    numberOfLines: 1,
                    children: img.title
                  })
                  ]
                }, img.id))
              }),
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.addPhotoFormRow,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                  style: [styles.settingsTextInputField, { flex: 1, marginBottom: 0, marginRight: 8 }],
                  value: newWorkImageTitle,
                  onChangeText: setNewWorkImageTitle,
                  placeholder: "Add work photo title...",
                  placeholderTextColor: "#94A3B8"
                }),
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  style: styles.addPhotoBtn,
                  onPress: handleAddWorkImage,
                  activeOpacity: 0.8,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.addPhotoBtnText,
                    children: "+ Add"
                  })
                })
                ]
              })
              ]
            }),

              /* Save Button */
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: [styles.saveSettingsBtn, { marginBottom: 30 }],
              onPress: () => setSettingsSubScreen(null),
              activeOpacity: 0.85,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.saveSettingsBtnText,
                children: "Save Portfolio & Photos"
              })
            })
            ]
          })
          ) : settingsSubScreen === 'availability' ? (
          /* Separate Working Hours & Availability / Rates Screen */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
            contentContainerStyle: styles.profileTabScrollContent,
            showsVerticalScrollIndicator: false,
            children: [
              /* Header Bar with Left Arrow Back Button */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.subScreenHeaderNavRow,
              children: [
                  /* Left Arrow Back Button */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                style: styles.subScreenBackButton,
                onPress: () => setSettingsSubScreen(null),
                activeOpacity: 0.7,
                hitSlop: { top: 15, bottom: 15, left: 15, right: 15 },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.subScreenBackArrowIcon,
                  children: "←"
                })
              }),
                  /* Header Title */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.subScreenNavTitleText,
                children: "Rate per Hour"
              })
              ]
            }),

              /* Availability Card */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.profileSectionCard,
              children: [
                  /* 1. Worker Active Status Toggle */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.toggleRowBetween,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.toggleRowTitle,
                    children: "Worker Active Status"
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.toggleRowSubtitle,
                    children: "Toggle Online / Offline for incoming calls"
                  })
                  ]
                }),
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  style: [styles.toggleSwitchTrack, isAvailable && styles.toggleSwitchTrackActive],
                  onPress: () => setIsAvailable(!isAvailable),
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.toggleSwitchThumb, isAvailable && styles.toggleSwitchThumbActive]
                  })
                })
                ]
              }),

                  /* Active Status Badge Pill */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: [
                  styles.verifiedBadgeSettingsRow,
                  {
                    backgroundColor: isAvailable ? '#DCFCE7' : '#F1F5F9',
                    marginTop: 8,
                    marginBottom: 14,
                    paddingHorizontal: 10,
                    paddingVertical: 6
                  }
                ],
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: { fontSize: 12, marginRight: 4 },
                  children: isAvailable ? "🟢" : "🔴"
                }),
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: {
                    fontSize: 12,
                    fontWeight: '800',
                    color: isAvailable ? '#15803D' : '#64748B'
                  },
                  children: isAvailable ? "ONLINE - Ready to accept job calls" : "OFFLINE - Not visible for calls"
                })
                ]
              }),

                  /* Divider */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.detailItemDivider
              }),

                  /* 2. Set Rate Per Hour (₹/hr) */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.settingsInputSubLabel, { marginTop: 4 }],
                children: "Set Rate Per Hour (₹/hr):"
              }),
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: [
                    styles.settingsTextInputField,
                    {
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 0,
                      paddingHorizontal: 12
                    }
                  ],
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: { fontSize: 16, fontWeight: '900', color: '#FF5436', marginRight: 6 },
                    children: "₹"
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                    style: { flex: 1, fontSize: 15, fontWeight: '800', color: '#0F172A', padding: 0 },
                    value: hourlyRate,
                    onChangeText: setHourlyRate,
                    keyboardType: "numeric",
                    placeholder: "e.g. 350"
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: { fontSize: 13, fontWeight: '700', color: '#64748B' },
                    children: "/ hr"
                  })
                  ]
                })
                ]
              }),

                  /* Quick Choice Rate Pills */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.settingsInputSubLabel, { marginTop: 4 }],
                children: "Quick Select Rate:"
              }),
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.quickPillsGrid,
                children: ['50', '100', '150', '200', '250', '300', '350', '400'].map(rateVal => {
                  var isSelected = hourlyRate === rateVal;
                  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                    style: [styles.quickChoicePill, isSelected && styles.quickChoicePillActive],
                    onPress: () => setHourlyRate(rateVal),
                    activeOpacity: 0.7,
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                      style: [styles.quickChoicePillText, isSelected && styles.quickChoicePillTextActive],
                      children: ["₹", rateVal, "/hr"]
                    })
                  }, rateVal);
                })
              })
              ]
            }),

              /* Save Button */
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: [styles.saveSettingsBtn, { marginBottom: 30 }],
              onPress: () => setSettingsSubScreen(null),
              activeOpacity: 0.85,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.saveSettingsBtnText,
                children: "Save Active Status & Rate"
              })
            })
            ]
          })
          ) : settingsSubScreen === 'reviews' ? (() => {
            var allWorkerReviews = [
              { id: '1', name: 'Amit Sharma', rating: '⭐⭐⭐⭐⭐', comment: 'Excellent electrician! Solved short circuit issue quickly.', time: '2 days ago' },
              { id: '2', name: 'Pooja Verma', rating: '⭐⭐⭐⭐⭐', comment: 'Very punctual and polite behavior. Work done neatly.', time: '4 days ago' },
              { id: '3', name: 'Rajesh Kumar', rating: '⭐⭐⭐⭐⭐', comment: 'Great service! Fixed main switchboard in no time.', time: '1 week ago' },
              { id: '4', name: 'Sunita Devi', rating: '⭐⭐⭐⭐', comment: 'Good work, came on time. Highly recommended.', time: '1 week ago' },
              { id: '5', name: 'Vikas Singh', rating: '⭐⭐⭐⭐⭐', comment: 'Very professional worker. Charges are reasonable.', time: '2 weeks ago' },
              { id: '6', name: 'Meena Gupta', rating: '⭐⭐⭐⭐⭐', comment: 'Changed complete wiring of my kitchen cleanly.', time: '2 weeks ago' },
              { id: '7', name: 'Rahul Mehta', rating: '⭐⭐⭐⭐⭐', comment: 'Fixed inverter connection issue very quickly.', time: '3 weeks ago' },
              { id: '8', name: 'Priya Nair', rating: '⭐⭐⭐⭐⭐', comment: 'Prompt response and great work ethic.', time: '3 weeks ago' },
              { id: '9', name: 'Suresh Patel', rating: '⭐⭐⭐⭐', comment: 'Arrived within 30 mins of calling. Good job!', time: '1 month ago' },
              { id: '10', name: 'Anita Roy', rating: '⭐⭐⭐⭐⭐', comment: 'Fixed ceiling fan regulator and light fixtures.', time: '1 month ago' },
              { id: '11', name: 'Deepak Sharma', rating: '⭐⭐⭐⭐⭐', comment: 'High quality repair work. Very satisfied.', time: '1 month ago' },
              { id: '12', name: 'Neha Joshi', rating: '⭐⭐⭐⭐⭐', comment: 'Very neat work and polite behavior.', time: '2 months ago' },
              { id: '13', name: 'Rohit Malhotra', rating: '⭐⭐⭐⭐', comment: 'Fixed MCB tripping issue efficiently.', time: '2 months ago' },
              { id: '14', name: 'Kavita Singhania', rating: '⭐⭐⭐⭐⭐', comment: 'Polite worker, explained the fault clearly.', time: '2 months ago' },
              { id: '15', name: 'Sanjay Yadav', rating: '⭐⭐⭐⭐⭐', comment: 'Excellent service at reasonable rates.', time: '3 months ago' },
              { id: '16', name: 'Geeta Rani', rating: '⭐⭐⭐⭐⭐', comment: 'Fast service, fixed socket unit quickly.', time: '3 months ago' },
              { id: '17', name: 'Manoj Ahuja', rating: '⭐⭐⭐⭐', comment: 'Good diagnostic skills for electrical faults.', time: '3 months ago' },
              { id: '18', name: 'Ritu Chawla', rating: '⭐⭐⭐⭐⭐', comment: 'Highly skilled and professional. Will call again.', time: '4 months ago' }
            ];
            var REVIEWS_PER_PAGE = 5;
            var totalReviewPages = Math.ceil(allWorkerReviews.length / REVIEWS_PER_PAGE);
            var safePage = Math.min(Math.max(1, reviewsCurrentPage), totalReviewPages);
            var currentReviewsList = allWorkerReviews.slice((safePage - 1) * REVIEWS_PER_PAGE, safePage * REVIEWS_PER_PAGE);

            return /* Separate Ratings & Reviews Screen */ /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
              contentContainerStyle: styles.profileTabScrollContent,
              showsVerticalScrollIndicator: false,
              children: [
                /* Header Bar with Left Arrow Back Button */
                /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.subScreenHeaderNavRow,
                children: [
                    /* Left Arrow Back Button */
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  style: styles.subScreenBackButton,
                  onPress: () => setSettingsSubScreen(null),
                  activeOpacity: 0.7,
                  hitSlop: { top: 15, bottom: 15, left: 15, right: 15 },
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.subScreenBackArrowIcon,
                    children: "←"
                  })
                }),
                    /* Header Title */
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.subScreenNavTitleText,
                  children: "Ratings & Reviews"
                })
                ]
              }),

                /* Reviews Card */
                /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.profileSectionCard,
                children: [
                    /* Score Summary Box */
                    /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.reviewScoreSummaryBox,
                  children: [
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.bigRatingScoreText,
                    children: "4.8"
                  }),
                        /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.starsRowGroup,
                    children: [
                            /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.starYellow,
                      children: "⭐⭐⭐⭐⭐"
                    }),
                            /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                      style: styles.totalReviewsSubText,
                      children: ["Based on ", allWorkerReviews.length, " customer reviews"]
                    })
                    ]
                  })
                  ]
                }),

                    /* Page Subtitle Row */
                    /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 10 },
                  children: [
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.sectionCardHeaderTitle,
                    children: "Recent Reviews"
                  }),
                        /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                    style: { fontSize: 12, fontWeight: '700', color: '#64748B' },
                    children: ["Page ", safePage, " of ", totalReviewPages]
                  })
                  ]
                }),

                    /* 6 Reviews for current page */
                    /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: { gap: 10 },
                  children: currentReviewsList.map(rev => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.recentReviewItem,
                    children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                      style: styles.reviewerTopRow,
                      children: [
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.reviewerName,
                        children: rev.name
                      }),
                              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                        style: { flexDirection: 'row', alignItems: 'center' },
                        children: [
                                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                          style: { fontSize: 11, color: '#94A3B8', marginRight: 6 },
                          children: rev.time
                        }),
                                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                          style: styles.reviewStarsMini,
                          children: rev.rating
                        })
                        ]
                      })
                      ]
                    }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.reviewCommentText,
                      children: rev.comment
                    })
                    ]
                  }, rev.id))
                }),

                    /* Pagination Controls (Matching Customer Calls page style) */
                    /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.paginationControlsContainer,
                  children: [
                        /* Prev Button */
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                    style: [styles.pageBtn, safePage === 1 && styles.pageBtnDisabled],
                    onPress: () => setReviewsCurrentPage(p => Math.max(1, p - 1)),
                    disabled: safePage === 1,
                    activeOpacity: 0.75,
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: [styles.pageBtnText, safePage === 1 && styles.pageBtnTextDisabled],
                      children: "◀ Prev"
                    })
                  }),

                        /* Page Number Badge */
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: styles.pageNumberBadge,
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                      style: styles.pageNumberText,
                      children: ["Page ", safePage, " of ", totalReviewPages]
                    })
                  }),

                        /* Next Button */
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                    style: [styles.pageBtn, safePage >= totalReviewPages && styles.pageBtnDisabled],
                    onPress: () => setReviewsCurrentPage(p => Math.min(totalReviewPages, p + 1)),
                    disabled: safePage >= totalReviewPages,
                    activeOpacity: 0.75,
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: [styles.pageBtnText, safePage >= totalReviewPages && styles.pageBtnTextDisabled],
                      children: "Next ▶"
                    })
                  })
                  ]
                })
                ]
              })
              ]
            });
          })() : settingsSubScreen === 'notifications' ? (
          /* Separate Notification Alerts Screen */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
            contentContainerStyle: styles.profileTabScrollContent,
            showsVerticalScrollIndicator: false,
            children: [
              /* Header Bar with Left Arrow Back Button */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.subScreenHeaderNavRow,
              children: [
                  /* Left Arrow Back Button */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                style: styles.subScreenBackButton,
                onPress: () => setSettingsSubScreen(null),
                activeOpacity: 0.7,
                hitSlop: { top: 15, bottom: 15, left: 15, right: 15 },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.subScreenBackArrowIcon,
                  children: "←"
                })
              }),
                  /* Header Title */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.subScreenNavTitleText,
                children: "Notification Alerts"
              })
              ]
            }),

              /* Notifications Card */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.profileSectionCard,
              children: [
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.toggleRowBetween,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.toggleRowTitle,
                    children: "Incoming Call Sound"
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.toggleRowSubtitle,
                    children: "Play ringtone when customer calls"
                  })
                  ]
                }),
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  style: [styles.toggleSwitchTrack, callAlertsEnabled && styles.toggleSwitchTrackActive],
                  onPress: () => setCallAlertsEnabled(!callAlertsEnabled),
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.toggleSwitchThumb, callAlertsEnabled && styles.toggleSwitchThumbActive]
                  })
                })
                ]
              }),
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.detailItemDivider
              }),
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.toggleRowBetween,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.toggleRowTitle,
                    children: "Push Lead Notifications"
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.toggleRowSubtitle,
                    children: "Instant alerts for nearby jobs"
                  })
                  ]
                }),
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  style: [styles.toggleSwitchTrack, soundAlertsEnabled && styles.toggleSwitchTrackActive],
                  onPress: () => setSoundAlertsEnabled(!soundAlertsEnabled),
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.toggleSwitchThumb, soundAlertsEnabled && styles.toggleSwitchThumbActive]
                  })
                })
                ]
              })
              ]
            }),

              /* Save Button */
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: [styles.saveSettingsBtn, { marginBottom: 30 }],
              onPress: () => setSettingsSubScreen(null),
              activeOpacity: 0.85,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.saveSettingsBtnText,
                children: "Save Notification Settings"
              })
            })
            ]
          })
          ) : settingsSubScreen === 'privacy' ? (
          /* Separate Privacy & Security Screen */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
            contentContainerStyle: styles.profileTabScrollContent,
            showsVerticalScrollIndicator: false,
            children: [
              /* Header Bar with Left Arrow Back Button */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.subScreenHeaderNavRow,
              children: [
                  /* Left Arrow Back Button */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                style: styles.subScreenBackButton,
                onPress: () => setSettingsSubScreen(null),
                activeOpacity: 0.7,
                hitSlop: { top: 15, bottom: 15, left: 15, right: 15 },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.subScreenBackArrowIcon,
                  children: "←"
                })
              }),
                  /* Header Title */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.subScreenNavTitleText,
                children: "Privacy & Security"
              })
              ]
            }),

              /* Privacy Card */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.profileSectionCard,
              children: [
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.toggleRowBetween,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.toggleRowTitle,
                    children: "Public Profile Visibility"
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.toggleRowSubtitle,
                    children: "Show profile to nearby searching customers"
                  })
                  ]
                }),
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  style: [styles.toggleSwitchTrack, privacyProfileVisible && styles.toggleSwitchTrackActive],
                  onPress: () => setPrivacyProfileVisible(!privacyProfileVisible),
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.toggleSwitchThumb, privacyProfileVisible && styles.toggleSwitchThumbActive]
                  })
                })
                ]
              }),
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.detailItemDivider
              }),
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.accountInfoRow,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.accountInfoLabel,
                    children: "Active Login Device"
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.accountInfoValue,
                    children: "Android App • Active Now"
                  })
                  ]
                }),
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.verifiedBadgeMini,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.verifiedBadgeMiniText,
                    children: "Protected"
                  })
                })
                ]
              })
              ]
            }),

              /* Save Button */
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: [styles.saveSettingsBtn, { marginBottom: 30 }],
              onPress: () => setSettingsSubScreen(null),
              activeOpacity: 0.85,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.saveSettingsBtnText,
                children: "Save Privacy Preferences"
              })
            })
            ]
          })
          ) : (
          /* Main Worker Settings Screen (Fixed Header & Top Card, Items Scroll Only) */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: { flex: 1, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 0, backgroundColor: 'transparent' },
            children: [
              /* Screen Title & Subtitle Header (Fixed) */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: { marginBottom: 10, marginTop: 4 },
              children: [
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 2 },
                children: "Worker Settings"
              }),
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: { fontSize: 13, color: '#64748B', fontWeight: '500' },
                children: "Manage your account, services and preferences"
              })
              ]
            }),

              /* Top Worker Profile Card (Fixed) */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
              style: [styles.workerProfileSettingsTopCard, { marginBottom: 10 }],
              onPress: () => setSettingsSubScreen('profileAccount'),
              activeOpacity: 0.85,
              children: [
                  /* Avatar with camera icon badge */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.workerAvatarSettingsWrapper,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
                  source: require("./src/assets/default_avatar.png"),
                  style: styles.workerAvatarSettingsImg
                }),
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.cameraBadgeSettings,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: { fontSize: 11 },
                    children: "📷"
                  })
                })
                ]
              }),
                  /* Worker Info Column */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: { flex: 1, marginLeft: 14 },
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: { fontSize: 12, color: '#64748B', fontWeight: '500' },
                  children: "Welcome,"
                }),
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: { flexDirection: 'row', alignItems: 'center' },
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: { fontSize: 17, fontWeight: '800', color: '#0F172A' },
                    children: workerName
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: { fontSize: 16, marginLeft: 4 },
                    children: "👋"
                  })
                  ]
                }),
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: { fontSize: 13, color: '#475569', fontWeight: '600', marginTop: 1 },
                  children: workerProfession
                }),
                      /* Verified Badge */
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.verifiedBadgeSettingsRow,
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: { fontSize: 11, marginRight: 3 },
                    children: "🛡️"
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: { fontSize: 11, fontWeight: '700', color: '#16A34A' },
                    children: "Verified Worker"
                  })
                  ]
                }),
                      /* Location line */
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: { fontSize: 12, color: '#64748B', marginRight: 3 },
                    children: "📍"
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                    style: { fontSize: 12, color: '#64748B' },
                    children: [workerLocation, " • ", serviceRadius, " km away"]
                  })
                  ]
                })
                ]
              }),
                  /* Right Chevron */
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: { fontSize: 18, color: '#94A3B8', fontWeight: 'bold' },
                children: "❯"
              })
              ]
            }),

              /* Scrollable List for 10 Settings Option Cards */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
              style: { flex: 1 },
              contentContainerStyle: { gap: 5, paddingBottom: 160 },
              showsVerticalScrollIndicator: false,
              children: [
                  /* 1. Profile & Account */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.settingsOptionCard,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.settingsCardHeaderRow,
                  onPress: () => setSettingsSubScreen('profileAccount'),
                  activeOpacity: 0.75,
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.settingsIconCircle, { backgroundColor: '#DBEAFE' }],
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: { fontSize: 20 },
                      children: "👤"
                    })
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: { flex: 1 },
                    children: [
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardTitleText,
                      children: "Profile & Account"
                    }),
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardSubText,
                      children: "Edit profile, change mobile, email"
                    })
                    ]
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.settingsChevronText,
                    children: "❯"
                  })
                  ]
                })
                ]
              }),

                  /* 2. Profession & Services */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.settingsOptionCard,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.settingsCardHeaderRow,
                  onPress: () => setSettingsSubScreen('profession'),
                  activeOpacity: 0.75,
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.settingsIconCircle, { backgroundColor: '#FFEDD5' }],
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: { fontSize: 20 },
                      children: "🛠️"
                    })
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: { flex: 1 },
                    children: [
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardTitleText,
                      children: "Profession & Services"
                    }),
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardSubText,
                      children: "Update profession, add services, multi-select"
                    })
                    ]
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.settingsChevronText,
                    children: "❯"
                  })
                  ]
                })
                ]
              }),

                  /* 3. Location & Service Radius */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.settingsOptionCard,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.settingsCardHeaderRow,
                  onPress: () => setSettingsSubScreen('location'),
                  activeOpacity: 0.75,
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.settingsIconCircle, { backgroundColor: '#DCFCE7' }],
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: { fontSize: 20 },
                      children: "📍"
                    })
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: { flex: 1 },
                    children: [
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardTitleText,
                      children: "Location & Service Radius"
                    }),
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardSubText,
                      children: "Set base location and service area"
                    })
                    ]
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.settingsChevronText,
                    children: "❯"
                  })
                  ]
                })
                ]
              }),

                  /* 4. Work Photos & Portfolio */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.settingsOptionCard,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.settingsCardHeaderRow,
                  onPress: () => setSettingsSubScreen('portfolio'),
                  activeOpacity: 0.75,
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.settingsIconCircle, { backgroundColor: '#F3E8FF' }],
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: { fontSize: 20 },
                      children: "🖼️"
                    })
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: { flex: 1 },
                    children: [
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardTitleText,
                      children: "Work Photos & Portfolio"
                    }),
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardSubText,
                      children: "Add and manage your work photos"
                    })
                    ]
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.settingsChevronText,
                    children: "❯"
                  })
                  ]
                })
                ]
              }),

                  /* 5. Working Hours & Availability -> Worker Active Status & Hourly Rate */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.settingsOptionCard,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.settingsCardHeaderRow,
                  onPress: () => setSettingsSubScreen('availability'),
                  activeOpacity: 0.75,
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.settingsIconCircle, { backgroundColor: '#CCFBF1' }],
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: { fontSize: 20 },
                      children: "💵"
                    })
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: { flex: 1 },
                    children: [
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardTitleText,
                      children: "Rate per Hour"
                    }),
                              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                      style: styles.settingsCardSubText,
                      children: [isAvailable ? "🟢 Active Online" : "🔴 Offline", " • ₹", hourlyRate, "/hr"]
                    })
                    ]
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.settingsChevronText,
                    children: "❯"
                  })
                  ]
                })
                ]
              }),

                  /* 6. Ratings & Reviews */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.settingsOptionCard,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.settingsCardHeaderRow,
                  onPress: () => setSettingsSubScreen('reviews'),
                  activeOpacity: 0.75,
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.settingsIconCircle, { backgroundColor: '#FEF9C3' }],
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: { fontSize: 20 },
                      children: "⭐"
                    })
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: { flex: 1 },
                    children: [
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardTitleText,
                      children: "Ratings & Reviews"
                    }),
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardSubText,
                      children: "View customer reviews and ratings"
                    })
                    ]
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.settingsChevronText,
                    children: "❯"
                  })
                  ]
                })
                ]
              }),

                  /* 7. Call History */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.settingsOptionCard,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.settingsCardHeaderRow,
                  onPress: () => setActiveTab('calls'),
                  activeOpacity: 0.75,
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.settingsIconCircle, { backgroundColor: '#E0F2FE' }],
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: { fontSize: 20 },
                      children: "📞"
                    })
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: { flex: 1 },
                    children: [
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardTitleText,
                      children: "Call History"
                    }),
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardSubText,
                      children: "View your recent calls"
                    })
                    ]
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.settingsChevronText,
                    children: "❯"
                  })
                  ]
                })
                ]
              }),

                  /* 8. Notification Alerts */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.settingsOptionCard,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.settingsCardHeaderRow,
                  onPress: () => setSettingsSubScreen('notifications'),
                  activeOpacity: 0.75,
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.settingsIconCircle, { backgroundColor: '#FEE2E2' }],
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: { fontSize: 20 },
                      children: "🔔"
                    })
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: { flex: 1 },
                    children: [
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardTitleText,
                      children: "Notification Alerts"
                    }),
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardSubText,
                      children: "Manage notification preferences"
                    })
                    ]
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.settingsChevronText,
                    children: "❯"
                  })
                  ]
                })
                ]
              }),

                  /* 9. Privacy & Security */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.settingsOptionCard,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.settingsCardHeaderRow,
                  onPress: () => setSettingsSubScreen('privacy'),
                  activeOpacity: 0.75,
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.settingsIconCircle, { backgroundColor: '#F3E8FF' }],
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: { fontSize: 20 },
                      children: "🛡️"
                    })
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: { flex: 1 },
                    children: [
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardTitleText,
                      children: "Privacy & Security"
                    }),
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardSubText,
                      children: "Change password, login sessions, privacy settings"
                    })
                    ]
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.settingsChevronText,
                    children: "❯"
                  })
                  ]
                })
                ]
              }),

                  /* 10. Logout */
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.settingsOptionCard,
                children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.settingsCardHeaderRow,
                  onPress: onBackToOnboarding,
                  activeOpacity: 0.75,
                  children: [
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [styles.settingsIconCircle, { backgroundColor: '#FEE2E2' }],
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: { fontSize: 20 },
                      children: "🚪"
                    })
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: { flex: 1 },
                    children: [
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: [styles.settingsCardTitleText, { color: '#EF4444' }],
                      children: "Logout"
                    }),
                              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.settingsCardSubText,
                      children: "Sign out from your account"
                    })
                    ]
                  }),
                          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: [styles.settingsChevronText, { color: '#EF4444' }],
                    children: "❯"
                  })
                  ]
                })
              ]
            })
            ]
          })
          ]
        })
      )
    })
  ), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.bottomTabBarContainer,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
          style: styles.tabItem,
          onPress: handleDashboardPress,
          activeOpacity: 0.75,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.tabIcon, activeTab === 'dashboard' && styles.tabIconActive],
            children: "\uD83C\uDFE0"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.tabLabel, activeTab === 'dashboard' && styles.tabLabelActive],
            children: "Dashboard"
          }), activeTab === 'dashboard' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.activeTabIndicator
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
          style: styles.tabItem,
          onPress: () => setActiveTab('calls'),
          activeOpacity: 0.75,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.tabIcon, activeTab === 'calls' && styles.tabIconActive],
            children: "\uD83D\uDCDE"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.tabLabel, activeTab === 'calls' && styles.tabLabelActive],
            children: "Calls"
          }), activeTab === 'calls' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.activeTabIndicator
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
          style: styles.tabItem,
          onPress: () => setActiveTab('profile'),
          activeOpacity: 0.75,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.tabIcon, activeTab === 'profile' && styles.tabIconActive],
            children: "\uD83D\uDC64"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive],
            children: "Profile"
          }), activeTab === 'profile' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.activeTabIndicator
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
          style: styles.tabItem,
          onPress: () => setActiveTab('settings'),
          activeOpacity: 0.75,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.tabIcon, activeTab === 'settings' && styles.tabIconActive],
            children: "\u2699\uFE0F"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.tabLabel, activeTab === 'settings' && styles.tabLabelActive],
            children: "Settings"
          }), activeTab === 'settings' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.activeTabIndicator
          })]
        })]
      })]
    })
  });
}
function HomeScreen({
  onBackToOnboarding
}) {
  var [searchQuery, setSearchQuery] = useState('');
  var [activeTab, setActiveTab] = useState('home');
  var [userLocation, setUserLocation] = useState('Current GPS Location');
  var [isLocating, setIsLocating] = useState(false);

  var handleDetectLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setUserLocation('Current GPS Location');
      setIsLocating(false);
    }, 600);
  };

  var categories = [{
    id: 'home_repair',
    title: 'Home Repair',
    icon: '🔧',
    color: '#FFF0F0'
  }, {
    id: 'vehicle_services',
    title: 'Vehicle Services',
    icon: '🚗',
    color: '#E0F2FE'
  }, {
    id: 'personal_beauty',
    title: 'Personal &\nBeauty',
    icon: '👩',
    color: '#FCE7F3'
  }, {
    id: 'cleaning',
    title: 'Cleaning',
    icon: '🧹',
    color: '#DCFCE7'
  }, {
    id: 'outdoor_labour',
    title: 'Outdoor &\nLabour',
    icon: '🌱',
    color: '#FEF9C3'
  }];

  var popularServices = [{
    id: 'plumber',
    title: 'Plumber',
    image: require("./src/assets/hero_illustration.png")
  }, {
    id: 'electrician',
    title: 'Electrician',
    image: require("./src/assets/screen2_illustration.png")
  }, {
    id: 'carpenter',
    title: 'Carpenter',
    image: require("./src/assets/hero_illustration.png")
  }, {
    id: 'painter',
    title: 'Painter',
    image: require("./src/assets/screen2_illustration.png")
  }];

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ImageBackground, {
    source: require("./src/assets/onboarding_bg.png"),
    style: styles.bgImage,
    resizeMode: "cover",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: styles.homeSafeArea,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: styles.homeScrollContent,
        showsVerticalScrollIndicator: false,
        children: [
          /* Top Header Row */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.homeTopRow,
          children: [
              /* Menu button */
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: onBackToOnboarding,
            style: styles.homeIconButton,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.homeMenuIconText,
              children: "\u2630"
            })
          }),
              /* Logo & Location */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.homeLogoLocationCenter,
            children: [
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
              source: require("./src/assets/logo.png"),
              style: styles.homeMainLogo,
              resizeMode: "contain"
            }),
                  /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
              style: styles.homeLocationRow,
              onPress: handleDetectLocation,
              activeOpacity: 0.7,
              children: [
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.locationPinText,
                children: isLocating ? '⏳' : '📍'
              }),
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.locationCityName,
                children: isLocating ? 'Locating...' : userLocation
              }),
                      /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.locationArrowText,
                children: " \u2228"
              })
              ]
            })
            ]
          }),
              /* Notification Bell */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
            style: styles.homeIconButton,
            children: [
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.bellIconText,
              children: "\uD83D\uDD14"
            }),
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.bellDotBadge
            })
            ]
          })
          ]
        }),

          /* Search Row */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.homeSearchRow,
          children: [
              /* Input box */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.homeSearchInputBox,
            children: [
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.searchIconBadgeCircle,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.searchLensIcon,
                children: "\uD83D\uDD0D"
              })
            }),
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
              style: styles.homeSearchTextInput,
              placeholder: "Search for a service or worker...",
              placeholderTextColor: "#94A3B8",
              value: searchQuery,
              onChangeText: setSearchQuery
            })
            ]
          }),
              /* Filter button */
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            style: styles.filterBtnBox,
            activeOpacity: 0.8,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.filterCustomIconWrapper,
              children: [
                    /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.filterLineRow,
                children: [
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, { style: [styles.filterLineBar, { width: 13 }] }),
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, { style: styles.filterLineDot })
                ]
              }),
                    /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.filterLineRow,
                children: [
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, { style: styles.filterLineDot }),
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, { style: [styles.filterLineBar, { width: 13 }] })
                ]
              }),
                    /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.filterLineRow,
                children: [
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, { style: [styles.filterLineBar, { width: 10 }] }),
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, { style: styles.filterLineDot }),
                        /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, { style: [styles.filterLineBar, { width: 5 }] })
                ]
              })
              ]
            })
          })
          ]
        }),

          /* Browse by Category Header */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.sectionTitleRow,
          children: [
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.sectionMainTitle,
            children: "Browse by Category"
          }),
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            style: styles.viewAllBadge,
            activeOpacity: 0.7,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.viewAllLinkText,
              children: "View All >"
            })
          })
          ]
        }),

          /* Categories Grid */
          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.categoryGridBox,
          children: categories.map(cat => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
            style: [styles.categoryTileCard, { backgroundColor: cat.color }],
            activeOpacity: 0.75,
            children: [
                /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.categoryIconBadge,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.categoryTileIcon,
                children: cat.icon
              })
            }),
                /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.categoryTileTitle,
              children: cat.title
            })
            ]
          }, cat.id))
        }),

          /* Banner Carousel */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.bannerCardContainer,
          children: [
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: require("./src/assets/screen2_illustration.png"),
            style: styles.bannerCardImage,
            resizeMode: "contain"
          }),
              /* Carousel Dots */
              /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.carouselDotRow,
            children: [
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, { style: [styles.carouselDot, styles.carouselDotActive] }),
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, { style: styles.carouselDot }),
                  /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, { style: styles.carouselDot })
            ]
          })
          ]
        }),

          /* Popular Services Header */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.sectionTitleRow,
          children: [
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.sectionMainTitle,
            children: "Popular Services"
          }),
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.viewAllLinkText,
              children: "View All >"
            })
          })
          ]
        }),

          /* Popular Services ScrollView */
          /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          contentContainerStyle: styles.popularServicesHorizontalScroll,
          children: popularServices.map(item => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
            style: styles.popularCardItem,
            activeOpacity: 0.8,
            children: [
                /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
              source: typeof item.image === 'string' ? { uri: item.image } : item.image,
              style: styles.popularCardPhoto,
              resizeMode: "contain"
            }),
                /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.popularCardLabelBox,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.popularCardTitleText,
                children: item.title
              })
            })
            ]
          }, item.id))
        })
        ]
      }),

      /* Bottom Navbar */
      /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.bottomNavigationCard,
        children: [
          /* Tab 1: Home */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
          style: styles.bottomNavItem,
          onPress: () => setActiveTab('home'),
          children: [
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.bottomNavIcon, activeTab === 'home' && styles.bottomNavIconActive],
            children: "\uD83C\uDFE0"
          }),
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.bottomNavLabel, activeTab === 'home' && styles.bottomNavLabelActive],
            children: "Home"
          })
          ]
        }),
          /* Tab 2: Search */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
          style: styles.bottomNavItem,
          onPress: () => setActiveTab('search'),
          children: [
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.bottomNavIcon, activeTab === 'search' && styles.bottomNavIconActive],
            children: "\uD83D\uDD0D"
          }),
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.bottomNavLabel, activeTab === 'search' && styles.bottomNavLabelActive],
            children: "Search"
          })
          ]
        }),
          /* Tab 3: My Requests */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
          style: styles.bottomNavItem,
          onPress: () => setActiveTab('requests'),
          children: [
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.bottomNavIcon, activeTab === 'requests' && styles.bottomNavIconActive],
            children: "\uD83D\uDCCB"
          }),
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.bottomNavLabel, activeTab === 'requests' && styles.bottomNavLabelActive],
            children: "My Requests"
          })
          ]
        }),
          /* Tab 4: Profile */
          /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
          style: styles.bottomNavItem,
          onPress: () => setActiveTab('profile'),
          children: [
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.bottomNavIcon, activeTab === 'profile' && styles.bottomNavIconActive],
            children: "\uD83D\uDC64"
          }),
              /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.bottomNavLabel, activeTab === 'profile' && styles.bottomNavLabelActive],
            children: "Profile"
          })
          ]
        })
        ]
      })
      ]
    })
  });
}
var styles = _reactNative.StyleSheet.create({
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
    width: 68,
    height: 68,
    borderRadius: 34,
    position: 'relative',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FFDCD4'
  },
  workerAvatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 34
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
    fontSize: 20,
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
    paddingVertical: 8,
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
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 8,
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
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FFDCD4'
  },
  heroCameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF5436',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF'
  },
  heroCameraIcon: {
    fontSize: 11
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
    marginBottom: 6
  },
  heroBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  heroVerifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
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
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D'
  },
  heroRatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE047'
  },
  heroRatingStar: {
    fontSize: 10,
    marginRight: 3
  },
  heroRatingText: {
    fontSize: 11,
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
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A'
  },
  heroStatLbl: {
    fontSize: 10,
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
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FECACA'
  },
  profileLogoutBtnIcon: {
    fontSize: 16,
    marginRight: 8
  },
  profileLogoutBtnText: {
    fontSize: 15,
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
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  workerAvatarSettingsWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    position: 'relative'
  },
  workerAvatarSettingsImg: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#FF5436'
  },
  cameraBadgeSettings: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
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
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginVertical: 2
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
  }
});

export default App;


