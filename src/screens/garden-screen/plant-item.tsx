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
import { LastReadings, MoodIcon, PlantExtended, SensorTypeIcon } from '../../types';

export const PlantItem: React.FC<PlantExtended & { readings: LastReadings }> = (props) => {
  const { name, room, mood, imageUrl, readings } = props;
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('HomeNavigator', { screen: 'PlantScreen', params: { plant: props } })
      }
    >
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} imageUrl={imageUrl} />
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
  empty: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_LIGHT,
  },
});
