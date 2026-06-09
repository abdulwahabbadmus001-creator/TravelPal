import { View, Text, StyleSheet } from 'react-native';

type Props = {
  score: number;
};

export default function TrustScore({ score }: Props) {
  const color =
    score >= 70 ? '#10B981' :
    score >= 40 ? '#F59E0B' : '#EF4444';

  const label =
    score >= 70 ? 'Trusted' :
    score >= 40 ? 'Moderate' : 'Low Trust';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trust Score</Text>
        <View style={[styles.badge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.badgeText, { color }]}>{label}</Text>
        </View>
      </View>

      <View style={styles.scoreRow}>
        <Text style={[styles.scoreNumber, { color }]}>{score}</Text>
        <Text style={styles.scoreMax}>/100</Text>
      </View>

      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${score}%`, backgroundColor: color }]} />
      </View>

      {score < 40 && (
        <Text style={styles.warningText}>⚠️ Low trust score detected</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', borderRadius: 12,
    padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#E5E7EB'
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8
  },
  title: { fontSize: 15, fontWeight: 'bold', color: '#08182D' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  scoreRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 },
  scoreNumber: { fontSize: 32, fontWeight: 'bold' },
  scoreMax: { fontSize: 16, color: '#9CA3AF', marginLeft: 4 },
  barBackground: {
    height: 8, backgroundColor: '#F3F4F6',
    borderRadius: 4, overflow: 'hidden'
  },
  barFill: { height: '100%', borderRadius: 4 },
  warningText: { fontSize: 12, color: '#EF4444', marginTop: 8 },
});