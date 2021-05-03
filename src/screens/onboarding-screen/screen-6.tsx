import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/button';
import { ThresholdInput } from '../../components/threshold-input';

import { COLORS, FONT_STYLES } from '../../styles';
import { Sensor, SensorName, SensorType } from '../../types';

export interface Screen6Props {
  sensors: Sensor[];
  currentIndex: number;
  setIndex: (index: number) => void;
}

export const Screen6: React.FC<Screen6Props> = ({ sensors, currentIndex, setIndex }) => (
  <>
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        Let’s now configure some values for your new plant.
        {'\n\n'}
        These values represent the thresholds for your plant. If the sensor measurements fall within
        the thresholds, your plant will be happy!
        {'\n\n'}
      </Text>
      {sensors.map((sensor) => (
        <ThresholdInput
          name={`plant.specification.${sensor.type}`}
          key={sensor.type}
          label={SensorName[sensor.type]}
          unit={sensor.unit}
          {...(sensor.type !== SensorType.temperature ? { min: 0, max: 100 } : {})}
        />
      ))}
    </View>
    <Button small onPress={() => setIndex(currentIndex + 1)}>
      Continue
    </Button>
  </>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    ...FONT_STYLES.h4,
    color: COLORS.MAIN_DARK,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
