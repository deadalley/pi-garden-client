import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import capitalize from 'lodash/capitalize';

import { MoodIcon, PlantExtended } from '../../types';
import { NavHeader } from '../../components/nav-header';
import { IconLabel } from '../../components/icon-label';
import { SensorValue } from './sensor-value';
import { Button } from './button';

import { COLORS, FONT_STYLES, HEADER_HEIGHT, PADDING, UiIcon } from '../../styles';
import { formatAge } from '../../utils/date';

import image from '../../../assets/images/plants/plant01.png';

export interface PlantScreenProps {}

export const PlantScreen: React.FC<PlantScreenProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { plant } = route.params as { plant: PlantExtended };

  return (
    <View style={{ ...styles.wrapper }}>
      <View style={{ ...styles.top }}>
        <NavHeader
          color={COLORS.LIGHT}
          onPress={() => navigation.goBack()}
          style={{ width: '90%' }}
        >
          {plant.name}
        </NavHeader>
        <UiIcon name={'fi-rr-edit'} color={COLORS.LIGHT} size={24} />
      </View>
      <View style={styles.content}>
        {plant.room.sensors.map((sensor) => (
          <SensorValue sensor={sensor} />
        ))}
      </View>
      <View style={{ ...styles.bottom }}>
        <Image style={styles.image} source={image} />
        <View>
          <View style={styles.warning}>
            <View style={styles.divider} />
            <Text style={styles.warningText}>The soil is too dry for this plant!</Text>
          </View>
          <View style={styles.iconLabels}>
            <IconLabel
              iconType={'furniture'}
              iconName={plant.room.avatar}
              label={plant.room.name}
            />
            <IconLabel
              iconType={'emoji'}
              iconName={MoodIcon[plant.mood]}
              label={capitalize(plant.mood)}
            />
            <IconLabel
              iconType={'nature'}
              iconName={'sprout-1'}
              label={capitalize(formatAge(plant.plantedDate)!)}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() =>
              navigation.navigate('HomeNavigator', {
                screen: 'PlantStatisticsScreen',
                params: { plant },
              })
            }
          >
            Statistics
          </Button>
          <Button
            hasNotification={plant.hasNotification}
            onPress={() => navigation.navigate('HomeNavigator', { screen: 'NotificationsScreen' })}
          >
            Notifications
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.MAIN_DARK,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flexDirection: 'column',
  },
  top: {
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: PADDING.SMALL,
    paddingRight: PADDING.BIG,
  },
  bottom: {
    flex: 4,
    justifyContent: 'space-between',
    backgroundColor: COLORS.LIGHT,
    padding: PADDING.SMALL,
    paddingBottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  iconLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING.SMALL,
    marginBottom: PADDING.SMALLER,
  },
  warning: {
    flexDirection: 'row',
    width: 180,
    marginBottom: PADDING.SMALL,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  warningText: {
    ...FONT_STYLES.h4,
    color: COLORS.MAIN_DARK,
  },
  divider: {
    width: 3,
    backgroundColor: COLORS.MAIN_DARK,
    borderRadius: 30,
    height: '80%',
    marginRight: PADDING.SMALLER / 2,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    flex: 1,
    alignItems: 'flex-end',
  },
  content: {
    flex: 6,
    paddingHorizontal: PADDING.BIG,
    alignItems: 'flex-end',
    zIndex: 2,
  },
  image: {
    flex: 1,
    resizeMode: 'center',
    position: 'absolute',
    bottom: 156,
    left: -40,
    height: 420,
    width: 240,
  },
});
