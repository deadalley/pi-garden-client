import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Image } from '../../components/image';

import { formatDate } from '../../utils/date';
import { BORDER_RADIUS, COLORS, FONT_STYLES, PADDING, BOX_SHADOW } from '../../styles';
import { Notification, SensorName } from '../../types';

export const NotificationCard: React.FC<Notification> = ({
  timestamp,
  text,
  plant,
  sensor,
  value,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('HomeNavigator', { screen: 'PlantScreen', params: { plant } })
      }
    >
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} imageUrl={plant.imageUrl} />
        </View>
        <View style={styles.info}>
          <View style={styles.nameWrapper}>
            <Text style={styles.text}>{plant.name}</Text>
            <Text style={styles.text}>{formatDate(timestamp)}</Text>
          </View>
          <Text style={{ ...styles.bold, marginBottom: PADDING.SMALLER / 2 }}>{text}</Text>
          <Text style={styles.text}>
            {SensorName[sensor.type]}:{' '}
            <Text style={{ ...styles.bold, fontSize: 14 }}>
              {value}
              {sensor.unit}
            </Text>
          </Text>
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
  bold: { ...FONT_STYLES.h4, color: COLORS.LIGHT, lineHeight: 24 },
  text: { ...FONT_STYLES.text, color: COLORS.LIGHT, lineHeight: 18 },
});
