import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AvatarChooser } from '../../components/avatar-chooser';
import { Button } from '../../components/button';
import { TextInput } from '../../components/text-input';

import { COLORS, FONT_STYLES } from '../../styles';
import { Room } from '../../types';
import { OnboardingContext } from './context';

export interface Screen3Props {}

export const Screen3: React.FC<Screen3Props> = ({}) => {
  const { values, setFieldValue } = useFormikContext<{ room: Room }>();

  return (
    <OnboardingContext.Consumer>
      {({ currentIndex, setCurrentIndex }) => (
        <>
          <View style={styles.wrapper}>
            <Text style={styles.text}>
              We're online!
              {'\n\n'}
              Let's start by adding a room to your garden
              {'\n\n'}
            </Text>
            <AvatarChooser
              icon={values.room.avatar}
              setIcon={(value) => setFieldValue('room.avatar', value)}
              iconType={'furniture'}
            />
            <TextInput label={'Name'} name="room.name" autoCorrect />
          </View>
          <Button dark small onPress={() => setCurrentIndex(currentIndex + 1)}>
            Add Room
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
