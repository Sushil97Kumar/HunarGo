import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/styles';
import { customerApi } from '../../api/customerApi';

interface CallRecord {
  id: string;
  workerName: string;
  profession: string;
  date: string;
  status: string;
  duration: string;
  emoji?: string;
}

const INITIAL_CALLS: CallRecord[] = [
  { id: '1', workerName: 'Sushil Kumar', profession: 'Electrician', date: 'Today, 2:30 PM', status: 'Connected', duration: '3 mins', emoji: '⚡' },
  { id: '2', workerName: 'Ramesh Singh', profession: 'Plumber', date: 'Yesterday, 11:15 AM', status: 'No Answer', duration: '0 mins', emoji: '🚰' },
  { id: '3', workerName: 'Priya Sharma', profession: 'Cleaner', date: 'Yesterday, 4:45 PM', status: 'Connected', duration: '8 mins', emoji: '🧹' },
  { id: '4', workerName: 'Amit Patel', profession: 'Car Mechanic', date: '25 Sep, 10:20 AM', status: 'Connected', duration: '5 mins', emoji: '🚗' },
  { id: '5', workerName: 'Vikas Verma', profession: 'Painter', date: '24 Sep, 1:00 PM', status: 'No Answer', duration: '0 mins', emoji: '🎨' },
  { id: '6', workerName: 'Sunita Devi', profession: 'Daily Labour', date: '23 Sep, 9:30 AM', status: 'Connected', duration: '2 mins', emoji: '🍃' },
  { id: '7', workerName: 'Deepak Carpenter', profession: 'Carpenter', date: '22 Sep, 3:15 PM', status: 'Connected', duration: '12 mins', emoji: '🪚' },
  { id: '8', workerName: 'Manoj Tailor', profession: 'Tailor', date: '21 Sep, 5:00 PM', status: 'Connected', duration: '4 mins', emoji: '🧵' },
  { id: '9', workerName: 'Karan Welder', profession: 'Welder', date: '20 Sep, 11:00 AM', status: 'No Answer', duration: '0 mins', emoji: '👨‍🏭' },
  { id: '10', workerName: 'Anil AC Repair', profession: 'AC Technician', date: '19 Sep, 2:10 PM', status: 'Connected', duration: '6 mins', emoji: '❄️' },
  { id: '11', workerName: 'Pooja Barber', profession: 'Barber', date: '18 Sep, 4:30 PM', status: 'Connected', duration: '7 mins', emoji: '💇‍♀️' },
  { id: '12', workerName: 'Ravi Mason', profession: 'Mason', date: '17 Sep, 12:00 PM', status: 'Connected', duration: '10 mins', emoji: '🧱' },
  { id: '13', workerName: 'Rajesh Driver', profession: 'Driver', date: '16 Sep, 8:45 AM', status: 'Connected', duration: '15 mins', emoji: '🚘' },
  { id: '14', workerName: 'Sanjay Gardener', profession: 'Gardener', date: '15 Sep, 10:15 AM', status: 'No Answer', duration: '0 mins', emoji: '🪴' },
  { id: '15', workerName: 'Geeta Cook', profession: 'Home Cook', date: '14 Sep, 1:30 PM', status: 'Connected', duration: '9 mins', emoji: '🍳' },
  { id: '16', workerName: 'Mohan Roofer', profession: 'Roofer', date: '13 Sep, 3:00 PM', status: 'Connected', duration: '5 mins', emoji: '🏠' },
  { id: '17', workerName: 'Vikram Locksmith', profession: 'Locksmith', date: '12 Sep, 6:20 PM', status: 'Connected', duration: '3 mins', emoji: '🔑' },
  { id: '18', workerName: 'Pankaj Glazier', profession: 'Glass Repair', date: '11 Sep, 11:40 AM', status: 'No Answer', duration: '0 mins', emoji: '🪟' },
];

export const CustomerCallsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [callHistory, setCallHistory] = useState<CallRecord[]>(INITIAL_CALLS);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await customerApi.getCallHistory();
      if (res && res.calls && Array.isArray(res.calls) && res.calls.length > 0) {
        // Merge API calls if available
      }
    } catch (err) {
      console.error('Error fetching customer call history:', err);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
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
            Workers you've called ({filteredCalls.length} Total)
          </Text>
        </View>
      </View>

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

      <View style={styles.callsListContainer}>
        {displayedCalls.length === 0 ? (
          <View style={{ padding: 24, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: '#64748B', fontWeight: '600' }}>No call records found matching "{searchQuery}"</Text>
          </View>
        ) : (
          displayedCalls.map((item) => (
            <View key={item.id} style={styles.compactCallCard}>
              <View style={styles.compactCardLeft}>
                <View style={styles.compactAvatarCircle}>
                  <Text style={styles.compactAvatarEmoji}>{item.emoji || '🛠️'}</Text>
                </View>
                <View style={styles.compactInfoGroup}>
                  <Text style={styles.compactCustomerName}>{item.workerName}</Text>
                  <Text style={styles.compactDistanceText}>{item.profession} • {item.date}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.compactCallBackBtn}
                activeOpacity={0.8}
                onPress={() => customerApi.callWorker(item.id)}
              >
                <Text style={styles.callBackBtnIcon}>📞</Text>
                <Text style={styles.callBackBtnText}>Call Again</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        {/* Bottom Pagination Controller Bar matching View All page */}
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
      </View>
    </View>
  );
};
