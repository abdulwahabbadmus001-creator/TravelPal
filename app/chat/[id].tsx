import {
  View, Text, StyleSheet, FlatList, TextInput,
  TouchableOpacity, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform
} from 'react-native';
import { useState } from 'react';
// @ts-ignore: expo-router does not provide type declarations in this project
import { useLocalSearchParams, router } from 'expo-router';
import { mockMessages, mockGroups } from '../../constants/mockData';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const group = mockGroups.find(g => g.id === id);
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: String(prev.length + 1),
      text: input.trim(),
      sender: 'Wahab Badmus',
      senderId: 'currentUser',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInput('');
  };

const renderMessage = ({ item }: { item: typeof mockMessages[0] }) => {
  const isMe = item.senderId === 'currentUser';
  return (
    <TouchableOpacity
      style={[styles.messageContainer, isMe ? styles.myContainer : styles.theirContainer]}
      onLongPress={() => router.push(`/report/${item.id}`)}
      activeOpacity={1}
      delayLongPress={500}
    >
      {!isMe && <Text style={styles.senderName}>{item.sender}</Text>}
      <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
        <Text style={[styles.messageText, isMe ? styles.myText : styles.theirText]}>
          {item.text}
        </Text>
      </View>
      <Text style={[styles.timestamp, isMe ? styles.myTimestamp : styles.theirTimestamp]}>
        {item.timestamp}
      </Text>
    </TouchableOpacity>
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00AEEF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.groupName}>{group?.name || 'Group Chat'}</Text>
          <Text style={styles.membersCount}>{group?.members} members</Text>
        </View>
        <Text style={styles.infoIcon}>ℹ️</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!input.trim()}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#00AEEF',
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 12,
    paddingBottom: 16, gap: 12
  },
  backText: { color: '#FFFFFF', fontSize: 22 },
  headerInfo: { flex: 1 },
  groupName: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  membersCount: { color: '#CCF1FF', fontSize: 12 },
  infoIcon: { fontSize: 20 },
  chatContainer: { flex: 1 },
  messagesList: { padding: 16, paddingBottom: 20 },
  messageContainer: { marginBottom: 12, maxWidth: '80%' },
  myContainer: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  theirContainer: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  senderName: { fontSize: 11, color: '#6B7280', marginBottom: 4, fontWeight: '600' },
  bubble: { padding: 12, borderRadius: 16 },
  myBubble: { backgroundColor: '#00AEEF', borderBottomRightRadius: 4 },
  theirBubble: {
    backgroundColor: '#FFFFFF', borderBottomLeftRadius: 4,
    borderWidth: 1, borderColor: '#E5E7EB'
  },
  messageText: { fontSize: 14, lineHeight: 20 },
  myText: { color: '#FFFFFF' },
  theirText: { color: '#08182D' },
  timestamp: { fontSize: 10, marginTop: 4, color: '#9CA3AF' },
  myTimestamp: { textAlign: 'right' },
  theirTimestamp: { textAlign: 'left' },
  inputContainer: {
    flexDirection: 'row', alignItems: 'flex-end',
    padding: 12, backgroundColor: '#FFFFFF',
    borderTopWidth: 1, borderTopColor: '#E5E7EB', gap: 10
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10,
    fontSize: 14, color: '#08182D', maxHeight: 100, backgroundColor: '#F9FAFB'
  },
  sendButton: {
    backgroundColor: '#00AEEF', width: 44, height: 44,
    borderRadius: 22, justifyContent: 'center', alignItems: 'center'
  },
  sendButtonDisabled: { backgroundColor: '#93C5FD' },
  sendIcon: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});