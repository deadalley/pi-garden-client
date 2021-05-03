import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/button';
import { DateInput } from '../../components/date-input';

import { COLORS, FONT_STYLES } from '../../styles';

export interface Screen7Props {
  plantName: string;
  currentIndex: number;
  setIndex: (index: number) => void;
}

export const Screen7: React.FC<Screen7Props> = ({ plantName, currentIndex, setIndex }) => (
  <>
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        Lastly, PiGarden wants to know how old your plant is!
        {'\n\n'}
        {plantName} was planted on
      </Text>
      <DateInput name="plant.plantedDate" max={new Date()} />
    </View>
    <Button small onPress={() => setIndex(currentIndex + 1)}>Add Plant</Button>
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
