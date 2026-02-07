import { OfflineNotice } from "@/components/OfflineNotice";
import OnboardingScreen from "@/components/onboarding";
import { OnboardingContext } from "@/context/OnBoardingProvider";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { Tabs } from 'expo-router';
import { BookMarked, Home, User } from 'lucide-react-native';
import React, { useContext } from 'react';

export default function TabLayout() {
  const { isOnline } = useNetworkStatus();
  const { hasOnboarded, setHasOnboarded } = useContext(OnboardingContext);

  if (!isOnline) {
    return <OfflineNotice />;
  }

  if (!hasOnboarded) {
    return <OnboardingScreen setHasOnboarded={setHasOnboarded} />;
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
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="announcement/[id]/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="save/index"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, size }) => <BookMarked color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="user/index"
        options={{
          title: 'User',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}