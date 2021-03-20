import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import STYLES, { COLORS, UiIcon } from '../styles';

export interface NavHeaderProps {
  position?: 'left' | 'right';
  white?: boolean;
}

export const NavHeader: React.FC<NavHeaderProps> = ({
  children,
  position = 'left',
  white,
}) => (
  <TouchableOpacity
    style={{
      ...styles.wrapper,
      ...(position === 'left' ? styles.left : styles.right),
    }}
  >
    <UiIcon name={`fi-rr-angle-small-${position}`} size={30} color={white ? COLORS.LIGHT: COLORS.MAIN_DARK} />
    <Text style={{ ...styles.text, ...(white ? styles.white : {}) }}>
      {children}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    ...STYLES.h1,
    color: COLORS.MAIN_DARK,
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  white: {
    color: COLORS.LIGHT,
  },
});
