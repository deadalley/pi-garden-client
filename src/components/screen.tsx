import React, { useContext } from 'react';
import {
  GestureResponderEvent,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { COLORS, PADDING } from '../styles';
import { NavHeader } from './nav-header';
import { StatusBarContext, StatusBarStyles } from './status-bar';

export interface ScreenProps {
  title: string;
  green?: boolean;
  contentStyle?: object;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  title,
  green,
  contentStyle = {},
  onPress,
}) => {
  const setStatusBarStyle = useContext(StatusBarContext);
  useFocusEffect(() => setStatusBarStyle(StatusBarStyles[1]));

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ ...styles.wrapper, ...(green ? styles.green : {}) }}
      style={{ ...styles.wrapper, ...(green ? styles.green : {}) }}
      scrollEnabled
      enableOnAndroid
      enableAutomaticScroll
    >
      <View style={{ ...styles.top, ...(green ? styles.green : {}) }}>
        <NavHeader {...(green ? { color: COLORS.LIGHT } : {})} onPress={onPress}>
          {title}
        </NavHeader>
      </View>
      <ScrollView style={{ ...styles.content, ...(contentStyle ?? {}) }}>{children}</ScrollView>
    </KeyboardAwareScrollView>
  );
};

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
