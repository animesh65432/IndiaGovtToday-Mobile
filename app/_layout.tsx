import { AnnouncementProvider } from "@/context/Annoucment";
import LocationProvider from "@/context/Location";
import { OnboardingProvider } from "@/context/OnBoardingProvider";
import LanguageProvider from "@/context/Provider";
import { UserProvider } from "@/context/user";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import ToastManager from 'toastify-react-native';


// Import Poppins
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';


export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);


  if (!loaded && !error) {
    return null;
  }

  return (
    <OnboardingProvider>
      <AnnouncementProvider>
        <UserProvider>
          <LanguageProvider>
            <LocationProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              </Stack>
              <ToastManager />
              <StatusBar style="auto" />
            </LocationProvider>
          </LanguageProvider>
        </UserProvider>
      </AnnouncementProvider>
    </OnboardingProvider>
  );
}