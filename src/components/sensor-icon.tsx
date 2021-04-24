import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_STYLES, WeatherIcon } from '../styles';

export interface SensorIconProps {
  value: string;
  iconName: string;
  style?: object;
}

export const SensorIcon: React.FC<SensorIconProps> = ({ value, iconName, style = {} }) => {
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <WeatherIcon name={iconName} color={COLORS.MAIN_LIGHT} size={26} />
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_LIGHT,
  },
});
