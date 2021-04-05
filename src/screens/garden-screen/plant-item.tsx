import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  BORDER_RADIUS,
  COLORS,
  FONT_STYLES,
  PADDING,
  UiIcon,
  BOX_SHADOW,
  EmojiIcon,
} from '../../styles';
import { MoodIcon, PlantExtended, SensorTypeIcon } from '../../types';
import { SensorIcon } from './sensor-icon';

import image from '../../../assets/images/plants/plant01.png';

export const PlantItem: React.FC<PlantExtended> = (props) => {
  const { name, room, mood, hasNotification } = props;
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('HomeNavigator', { screen: 'PlantScreen', params: { plant: props } })
      }
    >
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={image} />
        </View>
        <View style={styles.info}>
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>{name}</Text>
            <UiIcon
              name={'fi-rr-angle-small-right'}
              size={38}
              color={COLORS.LIGHT}
              style={{
                width: 26,
              }}
            />
          </View>
          <View style={{ paddingRight: PADDING.SMALL }}>
            <View style={styles.sensors}>
              {room.sensors.map((sensor) => (
                <SensorIcon value={'56%'} iconName={SensorTypeIcon[sensor.type]} />
              ))}
            </View>
            <View style={styles.moodWrapper}>
              <EmojiIcon name={MoodIcon[mood]} color={COLORS.LIGHT} size={20} />
              <Text style={styles.mood}>I'm happy!</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.MAIN_DARK,
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    padding: PADDING.SMALLER,
    marginBottom: PADDING.SMALL,
    marginLeft: 4,
    ...BOX_SHADOW,
  },
  imageWrapper: {
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'center',
    height: 'auto',
    width: 60,
  },
  info: {
    marginLeft: PADDING.SMALLER,
    flex: 1,
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: PADDING.SMALLER / 2,
  },
  name: { ...FONT_STYLES.h3, color: COLORS.LIGHT },
  sensors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: PADDING.SMALLER / 2,
  },
  moodWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mood: {
    ...FONT_STYLES.text,
    color: COLORS.LIGHT,
    marginLeft: PADDING.SMALLER / 2,
  },
});
