import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BORDER_RADIUS, COLORS, FONT_STYLES, PADDING } from '../styles';
import { ExtendedPlant } from '../types';

import { Image } from './image';
import images from '../images';

export interface PlantCardProps {
  plant: ExtendedPlant;
  style?: object;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, style }) => {
  const navigation = useNavigation();
  const avatar = images.plants[plant.image];

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('HomeNavigator', { screen: 'PlantScreen', params: { plant } })
      }
    >
      <View style={{ ...styles.wrapper, ...(style ?? {}) }}>
        <Image style={styles.image} image={avatar} />
        <View style={styles.tile}>
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.roomName}>{plant.roomName}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: PADDING.BIG * 2,
  },
  tile: {
    padding: PADDING.SMALL,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.MAIN_LIGHT,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: 176,
    width: 176,
  },
  image: {
    zIndex: 2,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: -PADDING.BIG * 2,
    right: 0,
    height: 140,
    width: 140,
    resizeMode: 'contain',
  },
  bottom: {
    flex: 3,
    backgroundColor: COLORS.LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  plantName: {
    ...FONT_STYLES.h3,
    color: COLORS.MAIN_DARK,
    lineHeight: 32,
  },
  roomName: {
    ...FONT_STYLES.text,
    fontSize: FONT_STYLES.h4.fontSize,
    color: COLORS.MAIN_DARK,
  },
});
