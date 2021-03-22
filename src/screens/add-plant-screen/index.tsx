import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Screen } from '../../components/screen';
import { ROOM_MOCK_1 } from '../../mocks';
import { COLORS, FONT_STYLES, UiIcon } from '../../styles';
import { Room, Sensor } from '../../types';

export interface AddPlantScreenProps {
  rooms: Room[];
}

interface NewPlant {
  name?: string;
  room?: Room;
}

interface StateProps {
  setPlant: Function;
}

interface NavigationProps {
  setIndex: Function;
}

const Bold: React.FC = ({ children }) => (
  <Text style={{ ...FONT_STYLES.h4, fontSize: 18, color: COLORS.MAIN_DARK }}>{children}</Text>
);

const AddPlantName: React.FC<StateProps> = () => (
  <Text style={{ ...FONT_STYLES.h4, color: COLORS.MAIN_DARK }}>What type of plant am I?</Text>
);

const AddRoom: React.FC<StateProps & { name: string }> = ({ name }) => (
  <>
    <Text style={styles.text}>
      I'm a<Bold>{name}</Bold>, cool!
    </Text>
    <Text style={styles.text}>Where am I?</Text>
    <Text style={{ ...FONT_STYLES.h4, color: COLORS.MAIN_DARK }}>I'm in the...</Text>
  </>
);

const renderSensors = (room: Room) =>
  room.sensors.map(({ name }, index) => (
    <>
      <Bold>{name}</Bold>
      {index === room.sensors.length - 2 ? ' and ' : index < room.sensors.length - 1 ? ', ' : ''}
    </>
  ));

const AddSensors: React.FC<StateProps & { room: Room }> = ({ room }) => (
  <>
    <Text style={styles.text}>
      I'm in the <Bold>{room.name}</Bold>, which means you can monitor {renderSensors(room)}.
    </Text>
  </>
);

const PlantDate: React.FC<StateProps> = () => (
  <>
    <Text style={styles.text}>Almost there! How old am I?</Text>
    <Bold>I was planted on...</Bold>
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

const Next: React.FC<NavigationProps> = ({ setIndex }) => (
  <TouchableOpacity style={styles.navigationButton} onPress={() => setIndex()}>
    <Text style={styles.navigationText}>Next</Text>
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
    <Screen title="New plant" contentStyle={{ marginTop: 64 }}>
      <CurrentState name={plant?.name!} room={plant?.room!} setPlant={setPlant} />
      {(hasPrevious || hasNext) && (
        <View
          style={{
            ...styles.navigation,
            ...(!hasPrevious ? styles.alignRight : {}),
            ...(!hasNext && !isLast ? styles.alignLeft : {}),
          }}
        >
          {hasPrevious && <Previous setIndex={() => setIndex(currentIndex - 1)} />}
          {hasNext && <Next setIndex={() => setIndex(currentIndex + 1)} />}
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
  },
});
