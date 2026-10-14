// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/styles';
import { customerApi } from '../../api/customerApi';
import { CustomerCallingScreen } from './CustomerCallingScreen';

const DefaultAvatar = require('../../assets/default_avatar.png');

export interface CallRecord {
  id: string;
  workerId?: string;
  workerName: string;
  profession: string;
  date: string;
  status: string;
  duration?: string;
  phone?: string;
  avatar?: string;
  emoji?: string;
}

interface CustomerCallsScreenProps {
  onStartCall?: (worker: any) => void;
}

export const CustomerCallsScreen: React.FC<CustomerCallsScreenProps> = ({ onStartCall }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [callHistory, setCallHistory] = useState<CallRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Standalone fallback calling screen state
  const [callingWorker, setCallingWorker] = useState<any | null>(null);
  const [showCallingScreen, setShowCallingScreen] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const res = await customerApi.getCallHistory();
      if (res && res.success && Array.isArray(res.calls)) {
        setCallHistory(res.calls);
      } else {
        setCallHistory([]);
      }
    } catch (err) {
      console.error('Error fetching customer call history:', err);
      setCallHistory([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
  };

  const handleCallPress = (item: CallRecord) => {
    const workerData = {
      id: item.workerId || item.id,
      _id: item.workerId || item.id,
      name: item.workerName,
      fullName: item.workerName,
      profession: item.profession,
      avatar: item.avatar || '',
      profileImage: item.avatar || '',
      phone: item.phone || '',
      rating: '4.8',
      distance: 'Nearby',
    };

    if (onStartCall) {
      onStartCall(workerData);
    } else {
      setCallingWorker(workerData);
      setShowCallingScreen(true);
    }
  };

  const filteredCalls = callHistory.filter((item) =>
    item.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.profession.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredCalls.length / ITEMS_PER_PAGE));
  const displayedCalls = filteredCalls.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <View style={styles.callsTabScrollContent}>
      <View style={styles.callsTabHeader}>
        <View>
          <Text style={styles.callsTabTitle}>Outgoing Call History</Text>
          <Text style={styles.callsTabSubtitle}>
            {callHistory.length === 0
              ? 'No outgoing calls recorded'
              : `Workers you've called (${filteredCalls.length} Total)`}
          </Text>
        </View>
      </View>

      {callHistory.length > 0 && (
        <View style={styles.callSearchBox}>
          <Text style={styles.callSearchIcon}>🔍</Text>
          <TextInput
            style={styles.callSearchInput}
            placeholder="Search worker or profession..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.stylishClearBtn}
              onPress={() => handleSearchChange('')}
              activeOpacity={0.7}
            >
              <Text style={styles.stylishClearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.callsListContainer}>
        {isLoading ? (
          <View style={localStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B00" />
            <Text style={localStyles.loadingText}>Loading call history...</Text>
          </View>
        ) : callHistory.length === 0 ? (
          <View style={localStyles.emptyContainer}>
            <View style={localStyles.emptyIconCircle}>
              <Text style={localStyles.emptyIconText}>📞</Text>
            </View>
            <Text style={localStyles.emptyTitle}>No Outgoing Calls</Text>
            <Text style={localStyles.emptySubtitle}>
              You haven't called any workers yet. When you initiate a call to a worker, your call records will appear here.
            </Text>
          </View>
        ) : displayedCalls.length === 0 ? (
          <View style={localStyles.emptyContainer}>
            <Text style={localStyles.emptyTitle}>No Records Found</Text>
            <Text style={localStyles.emptySubtitle}>
              No call records found matching "{searchQuery}".
            </Text>
          </View>
        ) : (
          displayedCalls.map((item) => (
            <View key={item.id} style={styles.compactCallCard}>
              <View style={styles.compactCardLeft}>
                <View style={styles.compactAvatarCircle}>
                  {item.avatar && typeof item.avatar === 'string' && (item.avatar.startsWith('http') || item.avatar.startsWith('data:image')) ? (
                    <Image source={{ uri: item.avatar }} style={localStyles.compactAvatarImg} />
                  ) : (
                    <Text style={styles.compactAvatarEmoji}>{item.emoji || '📞'}</Text>
                  )}
                </View>
                <View style={styles.compactInfoGroup}>
                  <Text style={styles.compactCustomerName}>{item.workerName}</Text>
                  <Text style={styles.compactDistanceText}>{item.profession} • {item.date}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <View
                  style={{
                    backgroundColor:
                      item.status === 'Accepted'
                        ? '#DCFCE7'
                        : item.status === 'Pending'
                        ? '#FFF7ED'
                        : '#FEE2E2',
                    borderColor:
                      item.status === 'Accepted'
                        ? '#86EFAC'
                        : item.status === 'Pending'
                        ? '#FFD8A8'
                        : '#FCA5A5',
                    borderWidth: 1,
                    borderRadius: 14,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '800',
                      color:
                        item.status === 'Accepted'
                          ? '#166534'
                          : item.status === 'Pending'
                          ? '#C2410C'
                          : '#B91C1C',
                    }}
                  >
                    {item.status === 'Accepted'
                      ? '✓ Accepted'
                      : item.status === 'Pending'
                      ? '⏳ Pending'
                      : item.status === 'Cancelled'
                      ? '✕ Cancelled'
                      : item.status}
                  </Text>
                </View>

                {/* Interactive Call Button to trigger calling screen */}
                <TouchableOpacity
                  style={localStyles.callActionBtn}
                  onPress={() => handleCallPress(item)}
                  activeOpacity={0.8}
                >
                  <Text style={localStyles.callActionBtnIcon}>📞</Text>
                  <Text style={localStyles.callActionBtnText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Bottom Pagination Controller Bar - only show if there are calls and multiple pages */}
        {!isLoading && totalPages > 1 && (
          <View style={styles.paginationInlineRow}>
            <TouchableOpacity
              style={[
                styles.pageBtnPrev,
                currentPage <= 1 && styles.pageBtnDisabled
              ]}
              disabled={currentPage <= 1}
              onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.pageBtnPrevText,
                currentPage <= 1 && styles.pageBtnTextDisabled
              ]}>
                ◄ Prev
              </Text>
            </TouchableOpacity>

            <View style={styles.pageBadgeCenter}>
              <Text style={styles.pageBadgeText}>
                Page {currentPage} of {totalPages}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.pageBtnNext,
                currentPage >= totalPages && styles.pageBtnDisabled
              ]}
              disabled={currentPage >= totalPages}
              onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              activeOpacity={0.8}
            >
              <Text style={styles.pageBtnNextText}>
                Next ►
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Fallback Standalone Calling Screen */}
      <CustomerCallingScreen
        visible={showCallingScreen}
        worker={callingWorker}
        onEndCall={() => {
          setShowCallingScreen(false);
          setCallingWorker(null);
          fetchHistory();
        }}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyIconText: {
    fontSize: 28,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 280,
  },
  callActionBtn: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  callActionBtnIcon: {
    fontSize: 11,
    color: '#FFFFFF',
  },
  callActionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  compactAvatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
