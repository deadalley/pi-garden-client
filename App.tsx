import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { HomeScreen } from './screens/home-screen';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
    Uicons: require('./assets/fonts/uicons.ttf'),
  });

  if (!fontsLoaded)
    return <AppLoading />;

  return (
    <HomeScreen />
  );
}
