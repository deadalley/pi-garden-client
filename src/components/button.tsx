import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { BORDER_RADIUS, BOX_SHADOW, COLORS, FONT_STYLES } from '../styles';

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
  },
  background: {
    backgroundColor: COLORS.MAIN_MEDIUM,
    ...BOX_SHADOW,
  },
  textSmall: {
    ...FONT_STYLES.h4,
  },
  textInverted: {
    color: COLORS.MAIN_MEDIUM,
  },
  text: {
    ...FONT_STYLES.h3,
    color: COLORS.LIGHT,
    fontSize: 24,
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
