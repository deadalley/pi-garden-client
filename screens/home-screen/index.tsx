import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, FONT_STYLES, PADDING } from '../../styles';
import { NavHeader } from '../../components/nav-header';

export interface SectionProps {
  title: string;
  color?: string;
}

const HomeScreenLayout: React.FC = ({ children }) => (
  <View style={{ ...styles.wrapper }}>
    <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0.8, y: 0.2 }}
        colors={['#1E4951', '#2C6975']}
        style={styles.top}
      />
    <Text style={styles.header}>PiGarden</Text>
    <View style={styles.content}>
      {children}
    </View>
  </View>
)

const Section: React.FC<SectionProps> = ({ title, color }) => (
  <View>
    <NavHeader position='right' color={color}>{title}</NavHeader>
  </View>
)

export const HomeScreen: React.FC = () => (
  <HomeScreenLayout>
    <Section title='My Garden' color={COLORS.LIGHT}></Section>
    <Section title='Rooms' color={COLORS.MAIN_DARKER}></Section>
  </HomeScreenLayout>
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.LIGHT,
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
  content: {
    height: '100%',
    paddingHorizontal: PADDING.BIGGER,
  }
})