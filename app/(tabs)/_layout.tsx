import { OfflineNotice } from "@/components/OfflineNotice";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { Tabs } from 'expo-router';
import { Home } from 'lucide-react-native';
import React from 'react';

export default function TabLayout() {
  const { isOnline } = useNetworkStatus();

  if (!isOnline) {
    return <OfflineNotice />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon({ color, size }) {
            return <Home color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="announcement/[id]/index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
