import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS, FONT_STYLES, UiIcon } from '../styles';

export interface NavigationButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  position?: 'left' | 'right';
  style?: object;
  disabled?: boolean;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  position = 'left',
  style = {},
  children,
  disabled = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.navigationButton,
        ...(position === 'left' ? styles.left : styles.right),
        ...style,
      }}
      onPress={onPress}
    >
      <UiIcon
        name={`fi-rr-angle-small-${position}`}
        color={COLORS.MAIN_DARK}
        style={{
          ...(position === 'left' ? { marginLeft: -6 } : { marginRight: -6 }),
          ...(disabled ? styles.disabled : {}),
        }}
        size={24}
      />
      <Text style={{ ...styles.navigationText, ...(disabled ? styles.disabled : {}) }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navigationText: {
    ...FONT_STYLES.h4,
    color: COLORS.MAIN_DARK,
    lineHeight: 24,
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  disabled: {
    opacity: 0.5,
  },
});
