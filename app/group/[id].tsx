import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { mockGroups } from '../../constants/mockData';
import TrustScore from '../../components/TrustScore';

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams();
  const group = mockGroups.find(g => g.id === id);

  if (!group) return null;

  const canJoin = group.trustScore >= 25;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group Details</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.destinationEmoji}>✈️</Text>
          <Text style={styles.destination}>{group.destination}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.groupName}>{group.name}</Text>
            {group.isPrivate && (
              <View style={styles.privateBadge}>
                <Text style={styles.privateBadgeText}>🔒 Private</Text>
              </View>
            )}
          </View>

          <Text style={styles.description}>{group.description}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>👥 {group.members}/{group.maxMembers} members</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>👤 by {group.owner}</Text>
            </View>
          </View>

          <TrustScore score={group.trustScore} />

          {group.trustScore < 40 && (
            <View style={styles.warningBanner}>
              <Text style={styles.warningText}>
                ⚠️ This group has a low trust score. Exercise caution.
              </Text>
            </View>
          )}

          <View style={styles.membersCard}>
            <Text style={styles.cardTitle}>Members ({group.members})</Text>
            {['Traveller A', 'Traveller B', 'Traveller C']
              .slice(0, group.members > 3 ? 3 : group.members)
              .map((name, i) => (
                <View key={i} style={styles.memberRow}>
                  <View style={styles.memberAvatar}>
                    <Text style={styles.memberAvatarText}>{name.charAt(0)}</Text>
                  </View>
                  <Text style={styles.memberName}>{name}</Text>
                  {i === 0 && (
                    <View style={styles.ownerBadge}>
                      <Text style={styles.ownerBadgeText}>Owner</Text>
                    </View>
                  )}
                </View>
              ))}
          </View>

          {canJoin ? (
            group.isPrivate ? (
              <TouchableOpacity style={styles.requestButton}>
                <Text style={styles.requestButtonText}>Request to Join</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => router.push(`/chat/${group.id}`)}
              >
                <Text style={styles.joinButtonText}>Join Group</Text>
              </TouchableOpacity>
            )
          ) : (
            <View style={styles.disabledButton}>
              <Text style={styles.disabledButtonText}>Trust Score Too Low to Join</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => router.push(`/chat/${group.id}`)}
          >
            <Text style={styles.chatButtonText}>💬 View Group Chat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#2563EB',
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16
  },
  backButton: { width: 60 },
  backText: { color: '#FFFFFF', fontSize: 15, fontWeight: '500' },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  heroSection: {
    backgroundColor: '#2563EB',
    alignItems: 'center', paddingVertical: 24
  },
  destinationEmoji: { fontSize: 50, marginBottom: 8 },
  destination: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  content: {
    padding: 16, backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -10
  },
  titleRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 8, marginTop: 4
  },
  groupName: { fontSize: 20, fontWeight: 'bold', color: '#111827', flex: 1 },
  privateBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20
  },
  privateBadgeText: { fontSize: 12, color: '#D97706', fontWeight: '600' },
  description: { fontSize: 14, color: '#6B7280', lineHeight: 20, marginBottom: 16 },
  infoRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoText: { fontSize: 13, color: '#6B7280' },
  warningBanner: {
    backgroundColor: '#FEF3C7', borderRadius: 10,
    padding: 12, marginBottom: 16,
    borderLeftWidth: 4, borderLeftColor: '#F59E0B'
  },
  warningText: { fontSize: 13, color: '#92400E' },
  membersCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12,
    padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#E5E7EB'
  },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  memberRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 8, gap: 10,
    borderBottomWidth: 1, borderBottomColor: '#F3F4F6'
  },
  memberAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center', alignItems: 'center'
  },
  memberAvatarText: { fontSize: 16, fontWeight: 'bold', color: '#2563EB' },
  memberName: { flex: 1, fontSize: 14, color: '#374151', fontWeight: '500' },
  ownerBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10
  },
  ownerBadgeText: { fontSize: 11, color: '#2563EB', fontWeight: '600' },
  joinButton: {
    backgroundColor: '#2563EB', borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 12
  },
  joinButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  requestButton: {
    backgroundColor: '#F59E0B', borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 12
  },
  requestButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  disabledButton: {
    backgroundColor: '#F3F4F6', borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 12
  },
  disabledButtonText: { color: '#9CA3AF', fontSize: 15, fontWeight: '600' },
  chatButton: {
    backgroundColor: '#EFF6FF', borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 100,
    borderWidth: 1, borderColor: '#BFDBFE'
  },
  chatButtonText: { color: '#2563EB', fontSize: 15, fontWeight: '600' },
});