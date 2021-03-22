import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { COLORS, FONT_STYLES, UiIcon } from '../styles';

export interface NavHeaderProps {
  position?: 'left' | 'right';
  color?: string;
  style?: object;
  onPress?: (event: GestureResponderEvent) => void;
}

export const NavHeader: React.FC<NavHeaderProps> = ({
  children,
  position = 'left',
  color = COLORS.MAIN_DARK,
  style = {},
  onPress,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        ...styles.wrapper,
        ...(position === 'left' ? styles.left : styles.right),
        ...style,
      }}
      onPress={onPress || (() => navigation.goBack())}
    >
      <UiIcon name={`fi-rr-angle-small-${position}`} size={38} color={color} />
      <Text style={{ ...styles.text, ...{ color } }}>{children}</Text>
    </TouchableOpacity>
  );
};

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
