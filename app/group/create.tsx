import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar, Switch, KeyboardAvoidingView, Platform
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { mockGroups, mockGroupMembers, mockJoinRequests, mockBlockedUsers, mockUser } from '../../constants/mockData';

export default function CreateGroupScreen() {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [maxMembers, setMaxMembers] = useState(8);

  // Error states
  const [errors, setErrors] = useState<{
    name?: string;
    destination?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Group name is required';
    if (!destination.trim()) newErrors.destination = 'Destination is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!startDate.trim()) {
      newErrors.startDate = 'Start date is required';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      newErrors.startDate = 'Format must be YYYY-MM-DD';
    }
    if (!endDate.trim()) {
      newErrors.endDate = 'End date is required';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      newErrors.endDate = 'Format must be YYYY-MM-DD';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validate()) return;

    const newId = (mockGroups.length + 1).toString();
    const newGroup = {
      id: newId,
      name: name.trim(),
      destination: destination.trim(),
      members: 1,
      maxMembers,
      isPrivate,
      trustScore: mockUser.trustScore,
      image: `https://picsum.photos/400/200?random=${newId}`,
      description: description.trim(),
      owner: mockUser.name,
      startDate,
      endDate
    };

    // Save to global mock states
    mockGroups.push(newGroup);
    
    mockGroupMembers[newId] = [
      { id: `owner_${newId}`, name: mockUser.name, trustScore: mockUser.trustScore, role: 'owner', isVerified: true, joinedDate: 'Today' }
    ];
    mockJoinRequests[newId] = [];
    (mockBlockedUsers as any)[newId] = [];

    // Redirect to group details
    router.replace(`/group/${newId}`);
  };

  const incrementMembers = () => setMaxMembers(prev => Math.min(50, prev + 1));
  const decrementMembers = () => setMaxMembers(prev => Math.max(2, prev - 1));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Group</Text>
        <View style={{ width: 60 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Group Details</Text>
          <Text style={styles.sectionSubtitle}>Set up your travel group and invite others</Text>

          {/* Group Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Group Name</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Nairobi Safari Adventurers"
              placeholderTextColor="#9CA3AF"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          {/* Destination */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Destination</Text>
            <TextInput
              style={[styles.input, errors.destination && styles.inputError]}
              value={destination}
              onChangeText={setDestination}
              placeholder="e.g. Nairobi, Kenya"
              placeholderTextColor="#9CA3AF"
            />
            {errors.destination && <Text style={styles.errorText}>{errors.destination}</Text>}
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea, errors.description && styles.inputError]}
              value={description}
              onChangeText={setDescription}
              placeholder="What is the plan? Mention budget, style of travel, and ideal companion vibe."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
          </View>

          {/* Dates */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Start Date</Text>
              <TextInput
                style={[styles.input, errors.startDate && styles.inputError]}
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9CA3AF"
                maxLength={10}
              />
              {errors.startDate && <Text style={styles.errorText}>{errors.startDate}</Text>}
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>End Date</Text>
              <TextInput
                style={[styles.input, errors.endDate && styles.inputError]}
                value={endDate}
                onChangeText={setEndDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9CA3AF"
                maxLength={10}
              />
              {errors.endDate && <Text style={styles.errorText}>{errors.endDate}</Text>}
            </View>
          </View>

          {/* Settings Section */}
          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Group Settings</Text>

          {/* Max Members Stepper */}
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Max Members</Text>
              <Text style={styles.settingDesc}>How many travellers can join?</Text>
            </View>
            <View style={styles.stepper}>
              <TouchableOpacity onPress={decrementMembers} style={styles.stepperButton}>
                <Text style={styles.stepperButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.stepperValue}>{maxMembers}</Text>
              <TouchableOpacity onPress={incrementMembers} style={styles.stepperButton}>
                <Text style={styles.stepperButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Privacy Switch */}
          <View style={styles.settingRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.settingLabel}>Private Group</Text>
              <Text style={styles.settingDesc}>
                If private, travellers must request to join and be approved by you.
              </Text>
            </View>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }}
              thumbColor={isPrivate ? '#2563EB' : '#F3F4F6'}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Create Travel Group</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  backButton: { width: 65 },
  backText: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  scrollContent: { padding: 24, paddingBottom: 60 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, color: '#6B7280', marginBottom: 20 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12,
    padding: 14, fontSize: 15, color: '#111827', backgroundColor: '#FFFFFF'
  },
  inputError: { borderColor: '#EF4444' },
  errorText: { color: '#EF4444', fontSize: 12, marginTop: 4, fontWeight: '500' },
  textArea: { height: 100 },
  row: { flexDirection: 'row', gap: 12 },
  settingRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 16, padding: 16, marginBottom: 14
  },
  settingLabel: { fontSize: 15, fontWeight: 'bold', color: '#1F2937' },
  settingDesc: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  stepper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10 },
  stepperButton: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F4F6' },
  stepperButtonText: { fontSize: 18, fontWeight: 'bold', color: '#374151' },
  stepperValue: { paddingHorizontal: 16, fontSize: 16, fontWeight: 'bold', color: '#111827' },
  createButton: {
    backgroundColor: '#2563EB', borderRadius: 14,
    padding: 16, alignItems: 'center', marginTop: 20,
    shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 6, elevation: 3
  },
  createButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});
