import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button } from '../../components/button';

import { COLORS, FONT_STYLES } from '../../styles';

export interface Screen4Props {
  currentIndex: number;
  setIndex: (index: number) => void;
}

export const Screen4: React.FC<Screen4Props> = ({ currentIndex, setIndex }) => (
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
    <Button small onPress={() => setIndex(currentIndex + 1)}>
      Yes
    </Button>
    <Button small inverted onPress={() => setIndex(currentIndex + 1)}>
      No, I'll do that later
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
