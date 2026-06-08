import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, StatusBar, Dimensions
} from 'react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />

      {/* Decorative top background curve */}
      <View style={styles.heroBackground}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>✈️</Text>
          <Text style={styles.logoText}>TravelPal</Text>
        </View>
        <Text style={styles.heroTagline}>Your journey is better together.</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to TravelPal</Text>
        <Text style={styles.subtitle}>
          Discover the easiest and safest way to find travel companions, share adventures, and explore the world.
        </Text>

        {/* Value Propositions */}
        <View style={styles.features}>
          <View style={styles.featureRow}>
            <View style={[styles.featureIconContainer, { backgroundColor: '#EFF6FF' }]}>
              <Text style={styles.featureEmoji}>👥</Text>
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Find Your Tribe</Text>
              <Text style={styles.featureDescription}>
                Connect with compatible, like-minded travellers heading to your destination.
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={[styles.featureIconContainer, { backgroundColor: '#ECFDF5' }]}>
              <Text style={styles.featureEmoji}>🛡️</Text>
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Verified Trust Scores</Text>
              <Text style={styles.featureDescription}>
                Travel with confidence. View community trust scores and verified reviews.
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={[styles.featureIconContainer, { backgroundColor: '#FDF2F8' }]}>
              <Text style={styles.featureEmoji}>💬</Text>
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Instant Group Chat</Text>
              <Text style={styles.featureDescription}>
                Discuss itineraries, share bookings, and coordinate routes seamlessly.
              </Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroBackground: {
    backgroundColor: '#2563EB',
    height: '32%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 20,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoIcon: {
    fontSize: 36,
    marginRight: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  heroTagline: {
    fontSize: 16,
    color: '#BFDBFE',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 30,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  features: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    marginVertical: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureEmoji: {
    fontSize: 22,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    width: '100%',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#6B7280',
    fontSize: 14,
  },
  loginLink: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
});