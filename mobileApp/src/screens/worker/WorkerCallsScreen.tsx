import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/styles';
import { workerApi } from '../../api/workerApi';

const DEFAULT_CUSTOMER_CALLS = [
  { id: '1', name: 'Rajesh Kumar', avatar: '👨‍💼', service: 'AC Service', distance: '1.2 km away', time: '10 mins ago', status: 'Missed' },
  { id: '2', name: 'Priya Sharma', avatar: '👩‍💼', service: 'Plumbing', distance: '2.5 km away', time: '1 hour ago', status: 'Completed' },
  { id: '3', name: 'Amit Verma', avatar: '👨‍💻', service: 'Electrical Repair', distance: '3.1 km away', time: 'Yesterday', status: 'Received' },
  { id: '4', name: 'Sneha Patel', avatar: '👩‍⚕️', service: 'Home Cleaning', distance: '0.8 km away', time: '2 days ago', status: 'Missed' },
  { id: '5', name: 'Vikram Singh', avatar: '👨‍🌾', service: 'Carpentry', distance: '4.0 km away', time: '3 days ago', status: 'Completed' },
];

export const WorkerCallsScreen: React.FC = () => {
  const [callSearch, setCallSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [callsList, setCallsList] = useState(DEFAULT_CUSTOMER_CALLS);
  const [isLoading, setIsLoading] = useState(false);

  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      setIsLoading(true);
      const res = await workerApi.getCustomerCalls();
      if (res && res.success && res.calls && res.calls.length > 0) {
        // Option to bind remote API calls
      }
    } catch (err) {
      console.error('Error loading customer calls:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCalls = callsList.filter(
    (c) =>
      c.name.toLowerCase().includes(callSearch.toLowerCase()) ||
      c.distance.toLowerCase().includes(callSearch.toLowerCase()) ||
      c.service.toLowerCase().includes(callSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCalls.length / ITEMS_PER_PAGE) || 1;
  const paginatedCalls = filteredCalls.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <ScrollView contentContainerStyle={styles.callsTabScrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.callsTabHeader}>
        <View>
          <Text style={styles.callsTabTitle}>Customer Calls</Text>
          <Text style={styles.callsTabSubtitle}>Manage direct customer inquiries & requests</Text>
        </View>
        <View style={styles.totalCallsBadge}>
          <Text style={styles.totalCallsBadgeText}>{callsList.length} Total Calls</Text>
        </View>
      </View>

      <View style={styles.callSearchBox}>
        <Text style={styles.callSearchIcon}>🔍</Text>
        <TextInput
          style={styles.callSearchInput}
          placeholder="Search customer name or location..."
          placeholderTextColor="#94A3B8"
          value={callSearch}
          onChangeText={(text) => {
            setCallSearch(text);
            setCurrentPage(1);
          }}
        />
        {callSearch.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setCallSearch('');
              setCurrentPage(1);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.callsListContainer}>
        {paginatedCalls.map((item) => (
          <View key={item.id} style={styles.compactCallCard}>
            <View style={styles.compactCardLeft}>
              <View style={styles.compactAvatarCircle}>
                <Text style={styles.compactAvatarEmoji}>{item.avatar}</Text>
              </View>
              <View style={styles.compactInfoGroup}>
                <Text style={styles.compactCustomerName}>{item.name}</Text>
                <View style={styles.compactDistanceRow}>
                  <Text style={styles.compactPinIcon}>📍</Text>
                  <Text style={styles.compactDistanceText}>{item.distance}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.compactCallBackBtn} activeOpacity={0.8}>
              <Text style={styles.callBackBtnIcon}>📞</Text>
              <Text style={styles.callBackBtnText}>Call Back</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.paginationControlsContainer}>
        <TouchableOpacity
          style={[styles.pageBtn, currentPage === 1 && styles.pageBtnDisabled]}
          onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          activeOpacity={0.75}
        >
          <Text style={[styles.pageBtnText, currentPage === 1 && styles.pageBtnTextDisabled]}>
            ◀ Prev
          </Text>
        </TouchableOpacity>

        <View style={styles.pageNumberBadge}>
          <Text style={styles.pageNumberText}>
            Page {currentPage} of {totalPages}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.pageBtn, currentPage >= totalPages && styles.pageBtnDisabled]}
          onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage >= totalPages}
          activeOpacity={0.75}
        >
          <Text style={[styles.pageBtnText, currentPage >= totalPages && styles.pageBtnTextDisabled]}>
            Next ▶
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
