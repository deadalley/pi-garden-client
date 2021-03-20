import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { PlantCard } from '../../components/plant-card';
import { PADDING } from '../../styles';
import { Plant } from '../../types';

export interface PlantsProps {
  plants: Plant[];
}

export const Plants: React.FC<PlantsProps> = ({ plants }) => (
  <FlatList
    horizontal
    data={plants}
    renderItem={({ item, index }) => (
      <PlantCard
        plant={item}
        style={{
          ...styles.list,
          ...(index === 0
            ? { marginLeft: PADDING.BIGGER, marginRight: PADDING.SMALLER }
            : index < plants.length - 1
            ? { marginRight: PADDING.SMALLER }
            : { marginRight: PADDING.BIGGER }),
        }}
      />
    )}
    keyExtractor={(item) => item.id}
  />
);

const styles = StyleSheet.create({
  list: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
