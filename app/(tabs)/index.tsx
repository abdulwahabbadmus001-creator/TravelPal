import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TextInput, TouchableOpacity, SafeAreaView,
  StatusBar
} from 'react-native';
import { router } from 'expo-router';
import { mockGroups } from '../../constants/mockData';
import GroupCard from '../../components/GroupCard';
import { groupService } from '../../services/api';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [groups, setGroups] = useState(mockGroups);

  useEffect(() => {
  const loadGroups = async () => {
    try {
      const result = await groupService.getAll();
      if (result?.groups?.length > 0) {
        setGroups(result.groups);
      }
    } catch (error) {
      console.log('Using mock data');
    }
  };
  loadGroups();
}, []);

  const filtered = groups.filter((g: any) =>
    (g.destination || '').toLowerCase().includes(search.toLowerCase()) ||
    (g.name || g.groupName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#08182D" />

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
          <Text style={styles.statNumber}>{groups.length}</Text>
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
        keyExtractor={(item: any) => item._id || item.id}
        renderItem={({ item }: any) => (
          <GroupCard
            group={{
              id: item._id || item.id,
              name: item.groupName || item.name,
              destination: item.destination,
              members: item.currentMembers || item.members,
              maxMembers: item.maxMembers,
              isPrivate: item.visibility === 'private' || item.isPrivate,
              trustScore: item.trustScore || 75,
              description: item.description,
              owner: item.ownerName || item.owner,
            }}
            onPress={() => router.push(`/group/${item._id || item.id}`)}
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
    padding: 10, borderRadius: 12,
  },
  notifBadge: {
    position: 'absolute',
    top: -4, right: -4,
    backgroundColor: '#E14F1E',
    width: 16, height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBadgeText: {
    color: '#FFFFFF', fontSize: 9, fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', margin: 16,
    borderRadius: 12, paddingHorizontal: 14,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: {
    flex: 1, paddingVertical: 12,
    fontSize: 15, color: '#08182D',
  },
  statsRow: {
    flexDirection: 'row', paddingHorizontal: 16,
    gap: 12, marginBottom: 16,
  },
  statCard: {
    flex: 1, backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 14,
    alignItems: 'center',
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: '#00AEEF' },
  statLabel: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  sectionTitle: {
    fontSize: 17, fontWeight: 'bold',
    color: '#08182D', paddingHorizontal: 16, marginBottom: 8,
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 100 },
});