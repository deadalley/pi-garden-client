import React from 'react';
import { useFetcher, useInvalidator } from 'rest-hooks';
import { Formik } from 'formik';
import { random } from 'lodash';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { TextInput } from '../../components/text-input';
import { AvatarChooser } from '../../components/avatar-chooser';
import { Screen } from '../../components/screen';
import { Avatar } from '../../types';
import { Navigation } from '../../components/navigation';

import { RoomResource } from '../../resources';

export const AddRoomScreen: React.FC = () => {
  const commonRoomTypes = [
    'Bedroom',
    'Kitchen',
    'Living Room',
    'Garden',
    'Balcony',
    'Dining Room',
    'Hallway',
  ];

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    avatar: yup.string().required(),
  });

  const navigation = useNavigation();
  const createRoom = useFetcher(RoomResource.create());
  const invalidateRooms = useInvalidator(RoomResource.list());

  return (
    <Screen title={'New Room'}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: commonRoomTypes[random(0, commonRoomTypes.length - 1)],
          avatar: Avatar.bedroom,
        }}
        onSubmit={(values) => {
          console.log('Submitting...', values);
          createRoom({}, values)
            .then((room) =>
              navigation.navigate('HomeNavigator', { screen: 'RoomScreen', params: { room } })
            )
            .then(() => invalidateRooms({}));
          return;
        }}
      >
        {({ values, submitForm, setFieldValue }) => (
          <>
            <AvatarChooser
              icon={values.avatar}
              setIcon={(value) => setFieldValue('avatar', value)}
              iconType={'furniture'}
            />
            <TextInput label={'Name'} name="name" autoCorrect={true} />
            <Navigation
              isLast={true}
              currentIndex={0}
              setIndex={() => {}}
              onFinish={submitForm}
              finishLabel={'Add room'}
            />
          </>
        )}
      </Formik>
    </Screen>
  );
};
