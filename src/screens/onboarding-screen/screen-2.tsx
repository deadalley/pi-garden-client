import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button } from '../../components/button';

import { COLORS, FONT_STYLES } from '../../styles';
import { OnboardingContext } from './context';

export interface Screen2Props {}

export const Screen2: React.FC<Screen2Props> = () => (
  <OnboardingContext.Consumer>
    {({ currentIndex, setCurrentIndex }) => (
      <>
        <Text style={styles.text}>
          Let's try to connect to your PiGarden Hub.
          {'\n\n'}
          Make sure it is on and that the Wi-Fi LED is green.
        </Text>
        <Button dark small onPress={() => setCurrentIndex(currentIndex + 1)}>
          Connect
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
