import React from 'react';
import { GestureResponderEvent, Platform, StatusBar, StyleSheet, View } from 'react-native';

import { COLORS, PADDING } from '../styles';
import { NavHeader } from './nav-header';

export interface ScreenProps {
  title: string;
  green?: boolean;
  contentStyle: object;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  title,
  green,
  contentStyle,
  onPress,
}) => (
  <View style={{ ...styles.wrapper, ...(green ? styles.green : {}) }}>
    <View style={{ ...styles.top, ...(green ? styles.green : {}) }}>
      <NavHeader {...(green ? { color: COLORS.LIGHT } : {})} onPress={onPress}>
        {title}
      </NavHeader>
    </View>
    <View style={{ ...styles.content, ...(contentStyle ?? {}) }}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.LIGHT,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flexDirection: 'column',
  },
  green: {
    backgroundColor: COLORS.MAIN_MEDIUM,
  },
  top: {
    height: 160,
    justifyContent: 'center',
    paddingHorizontal: PADDING.SMALL,
  },
  content: {
    backgroundColor: COLORS.LIGHT,
    flex: 1,
    paddingHorizontal: PADDING.BIG,
  },
});
