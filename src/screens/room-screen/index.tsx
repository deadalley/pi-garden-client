import React from 'react';
import { useRoute } from '@react-navigation/native';

import { List } from '../../components/list';
import { Screen } from '../../components/screen';
import {
  AddPlantAction,
  AddSensorAction,
  FloatingActionButton,
} from '../../components/floating-action-button';

import { Room, SensorName, SensorStatus, SensorTypeIcon } from '../../types';

export const RoomScreen: React.FC = () => {
  const route = useRoute();

  const { room } = route.params as { room: Room };

  return (
    <>
      <Screen green editable title={room.name}>
        <List
          title={'Sensors'}
          items={room.sensors.map((sensor) => ({
            label: SensorName[sensor.type],
            smallLabel: '123',
            iconName: SensorTypeIcon[sensor.type],
            iconType: 'weather',
            status: SensorStatus.online,
            href: 'SensorScreen',
            params: { sensor },
          }))}
        />
        <List
          title={'Plants'}
          items={room.plants.map((plant) => ({
            label: plant.name,
            smallLabel: "I'm happy!",
            imageSet: 'plants',
            imageIndex: 0,
            href: 'PlantScreen',
            params: { plant: { ...plant, room } },
          }))}
        />
      </Screen>
      <FloatingActionButton actions={[AddPlantAction, AddSensorAction]} />
    </>
  );
};
