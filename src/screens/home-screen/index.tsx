import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { NavHeader } from '../../components/nav-header';
import { Plants } from './plants';
import { COLORS, FONT_STYLES, PADDING } from '../../styles';
import { Plant, Mood, Avatar, SensorType, SensorStatus } from '../../types';
import { Rooms } from './room';

export interface SectionProps {
  title: string;
  color?: string;
}

const ROOM_MOCK_1 = {
  id: '546B',
  name: 'Bedroom',
  avatar: Avatar.bedroom,
  sensors: [
    {
      type: SensorType.temperature,
      status: SensorStatus.online,
    },
    {
      type: SensorType.brightness,
      status: SensorStatus.warnings,
    },
    {
      type: SensorType.soil,
      status: SensorStatus.offline,
    },
    {
      type: SensorType.humidity,
      status: SensorStatus.online,
    },
  ],
};

const ROOM_MOCK_2 = {
  id: '5463B',
  name: 'Kitchen',
  avatar: Avatar.kitchen,
  sensors: [
    {
      type: SensorType.temperature,
      status: SensorStatus.offline,
    },
    {
      type: SensorType.humidity,
      status: SensorStatus.online,
    },
  ],
};

const PLANT_MOCK: Plant = {
  id: '123',
  name: 'Strawberry',
  mood: Mood.happy,
  room: ROOM_MOCK_1,
};

const HomeScreenLayout: React.FC = ({ children }) => (
  <View style={{ ...styles.wrapper }}>
    <LinearGradient
      style={styles.background}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={[COLORS.HALF_LIGHT, COLORS.LIGHT]}
    />
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 0.8, y: 0.2 }}
      colors={['#1E4951', '#2C6975']}
      style={styles.top}
    />
    <Text style={styles.header}>PiGarden</Text>
    <View style={styles.content}>{children}</View>
  </View>
);

const Section: React.FC<SectionProps> = ({ title, color, children }) => (
  <View>
    <NavHeader
      position="right"
      color={color}
      style={{ paddingRight: PADDING.BIGGER, paddingLeft: PADDING.SMALL }}
    >
      {title}
    </NavHeader>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

export const HomeScreen: React.FC = () => (
  <HomeScreenLayout>
    <Section title="My Garden" color={COLORS.LIGHT}>
      <Plants plants={[PLANT_MOCK, PLANT_MOCK, PLANT_MOCK, PLANT_MOCK, PLANT_MOCK]} />
    </Section>
    <Section title="Rooms" color={COLORS.MAIN_DARKER}>
      <Rooms rooms={[ROOM_MOCK_1, ROOM_MOCK_2, ROOM_MOCK_1, ROOM_MOCK_2]} />
    </Section>
  </HomeScreenLayout>
);

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    ...FONT_STYLES.h1,
    color: COLORS.MAIN_DARKER,
    backgroundColor: COLORS.HALF_LIGHT,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 15,
    paddingLeft: PADDING.BIGGER,
    paddingRight: PADDING.SMALL,
    width: 260,
    marginVertical: PADDING.BIGGER,
    height: 42,
    lineHeight: 46,
  },
  top: {
    height: 310,
    justifyContent: 'center',
    paddingHorizontal: PADDING.SMALL,
    position: 'absolute',
    width: '100%',
  },
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  sectionContent: {
    paddingVertical: PADDING.SMALLER,
  },
  content: {
    height: '100%',
  },
});
