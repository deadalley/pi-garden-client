import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BORDER_RADIUS, BOX_SHADOW, COLORS, EmojiIcon, FONT_STYLES, PADDING } from '../styles';
import { MoodIcon, Plant } from '../types';

import { Image } from './image';
import { NotificationBadge } from './notification-badge';

export interface PlantCardProps {
  plant: Plant;
  style?: object;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, style }) => {
  const navigation = useNavigation();
  const hasNotification = !!(plant && plant.notifications && plant.notifications.length);

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('HomeNavigator', { screen: 'PlantScreen', params: { plant } })
      }
    >
      <View style={{ ...styles.wrapper, ...(style ?? {}) }}>
        <EmojiIcon
          name={MoodIcon[plant.mood]}
          size={18}
          color={COLORS.MAIN_DARK}
          style={styles.mood}
        />
        {hasNotification && <NotificationBadge />}
        <View style={styles.imageWrapper}>
          <Image style={styles.image} imageUrl={plant.imageUrl} />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.roomName}>{plant.room.name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  imageWrapper: {
    flex: 5,
    padding: PADDING.SMALLER,
  },
  image: {
    flex: 1,
    resizeMode: 'center',
    width: 200,
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
    ...FONT_STYLES.h4,
    color: COLORS.MAIN_DARKER,
    lineHeight: 22,
  },
  roomName: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_DARKER,
  },
  mood: {
    position: 'absolute',
    top: PADDING.SMALLER,
    left: PADDING.SMALLER,
  },
});
