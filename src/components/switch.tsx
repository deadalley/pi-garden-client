import React from 'react';
import { StyleSheet, Switch as NativeSwitch, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../styles';

export interface SwitchProps {
  value?: boolean;
  enabled?: boolean;
  onChange?: () => void;
}

export const Switch: React.FC<SwitchProps> = ({ onChange, value, enabled }) => {
  return (
    <NativeSwitch
      trackColor={{ false: COLORS.GRAY, true: COLORS.MAIN_LIGHT }}
      thumbColor={value ? COLORS.MAIN_MEDIUM : COLORS.HALF_LIGHT}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onChange}
      value={value}
    />
  );
};
