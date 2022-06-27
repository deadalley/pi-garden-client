import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Image } from '../../components/image';
import { SensorIcon } from '../../components/sensor-icon';

import {
  BORDER_RADIUS,
  COLORS,
  FONT_STYLES,
  PADDING,
  UiIcon,
  BOX_SHADOW,
  EmojiIcon,
} from '../../styles';
import { LastReadings, MoodIcon, ExtendedPlant, SensorTypeIcon } from '../../types';
import images from '../../images';

export const PlantItem: React.FC<ExtendedPlant & { readings: LastReadings }> = (props) => {
  const { name, roomName, image, readings } = props;
  const navigation = useNavigation();

  const avatar = images.plants[image];

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('HomeNavigator', { screen: 'PlantScreen', params: { plant: props } })
      }
    >
      <View style={styles.wrapper}>
        <Image style={styles.image} image={avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.roomName}>{roomName}</Text>
          {/* <View style={{ paddingRight: PADDING.SMALL }}>
            <View
              style={{
                ...styles.sensors,
                ...(room.sensors.length < 4 ? { justifyContent: 'flex-start' } : {}),
              }}
            >
              {room.sensors.length ? (
                room.sensors.map((sensor, index) => (
                  <SensorIcon
                    value={`${readings?.[sensor.type]?.value ?? '--'} ${sensor.unit}`}
                    iconName={SensorTypeIcon[sensor.type]}
                    style={index === room.sensors.length - 1 ? { marginRight: 0 } : {}}
                  />
                ))
              ) : (
                <Text style={styles.empty}>No sensors</Text>
              )}
            </View>
            <View style={styles.moodWrapper}>
              <EmojiIcon name={MoodIcon[mood]} color={COLORS.LIGHT} size={20} />
              <Text style={styles.mood}>I'm happy!</Text>
            </View>
          </View> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.MAIN_LIGHT,
    borderRadius: BORDER_RADIUS,
    paddingTop: PADDING.MEDIUM,
    paddingBottom: PADDING.SMALL,
    paddingRight: PADDING.SMALLER,
    height: 176,
    marginBottom: PADDING.MEDIUM,
  },
  image: {
    flex: 1,
    resizeMode: 'center',
    height: 'auto',
    marginHorizontal: PADDING.SMALLER / 2,
  },
  info: {
    flex: 2,
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: PADDING.SMALLER / 2,
  },
  name: { ...FONT_STYLES.h4, ...FONT_STYLES.bold, color: COLORS.MAIN_DARK },
  roomName: { ...FONT_STYLES.text, color: COLORS.MAIN_DARK },
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
  empty: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_LIGHT,
  },
});
