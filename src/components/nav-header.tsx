import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS, FONT_STYLES, UiIcon } from '../styles';

export interface NavHeaderProps {
  position?: 'left' | 'right';
  color?: string;
}

export const NavHeader: React.FC<NavHeaderProps> = ({
  children,
  position = 'left',
  color = COLORS.MAIN_DARK,
}) => (
  <TouchableOpacity
    style={{
      ...styles.wrapper,
      ...(position === 'left' ? styles.left : styles.right),
    }}
  >
    <UiIcon name={`fi-rr-angle-small-${position}`} size={38} color={color} />
    <Text style={{ ...styles.text, ...{ color } }}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    ...FONT_STYLES.h2,
    color: COLORS.MAIN_DARK,
    lineHeight: 48,
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
});
