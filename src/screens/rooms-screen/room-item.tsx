import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SensorIcon } from '../../components/sensor-icon';

import {
  BORDER_RADIUS,
  COLORS,
  FONT_STYLES,
  PADDING,
  UiIcon,
  BOX_SHADOW,
  FurnitureIcon,
} from '../../styles';
import { Room, SensorType, SensorTypeIcon } from '../../types';
import { useAppSelector } from '../../store.hooks';
import { Image } from '../../components/image';
import images from '../../images';

export const RoomItem: React.FC<Room> = (props) => {
  const { id, name, image, sensors } = props;
  const navigation = useNavigation();
  const readings = useAppSelector(
    (state) => state.rooms.rooms?.find(({ id: roomId }) => id === roomId)?.lastReadings
  );

  const avatar = images.rooms[image];

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('HomeNavigator', { screen: 'RoomScreen', params: { room: props } })
      }
    >
      <View style={styles.wrapper}>
        <Image style={styles.image} image={avatar} />
        <View style={styles.info}>
          <Text style={styles.plantCount}>2 plants</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.MAIN_LIGHT,
    borderRadius: BORDER_RADIUS,
    height: 176,
    overflow: 'hidden',
  },
  imageWrapper: {
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: 60,
    width: '100%',
  },
  info: {
    padding: PADDING.SMALLER,
  },
  name: { ...FONT_STYLES.h4, ...FONT_STYLES.bold, color: COLORS.MAIN_DARK },
  plantCount: { ...FONT_STYLES.text, color: COLORS.MAIN_DARK },
});
