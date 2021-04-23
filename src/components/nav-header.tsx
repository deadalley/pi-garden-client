import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { COLORS, FONT_STYLES, UiIcon } from '../styles';

export interface NavHeaderProps {
  position?: 'left' | 'right';
  color?: string;
  small?: boolean;
  subLabel?: string;
  style?: object;
  onPress?: (event: GestureResponderEvent) => void;
}

export const NavHeader: React.FC<NavHeaderProps> = ({
  children,
  position = 'left',
  small = false,
  subLabel,
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
      <UiIcon name={`fi-rr-angle-small-${position}`} size={small ? 30 : 38} color={color} />
      <View>
        <Text style={{ ...styles.text, ...{ color }, ...(small ? FONT_STYLES.h3 : {}) }}>
          {children}
        </Text>
        {subLabel && <Text style={{ ...styles.subLabel, ...{ color } }}>{subLabel}</Text>}
      </View>
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
  subLabel: {
    ...FONT_STYLES.text,
    position: 'absolute',
    bottom: -16,
  },
});
