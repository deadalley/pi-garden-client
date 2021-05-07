import React from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { PLANT_MOCK } from '../../mocks';

import { Screen } from '../../components/screen';
import { AddPlantAction, FloatingActionButton } from '../../components/floating-action-button';
import { PlantItem } from './plant-item';
import { Plant } from '../../types';

export const GardenScreen: React.FC = () => {
  const route = useRoute();
  const { plants } = route.params as { plants: Plant[] };

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
          renderItem={({ item }) => <PlantItem {...item} />}
        />
      </Screen>
      <FloatingActionButton actions={[AddPlantAction]} />
    </>
  );
};
