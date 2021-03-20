import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { BORDER_RADIUS, BOX_SHADOW, COLORS, FONT_STYLES } from '../styles';
import { Plant } from '../types';

export interface PlantCardProps {
  plant: Plant;
  style?: object;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, style }) => (
  <TouchableWithoutFeedback>
    <View style={{ ...styles.wrapper, ...(style ?? {}) }}>
      <Text style={styles.image}>Placeholder Image</Text>
      <View style={styles.bottom}>
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.roomName}>{plant.room.name}</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  wrapper: {
    ...BOX_SHADOW,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.MAIN_LIGHTER,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginHorizontal: 2,
    marginVertical: 8,
    width: 136,
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  bottom: {
    flex: 1,
    backgroundColor: COLORS.LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  plantName: {
    ...FONT_STYLES.h4,
    color: COLORS.MAIN_DARKER,
  },
  roomName: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_DARKER,
  },
});
