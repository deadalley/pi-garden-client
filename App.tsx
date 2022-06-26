import React from 'react';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import { CacheProvider } from 'rest-hooks';
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
import { store } from './src/store';

import AppEntrypoint from './src/';
import { StatusBarProvider } from './src/components/status-bar';

LogBox.ignoreLogs([
  'Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.\n(Saw setTimeout with duration 85000ms)',
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

export default function App() {
  const [assetsLoaded] = useAssets([
    require('./assets/images/plants/plant01.png'),
    require('./assets/images/rooms/balcony.jpg'),
    require('./assets/images/rooms/bedroom-1.jpg'),
    require('./assets/images/rooms/bedroom-2.jpg'),
    require('./assets/images/rooms/bedroom-3.jpg'),
    require('./assets/images/rooms/dining-room.jpg'),
    require('./assets/images/rooms/foyer.jpg'),
    require('./assets/images/rooms/garage.jpg'),
    require('./assets/images/rooms/hallway.jpg'),
    require('./assets/images/rooms/kitchen.jpg'),
    require('./assets/images/rooms/living-room.jpg'),
    require('./assets/images/rooms/office.jpg'),
    require('./assets/images/rooms/patio.jpg'),
    require('./assets/images/rooms/terrace.jpg'),
  ]);

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
    <CacheProvider>
      <Provider store={store}>
        <StatusBarProvider>
          <AppEntrypoint />
        </StatusBarProvider>
      </Provider>
    </CacheProvider>
  );
}
