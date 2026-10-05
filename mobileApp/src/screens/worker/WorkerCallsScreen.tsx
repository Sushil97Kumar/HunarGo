import React, { useState, useEffect } from 'react';
import {
  Modal,
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
  const [callsList, setCallsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      setIsLoading(true);
      const res = await workerApi.getCustomerCalls();
      if (res && res.success && Array.isArray(res.calls)) {
        setCallsList(
          res.calls.map((c: any, i: number) => ({
            id: c.id || String(i + 1),
            name: c.customerName || 'Customer',
            avatar: c.avatar || '👤',
            service: c.service || 'Call Request',
            distance: c.distance || 'Nearby',
            time: c.time || 'Just now',
            status: c.status || 'Pending',
          }))
        );
      } else {
        setCallsList([]);
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

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ callId: string | null; status: string; customerName: string }>({
    callId: null,
    status: '',
    customerName: '',
  });

  const handleOpenConfirmModal = (callId: string, status: string, customerName: string) => {
    setPendingAction({ callId, status, customerName });
    setConfirmModalVisible(true);
  };

  const handleConfirmAction = async () => {
    const { callId, status } = pendingAction;
    if (!callId || !status) return;
    try {
      setCallsList((prevCalls) =>
        prevCalls.map((c) => (c.id === callId ? { ...c, status } : c))
      );
      setConfirmModalVisible(false);
      await workerApi.updateCallStatus(callId, status);
    } catch (err) {
      console.error('Error updating call status:', err);
    }
  };

  return (
    <>
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
                  <Text style={styles.compactAvatarEmoji}>{item.avatar || '👤'}</Text>
                </View>
                <View style={styles.compactInfoGroup}>
                  <Text style={styles.compactCustomerName}>{item.name}</Text>
                  <View style={styles.compactDistanceRow}>
                    <Text style={styles.compactPinIcon}>📍</Text>
                    <Text style={styles.compactDistanceText}>{item.distance}</Text>
                  </View>
                </View>
              </View>

              {item.status === 'Pending' ? (
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#EF4444',
                      paddingVertical: 7,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => handleOpenConfirmModal(item.id, 'Cancelled', item.name)}
                    activeOpacity={0.8}
                  >
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }}>✕ Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#16A34A',
                      paddingVertical: 7,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => handleOpenConfirmModal(item.id, 'Accepted', item.name)}
                    activeOpacity={0.8}
                  >
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }}>✓ Accepted</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: item.status === 'Accepted' ? '#DCFCE7' : '#FEE2E2',
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color: item.status === 'Accepted' ? '#15803D' : '#B91C1C',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                  {item.status === 'Accepted' ? '✓ Accepted' : '✕ Cancelled'}
                </Text>
              </View>
            )}
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

    <Modal
      visible={confirmModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setConfirmModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 340,
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: 24,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 10,
          }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: pendingAction.status === 'Accepted' ? '#DCFCE7' : '#FEE2E2',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: pendingAction.status === 'Accepted' ? '#15803D' : '#B91C1C',
              }}
            >
              {pendingAction.status === 'Accepted' ? '✓' : '✕'}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            {pendingAction.status === 'Accepted' ? 'Accept Call Request?' : 'Cancel Call Request?'}
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: '#475569',
              textAlign: 'center',
              lineHeight: 20,
              marginBottom: 20,
            }}
          >
            {pendingAction.status === 'Accepted'
              ? 'Are you sure you want to accept the call request from '
              : 'Are you sure you want to cancel the call request from '}
            <Text style={{ fontWeight: '700', color: '#0F172A' }}>
              {pendingAction.customerName || 'Customer'}
            </Text>
            ?
          </Text>

          <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 10,
                backgroundColor: '#F1F5F9',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setConfirmModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#64748B' }}>No, Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 10,
                backgroundColor: pendingAction.status === 'Accepted' ? '#16A34A' : '#EF4444',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleConfirmAction}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF' }}>
                {pendingAction.status === 'Accepted' ? 'Yes, Accept' : 'Yes, Cancel'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    </>
  );
};
