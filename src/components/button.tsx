import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { BORDER_RADIUS, COLORS, FONT_STYLES } from '../styles';

export interface ButtonProps {
  inline?: boolean;
  dark?: boolean;
  inverted?: boolean;
  small?: boolean;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  inline = false,
  children,
  onPress,
  dark,
  inverted,
  small,
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      ...styles.button,
      ...(inline ? {} : styles.fullWidth),
      ...(inverted ? {} : styles.background),
      ...(dark ? styles.dark : {}),
      ...(small ? styles.small : {}),
    }}
    {...props}
  >
    <Text
      style={{
        ...styles.text,
        ...(inverted ? styles.textInverted : {}),
        ...(small ? styles.textSmall : {}),
        ...(dark ? styles.textDark : {}),
      }}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    height: 66,
    marginBottom: 6,
  },
  background: {
    backgroundColor: COLORS.MAIN_LIGHT,
  },
  textSmall: {
    ...FONT_STYLES.h4,
  },
  textInverted: {
    color: COLORS.MAIN_DARK,
  },
  text: {
    ...FONT_STYLES.h3,
    color: COLORS.MAIN_DARK,
    fontSize: 24,
  },
  textDark: {
    color: COLORS.LIGHT,
  },
  fullWidth: {
    width: '100%',
  },
  dark: {
    backgroundColor: COLORS.MAIN_DARK,
  },
  small: {
    height: 60,
  },
});
