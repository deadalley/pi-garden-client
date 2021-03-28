import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DateInput } from '../../components/date-input';
import { PickerInput } from '../../components/picker-input';

import { Screen } from '../../components/screen';
import { TextInput } from '../../components/text-input';
import { ThresholdInput } from '../../components/threshold-input';
import { ROOM_MOCK_1 } from '../../mocks';
import { COLORS, FONT_STYLES, PADDING, UiIcon } from '../../styles';
import { Plant, PlantSpecification, Room, SensorName, SensorType } from '../../types';

export interface AddPlantScreenProps {
  rooms: Room[];
}

interface NewPlant {
  name?: string;
  room?: Room;
  specification?: { [key in keyof PlantSpecification]?: { start?: number; end?: number } };
}

interface StateProps {
  setPlant: Function;
  plant: Plant;
  room: Room;
  setThreshold: (type: SensorType, { start, end }: { start?: number; end?: number }) => void;
}

interface NavigationProps {
  setIndex: Function;
  disabled?: boolean;
}

const Bold: React.FC = ({ children }) => (
  <Text
    style={{ ...FONT_STYLES.h4, color: COLORS.MAIN_DARK, paddingHorizontal: PADDING.SMALLER - 2 }}
  >
    {children}
  </Text>
);

const AddPlantName: React.FC<StateProps> = ({ setPlant }) => (
  <>
    <Bold>What type of plant am I?</Bold>
    <TextInput required onChange={(name: string) => setPlant({ name })} autoCorrect />
  </>
);

const AddRoom: React.FC<StateProps & { name: string; rooms: Room[] }> = ({ name, rooms }) => (
  <>
    <Text style={styles.text}>
      I'm a <Bold>{name}</Bold>, cool!
    </Text>
    <Text style={{ ...styles.text, marginBottom: PADDING.SMALL }}>Where am I?</Text>
    <Bold>I'm in the...</Bold>
    <PickerInput options={rooms.map(({ name, id }) => ({ label: name, value: id }))} />
  </>
);

const renderSensors = (room: Room) =>
  room.sensors.map(({ name }, index) => (
    <>
      <Bold>{name}</Bold>
      {index === room.sensors.length - 2 ? ' and ' : index < room.sensors.length - 1 ? ', ' : ''}
    </>
  ));

const AddSensors: React.FC<StateProps> = ({ room, plant, setThreshold }) => (
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
          key={sensor.type}
          label={SensorName[sensor.type]}
          unit={sensor.unit}
          threshold={plant.specification?.[sensor.type] || {}}
          {...(sensor.type !== SensorType.temperature ? { min: 0, max: 100 } : {})}
          onChange={(value) => setThreshold(sensor.type, value)}
        />
      ))}
    </View>
  </>
);

const PlantDate: React.FC<StateProps> = () => (
  <>
    <Text style={{ ...styles.text, marginBottom: PADDING.BIG }}>Almost there! How old am I?</Text>
    <Bold>I was planted on...</Bold>
    <DateInput />
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

const Finish: React.FC = () => (
  <TouchableOpacity style={styles.navigationButton} onPress={() => {}}>
    <Text style={styles.navigationText}>Finish</Text>
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
  const _rooms = [ROOM_MOCK_1];

  const [plant, setPlant] = useState<NewPlant>({ room: _rooms[0] });
  const [currentIndex, setIndex] = useState(0);

  const CurrentState = states[currentIndex];
  const hasPrevious = !!states[currentIndex - 1];
  const hasNext = !!states[currentIndex + 1];
  const isLast = currentIndex === states.length - 1;

  return (
    <Screen title="New plant" contentStyle={{ marginTop: 36, paddingHorizontal: PADDING.SMALL }}>
      <CurrentState
        name={plant?.name!}
        room={plant?.room!}
        rooms={_rooms}
        plant={plant}
        setPlant={(values: object) => setPlant({ ...plant, ...values })}
        setThreshold={(type: SensorType, values: { start: number; end: number }) => {
          setPlant((plantState) => ({
            ...plantState,
            specification: {
              ...(plantState.specification ?? {}),
              [type]: {
                ...(plantState.specification?.[type] || {}),
                ...values,
              },
            },
          }));
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
            <Next
              setIndex={() => setIndex(currentIndex + 1)}
              disabled={currentIndex === 0 && !plant.name}
            />
          )}
          {isLast && <Finish />}
        </View>
      )}
    </Screen>
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
