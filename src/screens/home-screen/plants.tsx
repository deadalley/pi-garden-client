import React from 'react';
import { FlatList } from 'react-native';

import { PlantCard } from '../../components/plant-card';
import { PADDING } from '../../styles';
import { ExtendedPlant } from '../../types';

export interface PlantsProps {
  plants: ExtendedPlant[];
}

export const Plants: React.FC<PlantsProps> = ({ plants }) => (
  <FlatList
    horizontal={true}
    data={plants}
    renderItem={({ item, index }) => (
      <PlantCard
        plant={item}
        style={{
          ...(index < plants.length - 1
            ? { marginRight: PADDING.SMALLER }
            : { marginRight: PADDING.SMALL }),
        }}
      />
    )}
    keyExtractor={(item) => item.id}
  />
);
