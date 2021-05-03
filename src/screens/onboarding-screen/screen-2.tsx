import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button } from '../../components/button';

import { COLORS, FONT_STYLES } from '../../styles';

export interface Screen2Props {
  currentIndex: number;
  setIndex: (index: number) => void;
}

export const Screen2: React.FC<Screen2Props> = ({ currentIndex, setIndex }) => (
  <>
    <Text style={styles.text}>
      Let's try to connect to your PiGarden Hub.
      {'\n\n'}
      Make sure it is on and that the Wi-Fi LED is green.
    </Text>
    <Button small onPress={() => setIndex(currentIndex + 1)}>
      Connect
    </Button>
  </>
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
