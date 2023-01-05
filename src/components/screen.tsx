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
  contentStyle?: object;
  contentContainerStyle?: object;
  editable?: boolean;
  editRoute?: string;
  editParams?: object;
  withBottomPadFix?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  iconName?: string;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  title,
  subTitle,
  contentStyle = {},
  contentContainerStyle = {},
  editable = false,
  editRoute = 'HomeNavigator',
  editParams,
  withBottomPadFix = true,
  onPress,
  iconName,
}) => {
  const navigation = useNavigation();
  const setStatusBarStyle = useContext(StatusBarContext);
  useFocusEffect(() => setStatusBarStyle(StatusBarStyles[1]));

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ ...styles.wrapper }}
      style={{ ...styles.wrapper }}
      scrollEnabled={true}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <View style={{ ...styles.top }}>
        <NavHeader onPress={onPress} subLabel={subTitle}>
          {title}
        </NavHeader>
        {iconName && (
          <TouchableOpacity onPress={() => navigation.navigate(editRoute, editParams)}>
            <UiIcon name={iconName} color={COLORS.MAIN_DARK} size={30} />
          </TouchableOpacity>
        )}
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
    paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0) / 4, // TODO: fix
    flexDirection: 'column',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: PADDING.SMALL / 2,
    paddingRight: PADDING.SMALL,
    paddingVertical: PADDING.BIG,
  },
  content: {
    backgroundColor: COLORS.LIGHT,
    padding: PADDING.SMALL,
    flex: 1,
  },
});
