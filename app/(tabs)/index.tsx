import {
  View, Text, StyleSheet, FlatList,
  TextInput, TouchableOpacity, SafeAreaView, StatusBar
} from 'react-native';
import { useState } from 'react';

// @ts-ignore: expo-router does not provide TypeScript declarations in this project
import { router } from 'expo-router';
import { mockGroups } from '../../constants/mockData';
import GroupCard from '../../components/GroupCard';

export default function HomeScreen() {
  const [search, setSearch] = useState('');

  const filtered = mockGroups.filter(g =>
    g.destination.toLowerCase().includes(search.toLowerCase()) ||
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning 👋</Text>
          <Text style={styles.headerTitle}>Find Your Travel Tribe</Text>
        </View>
        <TouchableOpacity          
          style={styles.notifButton}
          onPress={() => router.push('/notifications')}
        >
          <Text style={{ fontSize: 20 }}>🔔</Text>
          <View style={styles.notifBadge}>
            <Text style={styles.notifBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search by destination..."
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Active Groups</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>18</Text>
          <Text style={styles.statLabel}>Travellers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Destinations</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Available Groups</Text>

      <FlatList
        data={filtered}
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  greeting: { color: '#CCF1FF', fontSize: 14 },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  notifButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10, borderRadius: 12
  },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', margin: 16,
    borderRadius: 12, paddingHorizontal: 14,
    borderWidth: 1, borderColor: '#E5E7EB'
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#08182D' },
  statsRow: {
    flexDirection: 'row', paddingHorizontal: 16,
    gap: 12, marginBottom: 16
  },
  statCard: {
    flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12,
    padding: 14, alignItems: 'center',
    borderWidth: 1, borderColor: '#E5E7EB'
  },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: '#08182D' },
  statLabel: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  sectionTitle: {
    fontSize: 17, fontWeight: 'bold',
    color: '#08182D', paddingHorizontal: 16, marginBottom: 8
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 100 },
  notifBadge: {
  position: 'absolute',
  top: -4, right: -4,
  backgroundColor: '#EF4444',
  width: 16, height: 16,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
},
notifBadgeText: {
  color: '#FFFFFF',
  fontSize: 9,
  fontWeight: 'bold',
},
});