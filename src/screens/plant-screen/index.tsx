import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStatefulResource } from '@rest-hooks/legacy';
import { useInvalidator } from 'rest-hooks';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import capitalize from 'lodash/capitalize';

import { MoodIcon, Plant } from '../../types';
import { NavHeader } from '../../components/nav-header';
import { IconLabel } from '../../components/icon-label';
import { Image } from '../../components/image';
import { SensorValue } from './sensor-value';
import { Button } from './button';

import { COLORS, FONT_STYLES, HEADER_HEIGHT, PADDING, UiIcon } from '../../styles';
import { formatAge } from '../../utils/date';
import { Bold } from '../../components/typography';
import ReadingResource from '../../resources/reading';
import { useCallback } from 'react';

export interface PlantScreenProps {}

export const PlantScreen: React.FC<PlantScreenProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { plant } = route.params as { plant: Plant };
  const hasNotification = !!(plant && plant.notifications && plant.notifications.length);

  const { data: readings, loading } = useStatefulResource(ReadingResource.last(), {
    id: plant.room.id,
  });
  const [previousReadings, setPreviousReadings] = useState(readings);
  const invalidateReadings = useInvalidator(ReadingResource.last());

  useFocusEffect(
    useCallback(() => {
      invalidateReadings({ id: plant.room.id });
    }, [invalidateReadings])
  );

  useEffect(() => {
    if (!loading) {
      setPreviousReadings(readings);
    }
  }, [loading]);

  return (
    <View style={{ ...styles.wrapper }}>
      <View style={{ ...styles.top }}>
        <NavHeader
          color={COLORS.LIGHT}
          onPress={() => navigation.navigate('Home')}
          style={{ width: '90%' }}
        >
          {plant.name}
        </NavHeader>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('HomeNavigator', {
              screen: 'PlantSettingsScreen',
              params: { plant },
            })
          }
        >
          <UiIcon name={'fi-rr-edit'} color={COLORS.LIGHT} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {plant.room.sensors.length ? (
          plant.room.sensors.map((sensor) => (
            <SensorValue
              key={sensor.id}
              sensor={sensor}
              value={(loading ? previousReadings : readings)?.[sensor.type]?.value ?? '--'}
            />
          ))
        ) : (
          <View style={styles.emptyWrapper}>
            <Text style={styles.empty}>
              Uh oh, we don't have any info on this plant!
              {'\n\n'}
              <Bold style={{ color: COLORS.LIGHT }}>{plant.room.name}</Bold> has no sensors. Don't
              forget to add sensors to the room!
            </Text>
          </View>
        )}
      </View>
      <View style={{ ...styles.bottom }}>
        <Image style={styles.image} imageUrl={plant.imageUrl} />
        <View>
          <View style={styles.warning}>
            <View style={styles.divider} />
            <Text style={styles.warningText}>The soil is too dry for this plant!</Text>
          </View>
          <View style={styles.iconLabels}>
            <IconLabel
              big
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
              label={formatAge(plant.plantedDate)!}
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
            hasNotification={hasNotification}
            onPress={() =>
              navigation.navigate('HomeNavigator', {
                screen: 'NotificationsScreen',
                params: {
                  plant,
                  hasNotification,
                },
              })
            }
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
    left: -80,
    height: 420,
    width: 340,
  },
  emptyWrapper: {
    flexDirection: 'row',
    width: 160,
    marginBottom: PADDING.SMALL,
    alignItems: 'center',
  },
  empty: {
    ...FONT_STYLES.text,
    color: COLORS.LIGHT,
    fontSize: 18,
    width: 160,
    textAlign: 'right',
  },
});
