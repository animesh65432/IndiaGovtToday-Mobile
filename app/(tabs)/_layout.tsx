import { OfflineNotice } from "@/components/OfflineNotice";
import OnboardingScreen from "@/components/onboarding";
import { lanContext } from "@/context/lan";
import { OnboardingContext } from "@/context/OnBoardingProvider";
import { User as UserContext } from "@/context/user";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { TranslateText } from "@/lib/translatetext";
import { Tabs } from 'expo-router';
import { BookMarked, Home, User } from 'lucide-react-native';
import React, { useContext } from 'react';

export default function TabLayout() {
  const { isOnline } = useNetworkStatus();
  const { hasOnboarded, setHasOnboarded } = useContext(OnboardingContext);
  const { lan } = useContext(lanContext);
  const { isLoggedIn } = useContext(UserContext)

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
          title: `${TranslateText[lan].HOME}`,
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="announcement/[id]/index"
        options={{
          href: null,
        }}
      />
      {isLoggedIn &&
        <Tabs.Screen
          name="save/index"
          options={{
            title: `${TranslateText[lan].SAVED}`,
            tabBarIcon: ({ color, size }) => <BookMarked color={color} size={size} />,
          }}
        />
      }
      {!isLoggedIn &&
        <Tabs.Screen
          name="save/index"
          options={{
            href: null,
          }}
        />
      }
      <Tabs.Screen
        name="user/index"
        options={{
          title: `${TranslateText[lan].USER}`,
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}