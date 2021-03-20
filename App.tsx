import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { COLORS, UiIcon } from './styles';

export default function App() {
  let [fontsLoaded] = useFonts({
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 36, color: COLORS.MAIN_DARK }}>My Garden</Text>
        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: COLORS.MAIN_DARK }}>Strawberry</Text>
        <UiIcon name='fi-rr-angle-small-left' size={30} color={COLORS.MAIN_DARK} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
