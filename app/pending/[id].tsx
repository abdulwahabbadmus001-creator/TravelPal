import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { mockGroups } from '../../constants/mockData';

export default function PendingScreen() {
  const { id } = useLocalSearchParams();
  const group = mockGroups.find(g => g.id === id) || mockGroups[2];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#08182D" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Status</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statusCard}>
          <View style={styles.pendingIconContainer}>
            <Text style={styles.pendingIcon}>⏳</Text>
          </View>
          <Text style={styles.statusTitle}>Request Pending</Text>
          <Text style={styles.statusSubtitle}>
            Your request to join this group is being reviewed by the group owner.
          </Text>
        </View>

        <View style={styles.groupCard}>
          <Text style={styles.sectionTitle}>Group Details</Text>
          <View style={styles.groupRow}>
            <Text style={styles.groupEmoji}>✈️</Text>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupDestination}>📍 {group.destination}</Text>
            </View>
            <View style={styles.privateBadge}>
              <Text style={styles.privateBadgeText}>🔒 Private</Text>
            </View>
          </View>
          <Text style={styles.groupDescription}>{group.description}</Text>
          <View style={styles.groupMeta}>
            <Text style={styles.groupMetaText}>👥 {group.members}/{group.maxMembers} members</Text>
            <Text style={styles.groupMetaText}>👤 by {group.owner}</Text>
          </View>
        </View>

        <View style={styles.timelineCard}>
          <Text style={styles.sectionTitle}>What Happens Next</Text>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.dotComplete]}>
              <Text style={styles.dotText}>✓</Text>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Request Submitted</Text>
              <Text style={styles.timelineDesc}>Your join request was sent successfully.</Text>
            </View>
          </View>
          <View style={styles.timelineLine} />
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.dotPending]}>
              <Text style={styles.dotTextPending}>2</Text>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Owner Review</Text>
              <Text style={styles.timelineDesc}>
                The group owner is reviewing your profile and trust score.
              </Text>
            </View>
          </View>
          <View style={styles.timelineLine} />
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.dotInactive]}>
              <Text style={styles.dotTextInactive}>3</Text>
            </View>
            <View style={styles.timelineContent}>
              <Text style={[styles.timelineTitle, { color: '#9CA3AF' }]}>Decision</Text>
              <Text style={styles.timelineDesc}>
                You will receive a notification once the owner approves or declines.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoText}>
            A complete profile and higher trust score increases your chances of approval.
            Make sure your profile photo, bio and travel interests are filled in.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <Text style={styles.profileButtonText}>Update My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.discoverButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.discoverButtonText}>Discover Other Groups</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#08182D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  backText: { color: '#FFFFFF', fontSize: 15, fontWeight: '500', width: 60 },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 16, paddingBottom: 100 },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pendingIconContainer: {
    width: 80, height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  pendingIcon: { fontSize: 40 },
  statusTitle: {
    fontSize: 22, fontWeight: 'bold',
    color: '#08192D', marginBottom: 8,
  },
  statusSubtitle: {
    fontSize: 14, color: '#6B7280',
    textAlign: 'center', lineHeight: 20,
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 16,
    marginBottom: 16,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 15, fontWeight: 'bold',
    color: '#08182D', marginBottom: 12,
  },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, marginBottom: 10,
  },
  groupEmoji: { fontSize: 32 },
  groupInfo: { flex: 1 },
  groupName: { fontSize: 15, fontWeight: 'bold', color: '#08182D' },
  groupDestination: { fontSize: 13, color: '#08182D', marginTop: 2 },
  privateBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10,
  },
  privateBadgeText: { fontSize: 11, color: '#D97706', fontWeight: '600' },
  groupDescription: {
    fontSize: 13, color: '#6B7280',
    lineHeight: 18, marginBottom: 10,
  },
  groupMeta: { flexDirection: 'row', gap: 16 },
  groupMetaText: { fontSize: 12, color: '#9CA3AF' },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 16,
    marginBottom: 16,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  timelineLine: {
    width: 2, height: 20,
    backgroundColor: '#E5E7EB',
    marginLeft: 19, marginVertical: 4,
  },
  timelineDot: {
    width: 40, height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotComplete: { backgroundColor: '#10B981' },
  dotPending: { backgroundColor: '#F59E0B' },
  dotInactive: { backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
  dotText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  dotTextPending: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  dotTextInactive: { color: '#9CA3AF', fontSize: 14, fontWeight: 'bold' },
  timelineContent: { flex: 1, paddingTop: 8 },
  timelineTitle: { fontSize: 14, fontWeight: 'bold', color: '#08182D', marginBottom: 2 },
  timelineDesc: { fontSize: 13, color: '#6B7280', lineHeight: 18 },
  infoCard: {
    backgroundColor: '#CCF1FF',
    borderRadius: 12, padding: 14,
    flexDirection: 'row', gap: 10,
    marginBottom: 16,
    borderWidth: 1, borderColor: '#CCF1FF',
  },
  infoIcon: { fontSize: 20 },
  infoText: { flex: 1, fontSize: 13, color: '#08182D', lineHeight: 18 },
  profileButton: {
    backgroundColor: '#08182D',
    borderRadius: 12, padding: 16,
    alignItems: 'center', marginBottom: 12,
  },
  profileButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  discoverButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 16,
    alignItems: 'center', marginBottom: 20,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  discoverButtonText: { color: '#374151', fontSize: 15, fontWeight: '600' },
});