import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useStatefulResource } from '@rest-hooks/legacy';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { NavHeader } from '../../components/nav-header';
import { StatusBarContext, StatusBarStyles } from '../../components/status-bar';
import { Plants } from './plants';
import { Rooms } from './room';

import { COLORS, FONT_STYLES, PADDING, UiIcon } from '../../styles';
import { PlantResource, RoomResource } from '../../resources';
import { SocketService } from '../../services/socket.service';
import { useAppDispatch } from '../../store.hooks';
import { setRoomLastReadings } from '../../redux/room.slice';
import { ExtendedPlant, LastReadings } from '../../types';
import mocks from '../../mocks';
import _ from 'lodash';
import images from '../../images';

export interface SectionProps {
  title: string;
  color?: string;
  navScreen: string;
  navParams: object;
}

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const setStatusBarStyle = useContext(StatusBarContext);
  useFocusEffect(() => setStatusBarStyle(StatusBarStyles[2]));

  const { data: plants } = useStatefulResource(PlantResource.list(), {});
  const { data: rooms, loading } = useStatefulResource(RoomResource.list(), {});

  const [finishedFirstLoad, setFinishedFirstLoad] = useState(false);

  useEffect(() => {
    if (rooms && !loading) setFinishedFirstLoad(true);
  }, [rooms]);

  useEffect(() => {
    if (!finishedFirstLoad) return;

    SocketService.initialize();
    SocketService.connect().then(() => {
      SocketService.get(`/room/${rooms?.[0]?.id}/reading/subscribe`, (data: any) => {
        dispatch(setRoomLastReadings(data));
      });
      SocketService.on('sensor', (data: LastReadings) => {
        dispatch(setRoomLastReadings(data));
      });
    });
  }, [finishedFirstLoad]);

  const extendedPlants = useMemo(() => {
    if (!plants) return [];
    const roomIndex = _.keyBy(rooms, 'id');
    return plants?.map((p) => ({
      ...p,
      image: p.image as keyof typeof images.plants,
      roomName: roomIndex[p.room as keyof typeof roomIndex]?.name || '',
    }));
  }, [plants, rooms]);

  return (
    <View style={{ ...styles.wrapper }}>
      <View style={styles.top}>
        <UiIcon name="fi-rr-portrait" color={COLORS.MAIN_DARK} size={30} />
        <UiIcon name="fi-rr-bell" color={COLORS.MAIN_DARK} size={30} />
      </View>
      <Text style={styles.header}>PiGarden</Text>
      <View>
        <Plants plants={extendedPlants} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.BACKGROUND,
    height: '100%',
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! : 0,
    paddingHorizontal: PADDING.MEDIUM,
  },
  header: {
    ...FONT_STYLES.h1,
    color: COLORS.MAIN_DARK,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: PADDING.MEDIUM,
  },
});
