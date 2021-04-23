import React from 'react';
import { FlatList } from 'react-native';

import { PLANT_MOCK } from '../../mocks';
import { Screen } from '../../components/screen';
import { PlantItem } from './plant-item';

export const GardenScreen: React.FC = () => {
  const plants = [
    PLANT_MOCK as any,
    PLANT_MOCK,
    PLANT_MOCK,
    PLANT_MOCK,
    PLANT_MOCK,
    PLANT_MOCK,
    PLANT_MOCK,
    PLANT_MOCK,
    PLANT_MOCK,
  ];
  return (
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
  );
};
