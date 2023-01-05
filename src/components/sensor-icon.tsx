import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_STYLES, PADDING, WeatherIcon } from '../styles';

export interface SensorIconProps {
  value: string;
  iconName: string;
  style?: object;
}

export const SensorIcon: React.FC<SensorIconProps> = ({ value, iconName, style = {} }) => {
  return (
    <View style={styles.wrapper}>
      <WeatherIcon name={iconName} color={COLORS.MAIN_LIGHT} size={26} />
      <Text style={[FONT_STYLES.text, styles.value]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: PADDING.SMALL,
  },
  value: {
    color: COLORS.MAIN_LIGHT,
  },
});
