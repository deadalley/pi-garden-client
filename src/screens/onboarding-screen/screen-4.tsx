import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button } from '../../components/button';

import { COLORS, FONT_STYLES } from '../../styles';
import { OnboardingContext } from './context';

export interface Screen4Props {}

export const Screen4: React.FC<Screen4Props> = () => (
  <OnboardingContext.Consumer>
    {({ currentIndex, setCurrentIndex }) => (
      <>
        <Text style={styles.text}>
          Your PiGarden already comes with three types of sensor:
          {'\n\n'}
          Temperature{'\n'}Brightness{'\n'}Humidity
          {'\n\n'}
          These sensors are already configured and automatically added to your first room.
          {'\n\n'}
          Would you like to configure your first Soil Moisture sensor?
        </Text>
        <Button small={true} onPress={() => setCurrentIndex(currentIndex + 1)}>
          Configure Sensor
        </Button>
        <Button small={true} inverted={true} onPress={() => setCurrentIndex(currentIndex + 1)}>
          Skip
        </Button>
      </>
    )}
  </OnboardingContext.Consumer>
);

const styles = StyleSheet.create({
  text: {
    ...FONT_STYLES.h4,
    flex: 1,
    color: COLORS.MAIN_DARK,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
