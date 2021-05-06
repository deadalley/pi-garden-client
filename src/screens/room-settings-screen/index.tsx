import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Formik } from 'formik';

import { Screen } from '../../components/screen';
import { TextInput } from '../../components/text-input';
import { Button } from '../../components/button';

import { Room } from '../../types';
import { COLORS, FONT_STYLES, PADDING } from '../../styles';
import { AvatarChooser } from '../../components/avatar-chooser';

export const RoomSettingsScreen: React.FC = () => {
  const route = useRoute();

  const { room } = route.params as { room: Room };

  return (
    <Formik
      initialValues={{ ...room }}
      onSubmit={(values) => {
        console.log('Submitting...', values);
        return;
      }}
    >
      {({ values, setFieldValue, submitForm }) => (
        <Screen withBottomPadFix={false} title={room.name} contentContainerStyle={{ flex: 1 }}>
          <View style={{ flexGrow: 1 }}>
            <AvatarChooser
              icon={values.avatar}
              setIcon={(value) => setFieldValue('avatar', value)}
              iconType={'furniture'}
            />
            <TextInput name="name" label="Name" autoCorrect />
            <TouchableOpacity
              onPress={() => {
                console.log('Room deleted');
                return;
              }}
            >
              <Text
                style={{
                  ...FONT_STYLES.h4,
                  color: COLORS.RED,
                  marginBottom: PADDING.SMALL,
                  marginLeft: PADDING.SMALL,
                }}
              >
                Delete room
              </Text>
            </TouchableOpacity>
          </View>

          <Button small onPress={() => submitForm()}>
            Save
          </Button>
        </Screen>
      )}
    </Formik>
  );
};
