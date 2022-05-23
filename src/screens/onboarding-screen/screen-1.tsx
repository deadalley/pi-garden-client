import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button } from '../../components/button';

import { COLORS, FONT_STYLES } from '../../styles';
import { OnboardingContext } from './context';

export interface Screen1Props {}

export const Screen1: React.FC<Screen1Props> = () => (
  <OnboardingContext.Consumer>
    {({ currentIndex, setCurrentIndex }) => (
      <>
        <Text style={styles.text}>Welcome to PiGarden!</Text>
        <Button dark small onPress={() => setCurrentIndex(currentIndex + 1)}>
          Get Started
        </Button>
      </>
    )}
  </OnboardingContext.Consumer>
);

const styles = StyleSheet.create({
  text: {
    ...FONT_STYLES.h1,
    flex: 1,
    color: COLORS.MAIN_DARK,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
