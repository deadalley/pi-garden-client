import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/button';
import { TextInput } from '../../components/text-input';

import { COLORS, FONT_STYLES } from '../../styles';
import { OnboardingContext } from './context';

export interface Screen5Props {}

export const Screen5: React.FC<Screen5Props> = () => (
  <OnboardingContext.Consumer>
    {({ currentIndex, setCurrentIndex }) => (
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
        <Button small onPress={() => setCurrentIndex(currentIndex + 1)}>
          Continue
        </Button>
      </>
    )}
  </OnboardingContext.Consumer>
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
