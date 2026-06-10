import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar
} from 'react-native';
// @ts-ignore: expo-router does not provide TypeScript declarations in this project
import { router } from 'expo-router';
import { mockUser } from '../../constants/mockData';
import TrustScore from '../../components/TrustScore';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#08182D" />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{mockUser.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{mockUser.name}</Text>
          <Text style={styles.email}>{mockUser.email}</Text>
          {mockUser.isVerified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓ ID Verified</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <TrustScore score={mockUser.trustScore} />

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{mockUser.tripsCompleted}</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Groups</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          <View style={styles.bioCard}>
            <Text style={styles.cardTitle}>About Me</Text>
            <Text style={styles.bioText}>{mockUser.bio}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Account Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>{mockUser.memberSince}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Verification</Text>
              <Text style={[styles.infoValue, { color: '#10B981' }]}>Verified</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.verifyButton}
            onPress={() => router.push('/verify')}
          >
            <Text style={styles.verifyButtonText}>📎 Upload ID Document</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => router.replace('/(auth)/login')}
          >
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#08182D',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  avatarContainer: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, borderWidth: 3, borderColor: '#FFFFFF'
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  email: { fontSize: 14, color: '#CCF1FF', marginBottom: 12 },
  verifiedBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20
  },
  verifiedText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  content: { padding: 16 },
  statsRow: {
    flexDirection: 'row', backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#E5E7EB'
  },
  statItem: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: '#E5E7EB' },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: '#08182D' },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  bioCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12,
    padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#E5E7EB'
  },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#111827', marginBottom: 10 },
  bioText: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
  infoCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12,
    padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#E5E7EB'
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F3F4F6'
  },
  infoLabel: { fontSize: 14, color: '#6B7280' },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#08182D' },
  verifyButton: {
    backgroundColor: '#CCF1FF', borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 12,
    borderWidth: 1, borderColor: '#CCF1FF'
  },
  verifyButtonText: { color: '#08182D', fontWeight: '600', fontSize: 15 },
  logoutButton: {
    backgroundColor: '#FEF2F2', borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 100,
    borderWidth: 1, borderColor: '#FECACA'
  },
  logoutButtonText: { color: '#EF4444', fontWeight: '600', fontSize: 15 },
});