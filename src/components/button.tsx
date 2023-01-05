import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BORDER_RADIUS, COLORS, FONT_STYLES } from '../styles';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  onPress: () => void;

  inline?: boolean /** @deprecated */;
  dark?: boolean /** @deprecated */;
  inverted?: boolean /** @deprecated */;
  small?: boolean /** @deprecated */;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[
        styles.button,
        variant === 'secondary' && styles.secondary,
        variant === 'tertiary' && styles.tertiary,
      ]}
    >
      <Text
        style={[
          FONT_STYLES.h4,
          styles.text,
          variant === 'secondary' && styles.textSecondary,
          variant === 'tertiary' && styles.textTertiary,
        ]}
      >
        {children}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    height: 65,
    backgroundColor: COLORS.MAIN_DARK,
  },
  secondary: { backgroundColor: COLORS.MAIN_LIGHT },
  tertiary: { backgroundColor: 'none' },
  text: { color: COLORS.LIGHT },
  textSecondary: { color: COLORS.MAIN_DARK },
  textTertiary: { color: COLORS.MAIN_DARK },
});
