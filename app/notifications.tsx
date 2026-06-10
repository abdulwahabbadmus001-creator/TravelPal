import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, SafeAreaView, StatusBar
} from 'react-native';
import { useState } from 'react';
// @ts-ignore: expo-router does not provide TypeScript declarations in this project
import { router } from 'expo-router';

const mockNotifications = [
  {
    id: '1',
    type: 'join_approved',
    title: 'Join Request Approved',
    message: 'Your request to join Zanzibar Beach Squad has been approved.',
    time: '2 mins ago',
    read: false,
    groupId: '2',
  },
  {
    id: '2',
    type: 'new_message',
    title: 'New Message',
    message: 'Chidi Okeke sent a message in Lagos to Abuja Road Trip.',
    time: '15 mins ago',
    read: false,
    groupId: '1',
  },
  {
    id: '3',
    type: 'join_request',
    title: 'New Join Request',
    message: 'Someone requested to join your group Cape Town Adventure.',
    time: '1 hour ago',
    read: true,
    groupId: '4',
  },
  {
    id: '4',
    type: 'join_rejected',
    title: 'Join Request Declined',
    message: 'Your request to join Accra Culture Trip was not approved.',
    time: '3 hours ago',
    read: true,
    groupId: '3',
  },
  {
    id: '5',
    type: 'trust_score',
    title: 'Trust Score Updated',
    message: 'Your trust score increased to 82 after your last trip rating.',
    time: '1 day ago',
    read: true,
    groupId: null,
  },
  {
    id: '6',
    type: 'emergency',
    title: 'Emergency Alert Resolved',
    message: 'Your emergency alert has been reviewed and resolved by an admin.',
    time: '2 days ago',
    read: true,
    groupId: null,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'join_approved': return '✅';
    case 'join_rejected': return '❌';
    case 'join_request': return '👋';
    case 'new_message': return '💬';
    case 'trust_score': return '⭐';
    case 'emergency': return '🆘';
    default: return '🔔';
  }
};

const getIconBg = (type: string) => {
  switch (type) {
    case 'join_approved': return '#D1FAE5';
    case 'join_rejected': return '#FEE2E2';
    case 'join_request': return '#CCF1FF';
    case 'new_message': return '#CCF1FF';
    case 'trust_score': return '#FEF3C7';
    case 'emergency': return '#FEE2E2';
    default: return '#F3F4F6';
  }
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderNotification = ({ item }: { item: typeof mockNotifications[0] }) => (
    <TouchableOpacity
      style={[styles.notifCard, !item.read && styles.unreadCard]}
      onPress={() => {
        markRead(item.id);
        if (item.groupId) router.push(`/group/${item.groupId}`);
      }}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: getIconBg(item.type) }]}>
        <Text style={styles.icon}>{getIcon(item.type)}</Text>
      </View>
      <View style={styles.notifContent}>
        <View style={styles.notifHeader}>
          <Text style={styles.notifTitle}>{item.title}</Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notifMessage} numberOfLines={2}>{item.message}</Text>
        <Text style={styles.notifTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#08182D" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {unreadCount > 0 && (
        <View style={styles.unreadBanner}>
          <Text style={styles.unreadBannerText}>
            You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyTitle}>No Notifications Yet</Text>
          <Text style={styles.emptySubtitle}>
            Join groups and stay active to receive updates here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  markAllText: { color: '#CCF1FF', fontSize: 13, fontWeight: '500', width: 80, textAlign: 'right' },
  unreadBanner: {
    backgroundColor: '#CCF1FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCF1FF',
  },
  unreadBannerText: { color: '#08182D', fontSize: 13, fontWeight: '600' },
  listContent: { padding: 16, paddingBottom: 100 },
  notifCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadCard: {
    backgroundColor: '#F0F7FF',
    borderColor: '#CCF1FF',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 20 },
  notifContent: { flex: 1 },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: { fontSize: 14, fontWeight: 'bold', color: '#111827', flex: 1 },
  unreadDot: {
    width: 8, height: 8,
    borderRadius: 4,
    backgroundColor: '#08182D',
    marginLeft: 8,
  },
  notifMessage: { fontSize: 13, color: '#6B7280', lineHeight: 18, marginBottom: 6 },
  notifTime: { fontSize: 11, color: '#9CA3AF' },
  emptyState: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', padding: 30,
  },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#08182D', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center' },
});