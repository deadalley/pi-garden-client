import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/button';
import { ThresholdInput } from '../../components/threshold-input';

import { COLORS, FONT_STYLES } from '../../styles';
import { Room, SensorName, SensorType } from '../../types';
import { OnboardingContext } from './context';

export interface Screen6Props {}

export const Screen6: React.FC<Screen6Props> = () => {
  const { values } = useFormikContext<{ room: Room }>();

  return (
    <OnboardingContext.Consumer>
      {({ currentIndex, setCurrentIndex }) => (
        <>
          <View style={styles.wrapper}>
            <Text style={styles.text}>
              Let’s now configure some values for your new plant.
              {'\n\n'}
              These values represent the thresholds for your plant. If the sensor measurements fall
              within the thresholds, your plant will be happy!
              {'\n\n'}
            </Text>
            {values.room.sensors.map((sensor) => (
              <ThresholdInput
                name={`plant.specification.${sensor.type}`}
                key={sensor.type}
                label={SensorName[sensor.type]}
                unit={sensor.unit}
                {...(sensor.type !== SensorType.temperature ? { min: 0, max: 100 } : {})}
              />
            ))}
          </View>
          <Button small={true} onPress={() => setCurrentIndex(currentIndex + 1)}>
            Continue
          </Button>
        </>
      )}
    </OnboardingContext.Consumer>
  );
};

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
