import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';

export default function EmergencyButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const confirmAlert = () => {
    setAlertSent(true);
    setTimeout(() => {
      setModalVisible(false);
      setAlertSent(false);
    }, 3000);
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.icon}>🆘</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {!alertSent ? (
              <>
                <Text style={styles.modalIcon}>🆘</Text>
                <Text style={styles.modalTitle}>Emergency Alert</Text>
                <Text style={styles.modalMessage}>
                  This will notify the platform admin and your group members immediately.
                  Use only in genuine emergencies.
                </Text>
                <TouchableOpacity style={styles.confirmButton} onPress={confirmAlert}>
                  <Text style={styles.confirmButtonText}>Send Emergency Alert</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalIcon}>✅</Text>
                <Text style={styles.modalTitle}>Alert Sent</Text>
                <Text style={styles.modalMessage}>
                  Emergency services have been notified. Help is on the way. Stay safe.
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 90, right: 20,
    backgroundColor: '#EF4444',
    width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 8,
    elevation: 8, zIndex: 999
  },
  icon: { fontSize: 24 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center', padding: 20
  },
  modalCard: {
    backgroundColor: '#FFFFFF', borderRadius: 20,
    padding: 24, alignItems: 'center', width: '100%'
  },
  modalIcon: { fontSize: 50, marginBottom: 16 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#08182D', marginBottom: 12 },
  modalMessage: {
    fontSize: 14, color: '#6B7280',
    textAlign: 'center', lineHeight: 20, marginBottom: 24
  },
  confirmButton: {
    backgroundColor: '#EF4444', borderRadius: 12,
    padding: 16, alignItems: 'center', width: '100%', marginBottom: 12
  },
  confirmButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  cancelButton: {
    backgroundColor: '#F3F4F6', borderRadius: 12,
    padding: 16, alignItems: 'center', width: '100%'
  },
  cancelButtonText: { color: '#6B7280', fontSize: 15, fontWeight: '600' },
});