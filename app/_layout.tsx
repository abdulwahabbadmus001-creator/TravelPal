import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#08182D" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="group/[id]" />
        <Stack.Screen name="chat/[id]" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="pending/[id]" />
        <Stack.Screen name="report/[id]" />
        <Stack.Screen name="verify" />
        <Stack.Screen name="members/[id]" />
        <Stack.Screen name="group/create" />
      </Stack>
    </>
  );
}