import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar, Alert, Dimensions
} from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { mockGroups, mockGroupMembers, mockJoinRequests, mockBlockedUsers } from '../../constants/mockData';

const { width } = Dimensions.get('window');

export default function MemberManagementScreen() {
  const { id } = useLocalSearchParams();
  const groupId = typeof id === 'string' ? id : '';
  const group = mockGroups.find(g => g.id === groupId);

  if (!group) return null;

  const [activeTab, setActiveTab] = useState<'members' | 'requests'>('members');
  const [members, setMembers] = useState(mockGroupMembers[groupId] || []);
  const [requests, setRequests] = useState(mockJoinRequests[groupId] || []);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleApprove = (reqId: string, name: string) => {
    const requestItem = requests.find(r => r.id === reqId);
    if (!requestItem) return;

    // Add to members
    const newMember = {
      id: requestItem.id,
      name: requestItem.name,
      trustScore: requestItem.trustScore,
      role: 'member' as const
    };
    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    mockGroupMembers[groupId] = updatedMembers;

    // Remove from requests
    const updatedRequests = requests.filter(r => r.id !== reqId);
    setRequests(updatedRequests);
    mockJoinRequests[groupId] = updatedRequests;

    // Update group counts
    group.members = updatedMembers.length;

    showToast(`Approved ${name}! They are now a member.`);
  };

  const handleReject = (reqId: string, name: string) => {
    Alert.alert(
      "Reject Request",
      `Are you sure you want to reject the request from ${name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reject",
          style: "destructive",
          onPress: () => {
            const updatedRequests = requests.filter(r => r.id !== reqId);
            setRequests(updatedRequests);
            mockJoinRequests[groupId] = updatedRequests;
            showToast(`Rejected request from ${name}.`);
          }
        }
      ]
    );
  };

  const handleRemove = (memberId: string, name: string) => {
    Alert.alert(
      "Remove Member",
      `Are you sure you want to remove ${name} from this group? They will lose access immediately.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            const updatedMembers = members.filter(m => m.id !== memberId);
            setMembers(updatedMembers);
            mockGroupMembers[groupId] = updatedMembers;
            group.members = updatedMembers.length;
            showToast(`Removed ${name} from the group.`);
          }
        }
      ]
    );
  };

  const handleBlock = (memberId: string, name: string) => {
    Alert.alert(
      "Block User",
      `Are you sure you want to block ${name}? They will be removed from the group and won't be able to request to join again.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Block User",
          style: "destructive",
          onPress: () => {
            // Remove from members
            const updatedMembers = members.filter(m => m.id !== memberId);
            setMembers(updatedMembers);
            mockGroupMembers[groupId] = updatedMembers;
            group.members = updatedMembers.length;

            // Add to blocked users list
            if (!mockBlockedUsers[groupId]) {
              mockBlockedUsers[groupId] = [];
            }
            mockBlockedUsers[groupId].push(memberId);

            showToast(`Blocked ${name} and revoked access.`);
          }
        }
      ]
    );
  };

  const getTrustColor = (score: number) => {
    if (score >= 70) return { bg: '#ECFDF5', text: '#10B981', label: 'Trusted' };
    if (score >= 40) return { bg: '#FEF3C7', text: '#D97706', label: 'Moderate' };
    return { bg: '#FEF2F2', text: '#EF4444', label: 'Low Trust' };
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Group</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Toast Notification */}
      {toast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>✅ {toast}</Text>
        </View>
      )}

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'members' && styles.activeTab]}
          onPress={() => setActiveTab('members')}
        >
          <Text style={[styles.tabText, activeTab === 'members' && styles.activeTabText]}>
            Members ({members.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Join Requests
          </Text>
          {requests.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{requests.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Scrollable list */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        {activeTab === 'members' ? (
          /* Members List */
          members.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>👥</Text>
              <Text style={styles.emptyTitle}>No members yet</Text>
              <Text style={styles.emptySubtitle}>Approved travelers will appear here.</Text>
            </View>
          ) : (
            members.map((member) => {
              const trust = getTrustColor(member.trustScore);
              return (
                <View key={member.id} style={styles.card}>
                  <View style={styles.userInfoRow}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{member.name.charAt(0)}</Text>
                    </View>
                    <View style={styles.userDetails}>
                      <View style={styles.nameRow}>
                        <Text style={styles.userName}>{member.name}</Text>
                        {member.role === 'owner' && (
                          <View style={styles.ownerLabel}>
                            <Text style={styles.ownerLabelText}>Owner</Text>
                          </View>
                        )}
                      </View>
                      <View style={[styles.trustPill, { backgroundColor: trust.bg }]}>
                        <Text style={[styles.trustPillText, { color: trust.text }]}>
                          ★ {member.trustScore} • {trust.label}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Actions (Only show for other members, not the owner) */}
                  {member.role !== 'owner' && (
                    <View style={styles.actionsRow}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.removeButton]}
                        onPress={() => handleRemove(member.id, member.name)}
                      >
                        <Text style={styles.removeButtonText}>Remove</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionButton, styles.blockButton]}
                        onPress={() => handleBlock(member.id, member.name)}
                      >
                        <Text style={styles.blockButtonText}>Block</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })
          )
        ) : (
          /* Join Requests List */
          requests.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>✉️</Text>
              <Text style={styles.emptyTitle}>No pending requests</Text>
              <Text style={styles.emptySubtitle}>You will be notified when someone requests to join.</Text>
            </View>
          ) : (
            requests.map((req) => {
              const trust = getTrustColor(req.trustScore);
              return (
                <View key={req.id} style={styles.card}>
                  <View style={styles.userInfoRow}>
                    <View style={[styles.avatar, { backgroundColor: '#FEF3C7' }]}>
                      <Text style={[styles.avatarText, { color: '#D97706' }]}>{req.name.charAt(0)}</Text>
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userName}>{req.name}</Text>
                      <View style={[styles.trustPill, { backgroundColor: trust.bg }]}>
                        <Text style={[styles.trustPillText, { color: trust.text }]}>
                          ★ {req.trustScore} • {trust.label}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Requester Bio/Profile */}
                  {req.bio && (
                    <View style={styles.bioContainer}>
                      <Text style={styles.bioTitle}>Bio / Message:</Text>
                      <Text style={styles.bioText}>"{req.bio}"</Text>
                    </View>
                  )}

                  {/* Approve/Reject Actions */}
                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.rejectButton]}
                      onPress={() => handleReject(req.id, req.name)}
                    >
                      <Text style={styles.rejectButtonText}>Reject</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionButton, styles.approveButton]}
                      onPress={() => handleApprove(req.id, req.name)}
                    >
                      <Text style={styles.approveButtonText}>Approve</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )
        )}
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
  backText: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  toast: {
    position: 'absolute', top: 60, left: 16, right: 16, zIndex: 100,
    backgroundColor: '#065F46', borderRadius: 10, padding: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, shadowRadius: 4, elevation: 4,
    alignItems: 'center'
  },
  toastText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  tabBar: {
    flexDirection: 'row', backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB'
  },
  tab: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    flexDirection: 'row', paddingVertical: 14, borderBottomWidth: 2, borderBottomColor: 'transparent'
  },
  activeTab: { borderBottomColor: '#2563EB' },
  tabText: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
  activeTabText: { color: '#2563EB', fontWeight: 'bold' },
  badge: {
    backgroundColor: '#F59E0B', borderRadius: 10,
    paddingHorizontal: 6, paddingVertical: 2, marginLeft: 6
  },
  badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' },
  listContainer: { padding: 16, paddingBottom: 60 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16,
    marginBottom: 14, borderWidth: 1, borderColor: '#E5E7EB',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1
  },
  userInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#EFF6FF',
    justifyContent: 'center', alignItems: 'center'
  },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#2563EB' },
  userDetails: { flex: 1, gap: 4 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  userName: { fontSize: 15, fontWeight: 'bold', color: '#111827' },
  ownerLabel: { backgroundColor: '#EFF6FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  ownerLabelText: { fontSize: 9, color: '#2563EB', fontWeight: '700' },
  trustPill: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  trustPillText: { fontSize: 11, fontWeight: '600' },
  bioContainer: {
    backgroundColor: '#F9FAFB', borderLeftWidth: 3, borderLeftColor: '#F59E0B',
    borderRadius: 8, padding: 10, marginVertical: 12
  },
  bioTitle: { fontSize: 11, fontWeight: 'bold', color: '#4B5563', marginBottom: 2 },
  bioText: { fontSize: 12, color: '#4B5563', fontStyle: 'italic', lineHeight: 16 },
  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  actionButton: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1 },
  removeButton: { borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' },
  removeButtonText: { color: '#EF4444', fontWeight: '600', fontSize: 13 },
  blockButton: { borderColor: '#FEF2F2', backgroundColor: '#FEF2F2' },
  blockButtonText: { color: '#EF4444', fontWeight: '600', fontSize: 13 },
  approveButton: { borderColor: '#10B981', backgroundColor: '#10B981' },
  approveButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 },
  rejectButton: { borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' },
  rejectButtonText: { color: '#6B7280', fontWeight: '600', fontSize: 13 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, marginTop: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  emptySubtitle: { fontSize: 13, color: '#6B7280', textAlign: 'center' }
});
