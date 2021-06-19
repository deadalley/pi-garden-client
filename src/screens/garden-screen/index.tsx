import React from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Screen } from '../../components/screen';
import { AddPlantAction, FloatingActionButton } from '../../components/floating-action-button';
import { PlantItem } from './plant-item';

import { Plant } from '../../types';
import { useAppSelector } from '../../store.hooks';

export const GardenScreen: React.FC = () => {
  const route = useRoute();
  const { plants } = route.params as { plants: Plant[] };

  const allReadings = useAppSelector((state) => state.rooms.rooms);

  return (
    <>
      <Screen
        title={'My Garden'}
        contentStyle={{ paddingTop: 0, paddingRight: 0 }}
        withBottomPadFix={false}
      >
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const readings = allReadings?.find(({ id }) => id === item.room.id)?.lastReadings;

            return <PlantItem {...item} readings={readings!} />;
          }}
        />
      </Screen>
      <FloatingActionButton actions={[AddPlantAction]} />
    </>
  );
};
