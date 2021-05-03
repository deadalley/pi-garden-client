import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button } from '../../components/button';

import { COLORS, FONT_STYLES } from '../../styles';

export interface Screen1Props {
  currentIndex: number;
  setIndex: (index: number) => void;
}

export const Screen1: React.FC<Screen1Props> = ({ currentIndex, setIndex }) => (
  <>
    <Text style={styles.text}>Welcome to PiGarden!</Text>
    <Button dark onPress={() => setIndex(currentIndex + 1)}>
      Get Started
    </Button>
  </>
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
