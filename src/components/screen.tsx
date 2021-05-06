import React, { useContext } from 'react';
import {
  GestureResponderEvent,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { COLORS, HEADER_HEIGHT, PADDING, UiIcon } from '../styles';
import { NavHeader } from './nav-header';
import { StatusBarContext, StatusBarStyles } from './status-bar';

export interface ScreenProps {
  title: string;
  subTitle?: string;
  green?: boolean;
  contentStyle?: object;
  contentContainerStyle?: object;
  editable?: boolean;
  editRoute?: string;
  editParams?: object;
  withBottomPadFix?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  title,
  subTitle,
  green,
  contentStyle = {},
  contentContainerStyle = {},
  editable = false,
  editRoute = 'HomeNavigator',
  editParams,
  withBottomPadFix = true,
  onPress,
}) => {
  const navigation = useNavigation();
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
        <NavHeader
          {...(green ? { color: COLORS.LIGHT } : {})}
          onPress={onPress}
          subLabel={subTitle}
        >
          {title}
        </NavHeader>
        {editable && (
          <TouchableOpacity onPress={() => navigation.navigate(editRoute, editParams)}>
            <UiIcon name={'fi-rr-edit'} color={COLORS.LIGHT} size={24} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{
          ...contentContainerStyle,
          ...(withBottomPadFix ? { paddingBottom: PADDING.SMALL * 2 } : {}),
        }}
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
    padding: PADDING.SMALL,
    flex: 1,
  },
  green: {
    backgroundColor: COLORS.MAIN_DARK,
  },
});
