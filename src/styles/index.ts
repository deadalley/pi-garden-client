import { StyleSheet } from 'react-native';

export * from './icons';

export const BORDER_RADIUS = 18;

export const HEADER_HEIGHT = 140;

export const PADDING = {
  SMALLER: 16,
  SMALL: 20,
  MEDIUM: 24,
  BIG: 36,
  BIGGER: 40,
};

export const COLORS = {
  MAIN_DARKER: '#1e4951',
  MAIN_DARK: '#2c6975',
  MAIN_MEDIUM: '#68b2a0',
  MAIN_LIGHT: '#cde0c9',
  MAIN_LIGHTER: '#e0ecde',

  DARK: '#000000',
  HALF_DARK: '#444444',
  LIGHT: '#ffffff',
  HALF_LIGHT: '#f1f1f1',

  GREEN: '#2AD227',
  ORANGE: '#FF7905',
  RED: '#C90100',
};

export const BOX_SHADOW = {
  shadowColor: COLORS.HALF_DARK,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.01,
  shadowRadius: 2,
  elevation: 4,
};

export const FONT_STYLES = StyleSheet.create({
  h1: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 36,
  },
  h2: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 32,
  },
  h3: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    fontWeight: '600',
  },
  h4: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    fontWeight: '400',
  },
});
