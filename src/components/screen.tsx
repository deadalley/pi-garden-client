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

import { COLORS, HEADER_HEIGHT, PADDING, UiIcon } from '../styles';
import { NavHeader } from './nav-header';
import { StatusBarContext, StatusBarStyles } from './status-bar';

export interface ScreenProps {
  title: string;
  green?: boolean;
  contentStyle?: object;
  editable?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  title,
  green,
  contentStyle = {},
  editable = false,
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
        {editable && <UiIcon name={'fi-rr-edit'} color={COLORS.LIGHT} size={24} />}
      </View>
      <ScrollView
        style={{
          ...styles.content,
          ...contentStyle,
        }}
      >
        {children}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.LIGHT,
    paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0) / 2, // TODO: fix
    flexDirection: 'column',
  },
  top: {
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: PADDING.SMALL,
    paddingRight: PADDING.BIG + 12, // TODO: fix
  },
  content: {
    backgroundColor: COLORS.LIGHT,
    flex: 1,
    padding: PADDING.BIG,
  },
  green: {
    backgroundColor: COLORS.MAIN_DARK,
  },
});
