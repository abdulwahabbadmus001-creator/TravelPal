import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, SafeAreaView, StatusBar
} from 'react-native';
import { router } from 'expo-router';
import { mockGroups } from '../../constants/mockData';
import GroupCard from '../../components/GroupCard';

export default function GroupsScreen() {
  const myGroups = mockGroups.filter(g => g.owner === 'Wahab Badmus');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Groups</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/group/create')}
        >
          <Text style={styles.createButtonText}>+ Create</Text>
        </TouchableOpacity>
      </View>

      {myGroups.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>✈️</Text>
          <Text style={styles.emptyTitle}>No Groups Yet</Text>
          <Text style={styles.emptySubtitle}>
            Join or create a group to start your journey
          </Text>
          <TouchableOpacity
            style={styles.discoverButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.discoverButtonText}>Discover Groups</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={myGroups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GroupCard
              group={item}
              onPress={() => router.push(`/group/${item.id}`)}
            />
          )}
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
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  createButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10
  },
  createButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  emptyState: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30
  },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  emptySubtitle: {
    fontSize: 14, color: '#6B7280',
    textAlign: 'center', marginBottom: 24
  },
  discoverButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12
  },
  discoverButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
  listContent: { padding: 16, paddingBottom: 100 },
});