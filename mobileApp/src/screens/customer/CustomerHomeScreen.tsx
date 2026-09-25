import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/styles';
import { HunarGoLogo, DefaultAvatar } from '../../utils/assets';
import { CustomerCallsScreen } from './CustomerCallsScreen';
import { customerApi } from '../../api/customerApi';

interface Props {
  onBackToOnboarding: () => void;
}

export const CustomerHomeScreen: React.FC<Props> = ({ onBackToOnboarding }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'calls' | 'bookings' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const workers = [
    { id: '1', name: 'Sushil Kumar', profession: 'Electrician & Plumber', rating: '4.9 ⭐', distance: '1.2 km away', phone: '+919876543210' },
    { id: '2', name: 'Ramesh Singh', profession: 'Carpenter', rating: '4.7 ⭐', distance: '2.5 km away', phone: '+919876543211' },
    { id: '3', name: 'Amit Verma', profession: 'Painter', rating: '4.8 ⭐', distance: '3.0 km away', phone: '+919876543212' },
  ];

  const handleCallWorker = (workerId: string) => {
    customerApi.callWorker(workerId);
  };

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <View style={styles.dashboardTopHeader}>
        <Image source={HunarGoLogo} style={styles.dashboardLogo} resizeMode="contain" />
      </View>

      {/* Customer Home Tab */}
      {activeTab === 'home' && (
        <ScrollView contentContainerStyle={styles.callsTabScrollContent} showsVerticalScrollIndicator={false}>
          {/* Search Box */}
          <View style={[styles.callSearchBox, { marginTop: 10 }]}>
            <Text style={styles.callSearchIcon}>🔍</Text>
            <TextInput
              style={styles.callSearchInput}
              placeholder="Search plumber, electrician, carpenter..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Location Banner */}
          <View style={styles.availabilityBannerCard}>
            <View style={styles.availabilityInfoGroup}>
              <Text style={styles.availabilityCardTitle}>📍 Current Location</Text>
              <Text style={styles.availabilityCardSubtitle}>Connaught Place, New Delhi (Within 15 km radius)</Text>
            </View>
          </View>

          {/* Workers Nearby List */}
          <View style={{ marginTop: 14 }}>
            <Text style={styles.callsSectionTitle}>Nearby Skilled Workers</Text>
            <View style={{ marginTop: 8 }}>
              {workers.map((worker) => (
                <View key={worker.id} style={[styles.compactCallCard, { marginBottom: 10 }]}>
                  <View style={styles.compactCardLeft}>
                    <Image source={DefaultAvatar} style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }} />
                    <View style={styles.compactInfoGroup}>
                      <Text style={styles.compactCustomerName}>{worker.name}</Text>
                      <Text style={styles.compactDistanceText}>{worker.profession} • {worker.rating}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.compactCallBackBtn}
                    activeOpacity={0.8}
                    onPress={() => handleCallWorker(worker.id)}
                  >
                    <Text style={styles.callBackBtnIcon}>📞</Text>
                    <Text style={styles.callBackBtnText}>Call Now</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {/* Customer Calls History */}
      {activeTab === 'calls' && <CustomerCallsScreen />}

      {/* Bookings */}
      {activeTab === 'bookings' && (
        <ScrollView contentContainerStyle={styles.callsTabScrollContent}>
          <View style={styles.callsTabHeader}>
            <Text style={styles.callsTabTitle}>My Job Requests</Text>
          </View>
        </ScrollView>
      )}

      {/* Customer Profile */}
      {activeTab === 'profile' && (
        <ScrollView contentContainerStyle={styles.callsTabScrollContent}>
          <View style={styles.callsTabHeader}>
            <Text style={styles.callsTabTitle}>Customer Account</Text>
          </View>
          <TouchableOpacity style={styles.settingsRow} onPress={onBackToOnboarding}>
            <Text style={styles.settingsRowText}>🚪 Switch Role / Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Bottom Floating Navigation Tab Bar */}
      <View style={styles.bottomTabBarContainer}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('home')}>
          <Text style={[styles.tabIcon, activeTab === 'home' && styles.tabIconActive]}>🏠</Text>
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>Home</Text>
          {activeTab === 'home' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('calls')}>
          <Text style={[styles.tabIcon, activeTab === 'calls' && styles.tabIconActive]}>📞</Text>
          <Text style={[styles.tabLabel, activeTab === 'calls' && styles.tabLabelActive]}>Calls</Text>
          {activeTab === 'calls' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('bookings')}>
          <Text style={[styles.tabIcon, activeTab === 'bookings' && styles.tabIconActive]}>📋</Text>
          <Text style={[styles.tabLabel, activeTab === 'bookings' && styles.tabLabelActive]}>Bookings</Text>
          {activeTab === 'bookings' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('profile')}>
          <Text style={[styles.tabIcon, activeTab === 'profile' && styles.tabIconActive]}>👤</Text>
          <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}>Profile</Text>
          {activeTab === 'profile' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
