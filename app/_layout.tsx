import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';

import { OnboardingProvider } from '@/contexts/OnboardingContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <OnboardingProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen 
            name="onboarding/step1" 
            options={{ 
              headerShown: false,
              animation: 'slide_from_right'
            }} 
          />
          <Stack.Screen 
            name="onboarding/step2" 
            options={{ 
              headerShown: false,
              animation: 'slide_from_right'
            }} 
          />
          <Stack.Screen 
            name="onboarding/step3" 
            options={{ 
              headerShown: false,
              animation: 'slide_from_right'
            }} 
          />
          <Stack.Screen 
            name="onboarding/step4" 
            options={{ 
              headerShown: false,
              animation: 'slide_from_right'
            }} 
          />
          <Stack.Screen 
            name="onboarding/step5" 
            options={{ 
              headerShown: false,
              animation: 'slide_from_right'
            }} 
          />
          <Stack.Screen 
            name="onboarding/final" 
            options={{ 
        headerShown: false,
              animation: 'slide_from_right'
      }}
          />
          <Stack.Screen name="+not-found" />
    </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </OnboardingProvider>
  );
}
