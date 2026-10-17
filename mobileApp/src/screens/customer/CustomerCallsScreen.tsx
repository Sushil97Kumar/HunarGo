// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { customerApi } from '../../api/customerApi';
import { CustomerCallingScreen } from './CustomerCallingScreen';

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
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom + 90, 130);

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
    (item.workerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.profession || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredCalls.length / ITEMS_PER_PAGE));
  const displayedCalls = filteredCalls.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <ScrollView
      style={localStyles.scrollContainer}
      contentContainerStyle={[localStyles.scrollContent, { paddingBottom: bottomPadding }]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Outgoing Call History Header */}
      <View style={localStyles.callsTabHeader}>
        <View style={{ flex: 1 }}>
          <Text style={localStyles.callsTabTitle}>Outgoing Call History</Text>
          <Text style={localStyles.callsTabSubtitle}>
            {callHistory.length === 0
              ? 'No outgoing calls recorded'
              : `Workers you've called (${filteredCalls.length} Total)`}
          </Text>
        </View>
        {filteredCalls.length > 0 && (
          <View style={localStyles.totalBadge}>
            <Text style={localStyles.totalBadgeText}>{filteredCalls.length} Total</Text>
          </View>
        )}
      </View>

      {/* Search Input Box */}
      {callHistory.length > 0 && (
        <View style={localStyles.callSearchBox}>
          <Text style={localStyles.callSearchIcon}>🔍</Text>
          <TextInput
            style={localStyles.callSearchInput}
            placeholder="Search worker or profession..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={localStyles.stylishClearBtn}
              onPress={() => handleSearchChange('')}
              activeOpacity={0.7}
            >
              <Text style={localStyles.stylishClearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Worker List Area */}
      <View style={localStyles.callsListContainer}>
        {isLoading ? (
          <View style={localStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF5436" />
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
          displayedCalls.map((item) => {
            const hasAvatar = item.avatar && typeof item.avatar === 'string' && (item.avatar.startsWith('http') || item.avatar.startsWith('data:image'));
            const initial = (item.workerName && item.workerName.trim().length > 0)
              ? item.workerName.trim().charAt(0).toUpperCase()
              : 'W';

            const isAccepted = item.status === 'Accepted';
            const isPending = item.status === 'Pending';
            const isCancelled = item.status === 'Cancelled' || !item.status;

            return (
              <View key={item.id} style={localStyles.compactCallCard}>
                <View style={localStyles.compactCardLeft}>
                  <View style={localStyles.compactAvatarCircle}>
                    {hasAvatar ? (
                      <Image source={{ uri: item.avatar }} style={localStyles.compactAvatarImg} />
                    ) : (
                      <Text style={localStyles.compactAvatarEmoji}>{item.emoji || '📞'}</Text>
                    )}
                  </View>
                  <View style={localStyles.compactInfoGroup}>
                    <Text style={localStyles.compactCustomerName} numberOfLines={1}>{item.workerName || 'Worker'}</Text>
                    <Text style={localStyles.compactDistanceText} numberOfLines={1}>
                      {item.profession || 'Service'} • {item.date || 'Just now'}
                    </Text>
                  </View>
                </View>

                <View style={localStyles.cardRightCol}>
                  {/* Status Badge */}
                  <View
                    style={[
                      localStyles.statusBadge,
                      isAccepted ? localStyles.statusAccepted : isPending ? localStyles.statusPending : localStyles.statusCancelled
                    ]}
                  >
                    <Text
                      style={[
                        localStyles.statusBadgeText,
                        isAccepted ? localStyles.statusTextAccepted : isPending ? localStyles.statusTextPending : localStyles.statusTextCancelled
                      ]}
                    >
                      {isAccepted
                        ? '✓ Accepted'
                        : isPending
                        ? '⏳ Pending'
                        : '✕ Cancelled'}
                    </Text>
                  </View>

                  {/* Interactive Call Button */}
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
            );
          })
        )}

        {/* Bottom Pagination Controller Bar */}
        {!isLoading && totalPages > 1 && (
          <View style={localStyles.paginationInlineRow}>
            <TouchableOpacity
              style={[
                localStyles.pageBtnPrev,
                currentPage <= 1 && localStyles.pageBtnDisabled
              ]}
              disabled={currentPage <= 1}
              onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              activeOpacity={0.8}
            >
              <Text style={[
                localStyles.pageBtnPrevText,
                currentPage <= 1 && localStyles.pageBtnTextDisabled
              ]}>
                ◄ Prev
              </Text>
            </TouchableOpacity>

            <View style={localStyles.pageBadgeCenter}>
              <Text style={localStyles.pageBadgeText}>
                Page {currentPage} of {totalPages}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                localStyles.pageBtnNext,
                currentPage >= totalPages && localStyles.pageBtnDisabled
              ]}
              disabled={currentPage >= totalPages}
              onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              activeOpacity={0.8}
            >
              <Text style={localStyles.pageBtnNextText}>
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
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  callsTabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 12,
  },
  callsTabTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  callsTabSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  totalBadge: {
    backgroundColor: '#FFF4ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  totalBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EA580C',
  },
  callSearchBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.8,
    borderColor: '#F97316',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 14,
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2.5,
  },
  callSearchIcon: {
    fontSize: 15,
    marginRight: 8,
  },
  callSearchInput: {
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
  callsListContainer: {
    width: '100%',
  },
  compactCallCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#64748B',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1.5,
  },
  compactCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  compactAvatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  compactAvatarEmoji: {
    fontSize: 17,
  },
  compactAvatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 19,
  },
  compactInfoGroup: {
    flex: 1,
  },
  compactCustomerName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  compactDistanceText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  cardRightCol: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 6,
  },
  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderWidth: 1,
  },
  statusAccepted: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  statusPending: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FFD8A8',
  },
  statusCancelled: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  statusTextAccepted: {
    color: '#166534',
  },
  statusTextPending: {
    color: '#C2410C',
  },
  statusTextCancelled: {
    color: '#B91C1C',
  },
  callActionBtn: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 13,
    paddingVertical: 5.5,
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
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
  paginationInlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    paddingVertical: 12,
    marginTop: 6,
    marginBottom: 8,
  },
  pageBtnPrev: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 12,
  },
  pageBtnDisabled: {
    backgroundColor: '#F1F5F9',
    opacity: 0.6,
  },
  pageBtnPrevText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#475569',
  },
  pageBtnTextDisabled: {
    color: '#94A3B8',
  },
  pageBadgeCenter: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  pageBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  pageBtnNext: {
    backgroundColor: '#FF5436',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 12,
    shadowColor: '#FF5436',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  pageBtnNextText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
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
});
