import { StyleSheet } from 'react-native';

export * from './icons';

export const BORDER_RADIUS = 18;
export const BOX_SHADOW = '0px 4px 14px -1px rgba(0, 0, 0, 0.25)';

export const PADDING = {
  SMALL: 20,
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
  LIGHT: '#ffffff',
  HALF_LIGHT: '#f1f1f1',
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
