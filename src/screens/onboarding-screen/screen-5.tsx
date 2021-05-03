import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/button';
import { TextInput } from '../../components/text-input';

import { COLORS, FONT_STYLES } from '../../styles';

export interface Screen5Props {
  currentIndex: number;
  setIndex: (index: number) => void;
}

export const Screen5: React.FC<Screen5Props> = ({ currentIndex, setIndex }) => (
  <>
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        Now let's add a plant to your new room.
        {'\n\n'}
        What type of plant are you adding?
        {'\n\n'}
      </Text>
      <TextInput name="plant.name" autoCorrect />
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
