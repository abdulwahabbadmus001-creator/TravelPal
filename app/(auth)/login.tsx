import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert
} from 'react-native';
import { router } from 'expo-router';
import { authService } from '../../services/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.token || result.success) {
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || '';
      if (message === 'Please verify your email first') {
        Alert.alert('Verify Email', 'Please check your inbox and verify your email before logging in.');
      } else if (message === 'Invalid email or password') {
        Alert.alert('Login Failed', 'Incorrect email or password.');
      } else {
        router.replace('/(tabs)');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.logo}>✈ TravelPal</Text>
          <Text style={styles.tagline}>Find Your Travel Tribe</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginButton, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.registerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#08182D' },
  scrollContent: { flexGrow: 1 },
  header: { alignItems: 'center', paddingTop: 80, paddingBottom: 40 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  tagline: { fontSize: 16, color: '#CCF1FF' },
  form: {
    flex: 1, backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#08182D', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12,
    padding: 14, fontSize: 15, color: '#08182D', backgroundColor: '#F9FAFB'
  },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotText: { color: '#00AEEF', fontSize: 14, fontWeight: '500' },
  loginButton: {
    backgroundColor: '#00AEEF', borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 20
  },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  registerRow: { flexDirection: 'row', justifyContent: 'center' },
  registerText: { color: '#6B7280', fontSize: 14 },
  registerLink: { color: '#00AEEF', fontSize: 14, fontWeight: '600' },
});
