import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Group = {
  id: string;
  name: string;
  destination: string;
  members: number;
  maxMembers: number;
  isPrivate: boolean;
  trustScore: number;
  description: string;
  owner: string;
};

type Props = {
  group: Group;
  onPress: () => void;
};

export default function GroupCard({ group, onPress }: Props) {
  const trustColor =
    group.trustScore >= 70 ? '#10B981' :
    group.trustScore >= 40 ? '#F59E0B' : '#EF4444';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <Text style={styles.destinationIcon}>✈️</Text>
        <View style={[styles.trustBadge, { backgroundColor: trustColor }]}>
          <Text style={styles.trustBadgeText}>Trust: {group.trustScore}</Text>
        </View>
        {group.isPrivate && (
          <View style={styles.privateBadge}>
            <Text style={styles.privateBadgeText}>🔒 Private</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.groupName} numberOfLines={1}>{group.name}</Text>
        <Text style={styles.destination}>📍 {group.destination}</Text>
        <Text style={styles.description} numberOfLines={2}>{group.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.members}>👥 {group.members}/{group.maxMembers} members</Text>
          <Text style={styles.owner}>by {group.owner}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16,
    marginBottom: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: '#E5E7EB',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3
  },
  imageContainer: {
    height: 100, backgroundColor: '#EFF6FF',
    justifyContent: 'center', alignItems: 'center', position: 'relative'
  },
  destinationIcon: { fontSize: 40 },
  trustBadge: {
    position: 'absolute', top: 8, right: 8,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10
  },
  trustBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },
  privateBadge: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10
  },
  privateBadgeText: { fontSize: 11, color: '#D97706', fontWeight: '600' },
  content: { padding: 14 },
  groupName: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  destination: { fontSize: 13, color: '#2563EB', marginBottom: 6, fontWeight: '500' },
  description: { fontSize: 13, color: '#6B7280', lineHeight: 18, marginBottom: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  members: { fontSize: 12, color: '#6B7280' },
  owner: { fontSize: 12, color: '#9CA3AF' },
});