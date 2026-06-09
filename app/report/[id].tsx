import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, TextInput
} from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';

const reportReasons = [
  { id: '1', label: 'Harassment or Bullying', icon: '😡' },
  { id: '2', label: 'Fake or Impersonation', icon: '🎭' },
  { id: '3', label: 'Spam or Advertising', icon: '📢' },
  { id: '4', label: 'Safety Concern', icon: '⚠️' },
  { id: '5', label: 'Inappropriate Content', icon: '🚫' },
  { id: '6', label: 'Scam or Fraud', icon: '💰' },
  { id: '7', label: 'Other', icon: '📝' },
];

export default function ReportScreen() {
  const { id } = useLocalSearchParams();
  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedReason) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#00AEEF" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report Submitted</Text>
          <View style={{ width: 60 }} />
        </View>
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <Text style={styles.successIcon}>✅</Text>
          </View>
          <Text style={styles.successTitle}>Report Received</Text>
          <Text style={styles.successMessage}>
            Thank you for helping keep TravelPal safe. Your report has been logged and will be reviewed by a group owner within 24 hours. Serious violations are escalated to platform admins within 48 hours.
          </Text>
          <Text style={styles.successNote}>
            You will receive a notification with the outcome within 5 business days.
          </Text>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => router.back()}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00AEEF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Content</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Why are you reporting this?</Text>
          <Text style={styles.infoSubtitle}>
            Your report is private. The person you report will not know who reported them.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Select a reason</Text>
        {reportReasons.map((reason) => (
          <TouchableOpacity
            key={reason.id}
            style={[
              styles.reasonCard,
              selectedReason === reason.id && styles.reasonCardSelected,
            ]}
            onPress={() => setSelectedReason(reason.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.reasonIcon}>{reason.icon}</Text>
            <Text style={[
              styles.reasonLabel,
              selectedReason === reason.id && styles.reasonLabelSelected,
            ]}>
              {reason.label}
            </Text>
            <View style={[
              styles.radioOuter,
              selectedReason === reason.id && styles.radioOuterSelected,
            ]}>
              {selectedReason === reason.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionLabel}>Additional details (optional)</Text>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Provide any additional context that might help our review team..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          maxLength={500}
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>{description.length}/500</Text>

        <View style={styles.warningCard}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.warningText}>
            False reports may result in action being taken against your account. Please only report genuine violations.
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            !selectedReason && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!selectedReason}
        >
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#00AEEF',
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
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 16,
    marginBottom: 20,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  infoTitle: { fontSize: 17, fontWeight: 'bold', color: '#08182D', marginBottom: 6 },
  infoSubtitle: { fontSize: 13, color: '#6B7280', lineHeight: 18 },
  sectionLabel: {
    fontSize: 14, fontWeight: '600',
    color: '#374151', marginBottom: 10,
  },
  reasonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, marginBottom: 8,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  reasonCardSelected: {
    borderColor: '#00AEEF',
    backgroundColor: '#CCF1FF',
  },
  reasonIcon: { fontSize: 22 },
  reasonLabel: { flex: 1, fontSize: 14, color: '#374151', fontWeight: '500' },
  reasonLabelSelected: { color: '#00AEEF', fontWeight: '600' },
  radioOuter: {
    width: 20, height: 20,
    borderRadius: 10,
    borderWidth: 2, borderColor: '#D1D5DB',
    justifyContent: 'center', alignItems: 'center',
  },
  radioOuterSelected: { borderColor: '#00AEEF' },
  radioInner: {
    width: 10, height: 10,
    borderRadius: 5,
    backgroundColor: '#00AEEF',
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 14,
    fontSize: 14, color: '#08182D',
    borderWidth: 1, borderColor: '#E5E7EB',
    minHeight: 100, marginBottom: 4,
  },
  charCount: {
    fontSize: 11, color: '#9CA3AF',
    textAlign: 'right', marginBottom: 16,
  },
  warningCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12, padding: 14,
    flexDirection: 'row',
    gap: 10, marginBottom: 20,
    borderWidth: 1, borderColor: '#FDE68A',
  },
  warningIcon: { fontSize: 18 },
  warningText: { flex: 1, fontSize: 13, color: '#92400E', lineHeight: 18 },
  submitButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12, padding: 16,
    alignItems: 'center', marginBottom: 12,
  },
  submitButtonDisabled: { backgroundColor: '#FCA5A5' },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 16,
    alignItems: 'center', marginBottom: 20,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  cancelButtonText: { color: '#6B7280', fontSize: 15, fontWeight: '600' },
  successContainer: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', padding: 30,
  },
  successIconContainer: {
    width: 100, height: 100,
    borderRadius: 50,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center', marginBottom: 20,
  },
  successIcon: { fontSize: 50 },
  successTitle: {
    fontSize: 24, fontWeight: 'bold',
    color: '#08182D', marginBottom: 12,
  },
  successMessage: {
    fontSize: 14, color: '#6B7280',
    textAlign: 'center', lineHeight: 22,
    marginBottom: 16,
  },
  successNote: {
    fontSize: 13, color: '#9CA3AF',
    textAlign: 'center', marginBottom: 30,
  },
  doneButton: {
    backgroundColor: '#00AEEF',
    borderRadius: 12, paddingVertical: 14,
    paddingHorizontal: 40, alignItems: 'center',
  },
  doneButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
});