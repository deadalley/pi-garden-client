import React from 'react';
import { FlatList } from 'react-native';

import { Screen } from '../../components/screen';
import { AddPlantAction, FloatingActionButton } from '../../components/floating-action-button';
import { PlantItem } from './plant-item';

import { useAppSelector } from '../../store.hooks';
import { useGetPlants } from '../../hooks/useGetPlants';

export const GardenScreen: React.FC = () => {
  const { data: plants } = useGetPlants();

  const allReadings = useAppSelector((state) => state.rooms.rooms);

  return (
    <>
      <Screen title={'My Garden'} withBottomPadFix={false} iconName="fi-rr-add">
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const readings = allReadings?.find(({ id }) => id === item.room)?.lastReadings;

            return <PlantItem {...item} readings={readings!} />;
          }}
        />
      </Screen>
      <FloatingActionButton actions={[AddPlantAction]} />
    </>
  );
};
