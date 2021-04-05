import React from 'react';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { List } from '../../components/list';
import { Screen } from '../../components/screen';
import { Room, SensorName, SensorStatus, SensorTypeIcon } from '../../types';

export const RoomScreen: React.FC = () => {
  const route = useRoute();

  const { room } = route.params as { room: Room };

  return (
    <Screen green editable title={room.name}>
      {/* {[
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
        ...room.sensors,
      ].map((sensor) => (
        <Text>{sensor.type}</Text>
      ))} */}
      <List
        title={'Sensors'}
        items={room.sensors.map((sensor) => ({
          label: SensorName[sensor.type],
          smallLabel: '123',
          iconName: SensorTypeIcon[sensor.type],
          iconType: 'weather',
          status: SensorStatus.online,
        }))}
      />
      <List
        title={'Plants'}
        items={room.plants.map((plant) => ({
          label: plant.name,
          smallLabel: "I'm happy!",
          iconName: 'anthurium',
          iconType: 'plant',
        }))}
      />
    </Screen>
  );
};
