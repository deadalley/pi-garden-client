import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { COLORS } from '../styles';
import { NavHeader } from './nav-header';

export interface ScreenProps {
  title: string;
  green?: boolean,
}

export const Screen: React.FC<ScreenProps> = ({ children, title, green }) => (
  <View style={{ ...styles.wrapper, ...(green? styles.green : {}) }}>
    <View style={{...styles.top, ...(green? styles.green : {}) }}>
      <NavHeader white={green}>{title}</NavHeader>
    </View>
    <View style={styles.content}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.LIGHT,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: 'column',
  },
  green: {
    backgroundColor: COLORS.MAIN_MEDIUM
  },
  top: {
    height: 160,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: COLORS.LIGHT,
    height: '100%',
    paddingHorizontal: 20,
  }
})