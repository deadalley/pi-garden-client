import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { Screen1 } from './screen-1';
import { Screen2 } from './screen-2';
import { Screen3 } from './screen-3';
import { Screen4 } from './screen-4';
import { Screen5 } from './screen-5';
import { Screen6 } from './screen-6';
import { Screen7 } from './screen-7';
import { Screen8 } from './screen-8';

import { COLORS, PADDING } from '../../styles';
import { Avatar, SensorName, SensorStatus, SensorType } from '../../types';
import { commonPlantTypes } from '../../mocks';
import { random } from '../../utils/number';
import { setOnboardingComplete } from '../../redux/onboarding.slice';
import { OnboardingContext } from './context';

export const OnboardingScreen: React.FC = () => {
  const dispatch = useDispatch();

  const screens = useMemo(
    () => [Screen1, Screen2, Screen3, Screen4, Screen5, Screen6, Screen7, Screen8],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const CurrentScreen = screens[currentIndex];

  if (!CurrentScreen) return null;

  return (
    <Formik
      initialValues={{
        room: {
          name: 'Garden',
          avatar: Avatar.garden,
          sensors: [
            {
              id: '1',
              type: SensorType.temperature,
              name: SensorName[SensorType.temperature],
              status: SensorStatus.online,
              unit: '°C',
            },
            {
              id: '2',
              type: SensorType.brightness,
              name: SensorName[SensorType.brightness],
              status: SensorStatus.warnings,
              unit: '%',
            },
            {
              id: '3',
              type: SensorType.humidity,
              name: SensorName[SensorType.humidity],
              status: SensorStatus.online,
              unit: '%',
            },
          ],
        },
        plant: {
          plantedDate: new Date(),
          name: commonPlantTypes[random(0, commonPlantTypes.length - 1)],
          specification: {
            temperature: {
              start: 12,
              end: 35,
            },
            humidity: {
              start: 0,
              end: 100,
            },
            soil: {
              start: 0,
              end: 100,
            },
            brightness: {
              start: 0,
              end: 100,
            },
          },
        },
      }}
      onSubmit={(values) => {
        console.log('Submitting...', values);
        dispatch(setOnboardingComplete(true));
        return;
      }}
    >
      {() => (
        <OnboardingContext.Provider value={{ currentIndex, setCurrentIndex }}>
          <View style={{ ...styles.wrapper }}>
            <CurrentScreen />
          </View>
        </OnboardingContext.Provider>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: PADDING.BIG,
  },
  dots: {
    marginBottom: 3 * PADDING.BIG,
  },
});
