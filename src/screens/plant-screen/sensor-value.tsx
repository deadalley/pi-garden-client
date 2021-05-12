import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_STYLES, PADDING, WeatherIcon } from '../../styles';
import { Sensor, SensorName, SensorTypeIcon } from '../../types';

export interface SensorValueProps {
  sensor: Sensor;
  value: number | '--';
}

export const SensorValue: React.FC<SensorValueProps> = ({ sensor, value }) => {
  return (
    <View style={{ ...styles.wrapper }}>
      <View style={{ ...styles.divider }} />
      <WeatherIcon name={SensorTypeIcon[sensor.type]} color={COLORS.LIGHT} size={42} />
      <View style={{ ...styles.info } as any}>
        <Text style={styles.value}>
          {value} {sensor.unit}
        </Text>
        <Text style={styles.label}>{SensorName[sensor.type]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: 160,
    marginBottom: PADDING.SMALL,
    alignItems: 'center',
  },
  divider: {
    width: 3,
    backgroundColor: COLORS.LIGHT,
    borderRadius: 30,
    height: '80%',
    marginRight: PADDING.SMALLER / 2,
  },
  info: {
    marginLeft: PADDING.SMALLER,
    color: COLORS.MAIN_LIGHTER,
  },
  label: {
    ...FONT_STYLES.text,
    color: COLORS.LIGHT,
  },
  value: {
    ...FONT_STYLES.h3,
    color: COLORS.LIGHT,
  },
});
