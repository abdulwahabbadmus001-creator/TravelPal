import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import EmergencyButton from '../../components/EmergencyButton';

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E5E7EB',
            paddingBottom: 8,
            paddingTop: 8,
            height: 65,
          },
          tabBarActiveTintColor: '#00AEEF',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Discover',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 22, color }}>🌍</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="groups"
          options={{
            title: 'My Groups',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 22, color }}>👥</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 22, color }}>👤</Text>
            ),
          }}
        />
      </Tabs>
      <EmergencyButton />
    </>
  );
}