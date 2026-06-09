import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, Alert
} from 'react-native';
import { useState } from 'react';
// @ts-ignore: expo-router does not provide TypeScript declarations in this project
import { router } from 'expo-router';

const documentTypes = [
  { id: 'nin', label: 'National ID (NIN)', icon: '🪪', description: 'Nigerian National Identification Number card' },
  { id: 'passport', label: 'International Passport', icon: '📗', description: 'Valid Nigerian or foreign passport' },
  { id: 'drivers', label: "Driver's Licence", icon: '🚗', description: 'Valid Nigerian driver\'s licence' },
];

export default function VerifyScreen() {
  const [selectedDoc, setSelectedDoc] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleUpload = () => {
    if (!selectedDoc) {
      Alert.alert('Select Document', 'Please select a document type before uploading.');
      return;
    }
    setUploaded(true);
  };

  const handleSubmit = () => {
    if (!uploaded) return;
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
          <Text style={styles.headerTitle}>ID Verification</Text>
          <View style={{ width: 60 }} />
        </View>
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <Text style={styles.successIcon}>🔵</Text>
          </View>
          <Text style={styles.successTitle}>Document Submitted</Text>
          <Text style={styles.successMessage}>
            Your document has been securely uploaded and is now in our review queue. Our team will verify your identity within 48 hours.
          </Text>
          <View style={styles.successDetailsCard}>
            <View style={styles.successDetailRow}>
              <Text style={styles.successDetailLabel}>Document Type</Text>
              <Text style={styles.successDetailValue}>
                {documentTypes.find(d => d.id === selectedDoc)?.label}
              </Text>
            </View>
            <View style={styles.successDetailRow}>
              <Text style={styles.successDetailLabel}>Status</Text>
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingBadgeText}>Under Review</Text>
              </View>
            </View>
            <View style={styles.successDetailRow}>
              <Text style={styles.successDetailLabel}>Estimated Time</Text>
              <Text style={styles.successDetailValue}>Within 48 hours</Text>
            </View>
          </View>
          <View style={styles.securityNote}>
            <Text style={styles.securityIcon}>🔒</Text>
            <Text style={styles.securityText}>
              Your document is encrypted with AES-256 and stored securely. It is never shared with other users.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <Text style={styles.doneButtonText}>Back to Profile</Text>
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
        <Text style={styles.headerTitle}>ID Verification</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroBanner}>
          <Text style={styles.heroIcon}>🛡️</Text>
          <Text style={styles.heroTitle}>Get ID Verified</Text>
          <Text style={styles.heroSubtitle}>
            Verified users get a blue badge, a higher trust score and more group access across TravelPal.
          </Text>
        </View>

        <View style={styles.benefitsCard}>
          <Text style={styles.sectionTitle}>Benefits of Verification</Text>
          {[
            { icon: '⭐', text: 'Trust score increases by 20 points instantly' },
            { icon: '🔵', text: 'Blue ID Verified badge on your profile' },
            { icon: '👥', text: 'Access to more private groups and communities' },
            { icon: '🤝', text: 'Other travellers are more likely to accept you' },
          ].map((benefit, i) => (
            <View key={i} style={styles.benefitRow}>
              <Text style={styles.benefitIcon}>{benefit.icon}</Text>
              <Text style={styles.benefitText}>{benefit.text}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Select Document Type</Text>
        {documentTypes.map((doc) => (
          <TouchableOpacity
            key={doc.id}
            style={[
              styles.docCard,
              selectedDoc === doc.id && styles.docCardSelected,
            ]}
            onPress={() => setSelectedDoc(doc.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.docIcon}>{doc.icon}</Text>
            <View style={styles.docInfo}>
              <Text style={[
                styles.docLabel,
                selectedDoc === doc.id && styles.docLabelSelected,
              ]}>
                {doc.label}
              </Text>
              <Text style={styles.docDescription}>{doc.description}</Text>
            </View>
            <View style={[
              styles.radioOuter,
              selectedDoc === doc.id && styles.radioOuterSelected,
            ]}>
              {selectedDoc === doc.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}

        {selectedDoc !== '' && (
          <TouchableOpacity
            style={[styles.uploadButton, uploaded && styles.uploadButtonDone]}
            onPress={handleUpload}
            activeOpacity={0.7}
          >
            <Text style={styles.uploadIcon}>{uploaded ? '✅' : '📎'}</Text>
            <Text style={styles.uploadButtonText}>
              {uploaded ? 'Document Ready' : 'Upload Document Photo'}
            </Text>
          </TouchableOpacity>
        )}

        {uploaded && (
          <View style={styles.uploadedCard}>
            <Text style={styles.uploadedIcon}>📄</Text>
            <View style={styles.uploadedInfo}>
              <Text style={styles.uploadedTitle}>
                {documentTypes.find(d => d.id === selectedDoc)?.label}
              </Text>
              <Text style={styles.uploadedStatus}>Ready to submit</Text>
            </View>
            <TouchableOpacity onPress={() => setUploaded(false)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.privacyCard}>
          <Text style={styles.privacyIcon}>🔒</Text>
          <View style={styles.privacyContent}>
            <Text style={styles.privacyTitle}>Your Privacy is Protected</Text>
            <Text style={styles.privacyText}>
              Documents are encrypted in transit and at rest using AES-256. They are never stored on your device and are only seen by our verification team.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedDoc || !uploaded) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!selectedDoc || !uploaded}
        >
          <Text style={styles.submitButtonText}>Submit for Verification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.back()}
        >
          <Text style={styles.skipButtonText}>Do This Later</Text>
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
  heroBanner: {
    backgroundColor: '#00AEEF',
    borderRadius: 16, padding: 24,
    alignItems: 'center', marginBottom: 16,
  },
  heroIcon: { fontSize: 50, marginBottom: 12 },
  heroTitle: {
    fontSize: 22, fontWeight: 'bold',
    color: '#FFFFFF', marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14, color: '#CCF1FF',
    textAlign: 'center', lineHeight: 20,
  },
  benefitsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 16,
    marginBottom: 20,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 15, fontWeight: 'bold',
    color: '#111827', marginBottom: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  benefitIcon: { fontSize: 20 },
  benefitText: { fontSize: 14, color: '#374151', flex: 1 },
  docCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, marginBottom: 10,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  docCardSelected: {
    borderColor: '#00AEEF',
    backgroundColor: '#CCF1FF',
  },
  docIcon: { fontSize: 28 },
  docInfo: { flex: 1 },
  docLabel: { fontSize: 14, fontWeight: '600', color: '#374151' },
  docLabelSelected: { color: '#00AEEF' },
  docDescription: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
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
  uploadButton: {
    backgroundColor: '#CCF1FF',
    borderRadius: 12, padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, marginTop: 8, marginBottom: 12,
    borderWidth: 2, borderColor: '#00AEEF',
    borderStyle: 'dashed',
  },
  uploadButtonDone: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },
  uploadIcon: { fontSize: 20 },
  uploadButtonText: { fontSize: 15, fontWeight: '600', color: '#00AEEF' },
  uploadedCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12, padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, marginBottom: 16,
    borderWidth: 1, borderColor: '#86EFAC',
  },
  uploadedIcon: { fontSize: 24 },
  uploadedInfo: { flex: 1 },
  uploadedTitle: { fontSize: 14, fontWeight: '600', color: '#08182D' },
  uploadedStatus: { fontSize: 12, color: '#10B981' },
  removeText: { fontSize: 13, color: '#EF4444', fontWeight: '600' },
  privacyCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12, padding: 14,
    flexDirection: 'row',
    gap: 10, marginBottom: 20,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  privacyIcon: { fontSize: 20 },
  privacyContent: { flex: 1 },
  privacyTitle: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 4 },
  privacyText: { fontSize: 12, color: '#6B7280', lineHeight: 18 },
  submitButton: {
    backgroundColor: '#00AEEF',
    borderRadius: 12, padding: 16,
    alignItems: 'center', marginBottom: 12,
  },
  submitButtonDisabled: { backgroundColor: '#93C5FD' },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  skipButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 16,
    alignItems: 'center', marginBottom: 20,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  skipButtonText: { color: '#6B7280', fontSize: 15, fontWeight: '600' },
  successContainer: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', padding: 24,
  },
  successIconContainer: {
    width: 100, height: 100,
    borderRadius: 50,
    backgroundColor: '#CCF1FF',
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
    marginBottom: 20,
  },
  successDetailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 16,
    width: '100%', marginBottom: 16,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  successDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  successDetailLabel: { fontSize: 13, color: '#6B7280' },
  successDetailValue: { fontSize: 13, fontWeight: '600', color: '#08182D' },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  pendingBadgeText: { fontSize: 12, color: '#D97706', fontWeight: '600' },
  securityNote: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12, padding: 12,
    flexDirection: 'row',
    gap: 8, marginBottom: 24, width: '100%',
    borderWidth: 1, borderColor: '#86EFAC',
  },
  securityIcon: { fontSize: 18 },
  securityText: { flex: 1, fontSize: 12, color: '#166534', lineHeight: 18 },
  doneButton: {
    backgroundColor: '#00AEEF',
    borderRadius: 12, paddingVertical: 14,
    paddingHorizontal: 40, alignItems: 'center',
  },
  doneButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
});