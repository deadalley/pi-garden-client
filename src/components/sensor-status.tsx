import React from 'react';
import { StyleSheet, View } from 'react-native';

import { COLORS, WeatherIcon } from '../styles';
import { Sensor, SensorTypeIcon, StatusColorMap } from '../types';

export interface StatusProps {
  status: keyof typeof StatusColorMap;
}

export interface SensorStatusProps {
  sensor: Sensor;
}

export const SensorStatus: React.FC<SensorStatusProps> = ({ sensor }) => (
  <View>
    <View
      style={[
        styles.status,
        { backgroundColor: COLORS[StatusColorMap[sensor.status] as keyof typeof COLORS] },
      ]}
    />
    <WeatherIcon name={SensorTypeIcon[sensor.type]} color={COLORS.MAIN_DARKER} size={18} />
  </View>
);

const styles = StyleSheet.create({
  status: {
    borderRadius: 360,
    position: 'absolute',
    top: 0,
    right: -8,
    height: 6,
    width: 6,
  },
});
