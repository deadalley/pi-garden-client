import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { COLORS, FONT_STYLES } from '../styles';

export interface ButtonProps {
  inline?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  inline = false,
  children,
  ...props
}) => (
  <TouchableOpacity
    style={{ ...styles.button, ...(inline ? {} : styles.fullWidth) }}
    {...props}
  >
    <Text style={{...styles.text}}>
      {children}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.MAIN_MEDIUM,
    borderRadius: 18,
    height: 66,
    shadowOpacity: 25,
    shadowRadius: 14,
    shadowColor: COLORS.DARK,
    shadowOffset: { width: 4, height: 4},
    paddingHorizontal: 64,
  },
  text: {
    ...FONT_STYLES.h2,
    color: COLORS.LIGHT,
    fontSize: 24,
  },
  fullWidth: {
    width: '100%',
  }
});
