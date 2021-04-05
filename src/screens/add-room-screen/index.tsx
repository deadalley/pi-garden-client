import React, { useState } from 'react';
import { Formik } from 'formik';
import { random } from 'lodash';
import * as yup from 'yup';

import { TextInput } from '../../components/text-input';
import { AvatarChooser } from '../../components/avatar-chooser';
import { Screen } from '../../components/screen';
import { Avatar } from '../../types';
import { Navigation } from '../../components/navigation';

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
            <TextInput label={'Name'} name="name" autoCorrect />
            <Navigation
              isLast
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
