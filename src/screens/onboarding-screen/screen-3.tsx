import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AvatarChooser } from '../../components/avatar-chooser';
import { Button } from '../../components/button';
import { TextInput } from '../../components/text-input';

import { COLORS, FONT_STYLES } from '../../styles';
import { Avatar } from '../../types';

export interface Screen3Props {
  avatar: Avatar;
  currentIndex: number;
  setIndex: (index: number) => void;
  setFieldValue: (name: string, value: Avatar) => void;
}

export const Screen3: React.FC<Screen3Props> = ({
  avatar,
  currentIndex,
  setIndex,
  setFieldValue,
}) => (
  <>
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        We're online!
        {'\n\n'}
        Let's start by adding a room to your garden...
        {'\n\n'}
      </Text>
      <AvatarChooser
        icon={avatar}
        setIcon={(value) => setFieldValue('room.avatar', value)}
        iconType={'furniture'}
      />
      <TextInput label={'Name'} name="room.name" autoCorrect />
    </View>
    <Button small onPress={() => setIndex(currentIndex + 1)}>
      Add Room
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
