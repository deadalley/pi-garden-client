import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import './src/utils/yup';
import { StatusBarProvider } from './src/components/status-bar';
import AppRouting from './src/routes';

export default function App() {
  const [assetsLoaded] = useAssets([require('./assets/images/plants/plant01.png')]);

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    FurnitureIcons: require('./assets/fonts/furniture-icons.ttf'),
    PlantIcons: require('./assets/fonts/plant-icons.ttf'),
    Uicons: require('./assets/fonts/uicons.ttf'),
    WeatherIcons: require('./assets/fonts/weather-icons.ttf'),
    Emoji: require('./assets/fonts/emoji.ttf'),
    NatureIcons: require('./assets/fonts/nature-icons.ttf'),
  });

  if (!fontsLoaded || !assetsLoaded) return <AppLoading />;

  return (
    <StatusBarProvider>
      <AppRouting />
    </StatusBarProvider>
  );
}
