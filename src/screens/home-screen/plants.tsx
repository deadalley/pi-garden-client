import React from 'react';
import { FlatList } from 'react-native';

import { PlantCard } from '../../components/plant-card';
import { PADDING } from '../../styles';
import { PlantExtended } from '../../types';

export interface PlantsProps {
  plants: PlantExtended[];
}

export const Plants: React.FC<PlantsProps> = ({ plants }) => (
  <FlatList
    horizontal
    data={plants}
    renderItem={({ item, index }) => (
      <PlantCard
        plant={item}
        hasNotification={item.hasNotification}
        style={{
          ...(index === 0
            ? { marginLeft: PADDING.BIGGER, marginRight: PADDING.SMALLER }
            : index < plants.length - 1
            ? { marginRight: PADDING.SMALLER }
            : { marginRight: PADDING.SMALL }),
        }}
      />
    )}
    keyExtractor={(item) => item.id}
  />
);
