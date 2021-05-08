import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BORDER_RADIUS, BOX_SHADOW, COLORS, FONT_STYLES, FurnitureIcon } from '../styles';
import { Room } from '../types';
import { SensorStatus } from './sensor-status';

export interface RoomCardProps {
  room: Room;
  style?: object;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, style }) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('HomeNavigator', { screen: 'RoomScreen', params: { room } })
      }
    >
      <View style={{ ...styles.wrapper, ...(style ?? {}) }}>
        <View style={styles.sensors}>
          {room.sensors.map((sensor) => (
            <SensorStatus key={sensor.id} sensor={sensor} />
          ))}
        </View>
        <View style={styles.room}>
          <FurnitureIcon name={room.avatar} color={COLORS.MAIN_DARKER} size={30} />
          <Text style={styles.roomName}>{room.name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...BOX_SHADOW,
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    height: 136,
    width: 136,
    marginHorizontal: 2,
    marginVertical: 8,
  },
  sensors: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    backgroundColor: COLORS.MAIN_LIGHTER,
    height: '100%',
    justifyContent: 'space-evenly',
    paddingVertical: 6,
    alignItems: 'center',
    flex: 1.4,
  },
  room: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  roomName: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_DARKER,
    textAlign: 'center',
    marginTop: 6,
  },
});
