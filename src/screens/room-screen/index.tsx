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
import { useAppSelector } from '../../store.hooks';

export const RoomScreen: React.FC = () => {
  const route = useRoute();

  const { room } = route.params as { room: Room };
  const readings = useAppSelector(
    (state) => state.rooms.rooms?.find(({ id: roomId }) => room.id === roomId)?.lastReadings
  );

  return (
    <>
      <Screen
        green={true}
        editable={true}
        editParams={{ screen: 'RoomSettingsScreen', params: { room } }}
        title={room.name}
      >
        <List
          title={'Sensors'}
          emptyMessage={'There are no sensors in this room'}
          items={room.sensors.map((sensor) => ({
            key: sensor.id,
            label: SensorName[sensor.type],
            smallLabel: `${readings?.[sensor.type]?.value ?? '--'} ${sensor.unit}`,
            iconName: SensorTypeIcon[sensor.type],
            iconType: 'weather',
            status: SensorStatus.online,
            href: 'SensorScreen',
            params: { sensor },
          }))}
        />
        <List
          title={'Plants'}
          emptyMessage={'There are no plants in this room'}
          items={room.plants.map((plant) => ({
            key: plant.id,
            label: plant.name,
            smallLabel: "I'm happy!",
            imageSet: 'plants',
            imageUrl: plant.imageUrl,
            href: 'PlantScreen',
            params: { plant: { ...plant, room } },
          }))}
        />
      </Screen>
      <FloatingActionButton actions={[AddPlantAction, AddSensorAction]} />
    </>
  );
};
