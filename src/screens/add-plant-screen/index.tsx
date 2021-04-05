import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Bold } from '../../components/typography';
import { DateInput } from '../../components/date-input';
import { PickerInput } from '../../components/picker-input';
import { Screen } from '../../components/screen';
import { TextInput } from '../../components/text-input';
import { ThresholdInput } from '../../components/threshold-input';
import { ROOM_MOCK_1, ROOM_MOCK_2 } from '../../mocks';
import { COLORS, FONT_STYLES, PADDING, UiIcon } from '../../styles';
import { Plant, PlantSpecification, Room, SensorName, SensorType } from '../../types';
import { random } from '../../utils/number';
import { renderSensors } from './utils';

export interface AddPlantScreenProps {
  rooms: Room[];
}

interface NewPlant {
  name?: string;
  room?: Room;
  plantedDate?: Date;
  specification?: { [key in keyof PlantSpecification]?: { start?: number; end?: number } };
}

interface StateProps {
  plant: Plant;
  room: Room;
  rooms: Room[];
  name: string;
  setPlant: Function;
  setThreshold: (type: SensorType, { start, end }: { start?: number; end?: number }) => void;
}

interface NavigationProps {
  setIndex: Function;
  disabled?: boolean;
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

const PlantDate: React.FC<StateProps> = () => (
  <>
    <Text style={{ ...styles.text, marginBottom: PADDING.BIG }}>Almost there! How old am I?</Text>
    <Bold>I was planted on...</Bold>
    <DateInput name="plantedDate" max={new Date()} />
  </>
);

const Previous: React.FC<NavigationProps> = ({ setIndex }) => (
  <TouchableOpacity style={styles.navigationButton} onPress={() => setIndex()}>
    <UiIcon
      name="fi-rr-angle-small-left"
      color={COLORS.MAIN_DARK}
      size={24}
      style={{
        marginLeft: -6,
      }}
    />
    <Text style={styles.navigationText}>Previous</Text>
  </TouchableOpacity>
);

const Next: React.FC<NavigationProps> = ({ setIndex, disabled }) => (
  <TouchableOpacity style={styles.navigationButton} onPress={() => setIndex()} disabled={disabled}>
    <Text style={{ ...styles.navigationText, ...(disabled ? styles.disabled : {}) }}>Next</Text>
    <UiIcon
      name="fi-rr-angle-small-right"
      color={COLORS.MAIN_DARK}
      style={{
        marginRight: -6,
        ...(disabled ? styles.disabled : {}),
      }}
      size={24}
    />
  </TouchableOpacity>
);

const Finish: React.FC<{ onFinish: () => void }> = ({ onFinish }) => (
  <TouchableOpacity style={styles.navigationButton} onPress={onFinish}>
    <Text style={styles.navigationText}>Add plant</Text>
    <UiIcon
      name="fi-rr-angle-small-right"
      color={COLORS.MAIN_DARK}
      style={{
        marginRight: -6,
      }}
      size={24}
    />
  </TouchableOpacity>
);

export const AddPlantScreen: React.FC<AddPlantScreenProps> = ({ rooms }) => {
  const states: React.FC<any>[] = [AddPlantName, AddRoom, AddSensors, PlantDate];
  const _rooms = [ROOM_MOCK_1, ROOM_MOCK_2];
  const commonPlantTypes = [
    'Strawberry',
    'Potato',
    'Basil',
    'Tomato',
    'Bell Pepper',
    'Pepper',
    'Jalapeño',
    'Lettuce',
    'Rocket',
    'Cactus',
  ];

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
      temperature: yup.object({ start: yup.number().required(), end: yup.number().required() }),
      soil: yup.object({
        start: yup.number().required().min(0).max(100),
        end: yup.number().required().min(0).max(100),
      }),
      humidity: yup.object({
        start: yup.number().required().min(0).max(100),
        end: yup.number().required().min(0).max(100),
      }),
      brightness: yup.object({
        start: yup.number().required().min(0).max(100),
        end: yup.number().required().min(0).max(100),
      }),
    }),
  });

  return (
    <Formik
      initialValues={
        {
          name: commonPlantTypes[random(0, commonPlantTypes.length - 1)],
          room: _rooms[0],
          plantedDate: new Date(),
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
        } as NewPlant
      }
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Submitting...', values);
        return;
      }}
    >
      {({ values, setValues, initialValues, isValid, submitForm }) => {
        return (
          <Screen
            title="New plant"
            contentStyle={{ marginTop: 36, paddingHorizontal: PADDING.SMALL }}
          >
            <CurrentState
              name={values.name! ?? initialValues.name}
              room={values.room! ?? initialValues.room}
              rooms={_rooms}
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
              <View
                style={{
                  ...styles.navigation,
                  ...(!hasPrevious ? styles.alignRight : {}),
                  ...(!hasNext && !isLast ? styles.alignLeft : {}),
                }}
              >
                {hasPrevious && <Previous setIndex={() => setIndex(currentIndex - 1)} />}
                {hasNext && (
                  <Next setIndex={() => setIndex(currentIndex + 1)} disabled={!isValid} />
                )}
                {isLast && <Finish onFinish={submitForm} />}
              </View>
            )}
          </Screen>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING.SMALLER - 2,
  },
  navigationText: {
    ...FONT_STYLES.h4,
    color: COLORS.MAIN_DARK,
    lineHeight: 24,
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  text: {
    ...FONT_STYLES.text,
    fontSize: 18,
    color: COLORS.MAIN_DARK,
    paddingHorizontal: PADDING.SMALLER - 2,
  },
  disabled: {
    opacity: 0.5,
  },
});
