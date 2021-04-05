import React from 'react';
import { StyleSheet, View } from 'react-native';

import { COLORS, WeatherIcon } from '../styles';
import { Sensor, SensorTypeIcon, StatusColorMap } from '../types';

export interface StatusProps {
  status: keyof typeof StatusColorMap;
  style?: object;
}

export interface SensorStatusProps {
  sensor: Sensor;
}

export const Status: React.FC<StatusProps> = ({ status, style = {} }) => (
  <View
    style={{
      ...styles.status,
      backgroundColor: COLORS[StatusColorMap[status] as keyof typeof COLORS],
      ...style,
    }}
  />
);

export const SensorStatus: React.FC<SensorStatusProps> = ({ sensor }) => (
  <View>
    <Status status={sensor.status} />
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
