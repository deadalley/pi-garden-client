import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Bold } from '../../components/typography';
import { DateInput } from '../../components/date-input';
import { PickerInput } from '../../components/picker-input';
import { Screen } from '../../components/screen';
import { TextInput } from '../../components/text-input';
import { ThresholdInput } from '../../components/threshold-input';
import { Navigation } from '../../components/navigation';
import { ImageChooser } from '../../components/image-chooser';

import { commonPlantTypes } from '../../mocks';
import { COLORS, FONT_STYLES, PADDING } from '../../styles';
import { Plant, PlantSpecification, Room, SensorName, SensorType } from '../../types';
import { random } from '../../utils/number';
import { renderSensors } from './utils';
import { connectApi } from '../../utils/connect-api';
import { createPlant, getRooms } from '../../api';

export interface AddPlantScreenProps {
  rooms: Room[];
}

interface StateProps {
  plant: Plant;
  room: Room;
  rooms: Room[];
  name: string;
  setPlant: Function;
  setThreshold: (type: SensorType, { start, end }: { start?: number; end?: number }) => void;
}

const AddPlantName: React.FC<StateProps> = () => (
  <>
    <Bold>What type of plant am I?</Bold>
    <TextInput name="name" autoCorrect />
  </>
);

const AddRoom: React.FC<StateProps> = ({ name, rooms }) => (
  <>
    <Text style={styles.text}>
      I'm a <Bold>{name}</Bold>, cool!
    </Text>
    <Text style={{ ...styles.text, marginBottom: PADDING.SMALL }}>Where am I?</Text>
    <Bold>I'm in the...</Bold>
    <PickerInput name="room" options={rooms.map((room) => ({ label: room.name, value: room }))} />
  </>
);

const AddSensors: React.FC<StateProps> = ({ room }) => (
  <>
    <Text style={{ ...styles.text, marginBottom: PADDING.BIG }}>
      I'm in the <Bold>{room.name}</Bold>, which means you can monitor {renderSensors(room)}.
    </Text>
    <View
      style={{
        marginBottom: PADDING.SMALL,
        justifyContent: 'flex-start',
      }}
    >
      {room.sensors.map((sensor) => (
        <ThresholdInput
          name={`specification.${sensor.type}`}
          key={sensor.type}
          label={SensorName[sensor.type]}
          unit={sensor.unit}
          {...(sensor.type !== SensorType.temperature ? { min: 0, max: 100 } : {})}
        />
      ))}
    </View>
  </>
);

const PlantImage: React.FC<StateProps> = ({ plant, setPlant }) => (
  <ImageChooser
    imageUrl={plant.imageUrl}
    setAvatar={(value) => setPlant({ imageUrl: value })}
    imageSet={'plants'}
  />
);

const PlantDate: React.FC<StateProps> = () => (
  <>
    <Text style={{ ...styles.text, marginBottom: PADDING.BIG }}>Almost there! How old am I?</Text>
    <Bold>I was planted on...</Bold>
    <DateInput name="plantedDate" max={new Date()} />
  </>
);

export const AddPlantScreen: React.FC<AddPlantScreenProps> = connectApi(
  { executeOnMount: [getRooms] },
  ({ rooms }) => {
    const navigation = useNavigation();
    const states: React.FC<any>[] = [AddPlantName, AddRoom, AddSensors, PlantImage, PlantDate];

    const [currentIndex, setIndex] = useState(0);
    const CurrentState = states[currentIndex];

    const hasPrevious = !!states[currentIndex - 1];
    const hasNext = !!states[currentIndex + 1];
    const isLast = currentIndex === states.length - 1;

    const validationSchema = yup.object().shape({
      name: yup.string().required(),
      room: yup.object().required(),
      plantedDate: yup.date().required(),
      specification: yup.object().shape({
        temperature: yup.object({
          start: yup.number().required().lessThan(yup.ref('end')),
          end: yup.number().required().moreThan(yup.ref('start')),
        }),
        soil: yup.object({
          start: yup.number().required().min(0).max(100).lessThan(yup.ref('end')),
          end: yup.number().required().min(0).max(100).moreThan(yup.ref('start')),
        }),
        humidity: yup.object({
          start: yup.number().required().min(0).max(100).lessThan(yup.ref('end')),
          end: yup.number().required().min(0).max(100).moreThan(yup.ref('start')),
        }),
        brightness: yup.object({
          start: yup.number().required().min(0).max(100).lessThan(yup.ref('end')),
          end: yup.number().required().min(0).max(100).moreThan(yup.ref('start')),
        }),
      }),
    });

    return (
      <Formik
        initialValues={{
          name: commonPlantTypes[random(0, commonPlantTypes.length - 1)],
          room: rooms[0],
          imageUrl: 'plant01.png',
          plantedDate: new Date(),
          specification: {
            temperature: {
              start: 8,
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
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const parsedPlant = {
            ...values,
            room: values.room.id,
            specification: values.room.sensors.reduce(
              (acc, { type }) => ({
                ...acc,
                [type]: values.specification[type as keyof typeof values.specification],
              }),
              {} as { [key in keyof PlantSpecification]: { start: number; end: number } }
            ),
          };

          console.log('Submitting...', parsedPlant);
          createPlant(parsedPlant).then(({ plant }) =>
            navigation.navigate('HomeNavigator', {
              screen: 'PlantScreen',
              params: { plant },
            })
          );

          return;
        }}
      >
        {({ values, setValues, initialValues, isValid, submitForm }) => {
          return (
            <Screen
              title={'New Plant'}
              contentStyle={{ marginTop: 12, paddingHorizontal: PADDING.SMALL }}
            >
              <CurrentState
                name={values.name! ?? initialValues.name}
                room={values.room! ?? initialValues.room}
                rooms={rooms}
                plant={values}
                setPlant={(newValues: object) => setValues({ ...values, ...newValues })}
                setThreshold={(type: SensorType, newValues: { start: number; end: number }) => {
                  setValues({
                    ...values,
                    specification: {
                      ...(values.specification ?? {}),
                      [type]: {
                        ...(values.specification?.[type] || {}),
                        ...newValues,
                      },
                    },
                  });
                }}
              />
              {(hasPrevious || hasNext) && (
                <Navigation
                  currentIndex={currentIndex}
                  setIndex={setIndex}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                  isLast={isLast}
                  canNext={isValid}
                  onFinish={submitForm}
                  finishLabel={'Add plant'}
                />
              )}
            </Screen>
          );
        }}
      </Formik>
    );
  }
);

const styles = StyleSheet.create({
  text: {
    ...FONT_STYLES.text,
    fontSize: 18,
    color: COLORS.MAIN_DARK,
    paddingHorizontal: PADDING.SMALLER - 2,
  },
});
