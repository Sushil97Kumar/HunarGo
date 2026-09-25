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

export const CustomerCallsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [callHistory, setCallHistory] = useState([
    { id: '1', workerName: 'Sushil Kumar', profession: 'Electrician', date: 'Today, 2:30 PM', status: 'Connected', duration: '3 mins' },
    { id: '2', workerName: 'Ramesh Singh', profession: 'Plumber', date: 'Yesterday, 11:15 AM', status: 'No Answer', duration: '0 mins' },
  ]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      await customerApi.getCallHistory();
    } catch (err) {
      console.error('Error fetching customer call history:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.callsTabScrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.callsTabHeader}>
        <View>
          <Text style={styles.callsTabTitle}>Outgoing Call History</Text>
          <Text style={styles.callsTabSubtitle}>Workers you've called for jobs</Text>
        </View>
      </View>

      <View style={styles.callSearchBox}>
        <Text style={styles.callSearchIcon}>🔍</Text>
        <TextInput
          style={styles.callSearchInput}
          placeholder="Search worker or profession..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.callsListContainer}>
        {callHistory.map((item) => (
          <View key={item.id} style={styles.compactCallCard}>
            <View style={styles.compactCardLeft}>
              <View style={styles.compactAvatarCircle}>
                <Text style={styles.compactAvatarEmoji}>🛠️</Text>
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
        ))}
      </View>
    </ScrollView>
  );
};
