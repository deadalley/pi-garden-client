import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { BORDER_RADIUS, COLORS, FONT_STYLES, PADDING } from '../../styles';

export interface ButtonProps {
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onPress }) => (
  <TouchableOpacity style={{ ...styles.button }} onPress={onPress}>
    <Text style={{ ...styles.text }}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flex: 0.47,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: COLORS.MAIN_MEDIUM,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    height: 66,
    shadowOpacity: 25,
    shadowRadius: 14,
    shadowColor: COLORS.DARK,
    shadowOffset: { width: 4, height: 4 },
    paddingVertical: PADDING.BIG,
    paddingHorizontal: PADDING.SMALLER,
  },
  text: {
    ...FONT_STYLES.h4,
    color: COLORS.LIGHT,
  },
});
