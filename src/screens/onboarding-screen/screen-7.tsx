import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/button';
import { DateInput } from '../../components/date-input';

import { COLORS, FONT_STYLES } from '../../styles';
import { OnboardingContext } from './context';

export interface Screen7Props {}

export const Screen7: React.FC<Screen7Props> = () => {
  const { values } = useFormikContext<{ plant: { name: string } }>();
  return (
    <OnboardingContext.Consumer>
      {({ currentIndex, setCurrentIndex }) => (
        <>
          <View style={styles.wrapper}>
            <Text style={styles.text}>
              Lastly, PiGarden wants to know how old your plant is!
              {'\n\n'}
              {values.plant.name} was planted on
            </Text>
            <DateInput name="plant.plantedDate" max={new Date()} />
          </View>
          <Button small onPress={() => setCurrentIndex(currentIndex + 1)}>
            Add Plant
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
