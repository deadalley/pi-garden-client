import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BORDER_RADIUS, COLORS, PADDING, UiIcon, FurnitureIcon, PlantIcon } from '../styles';
import { AddButton } from './add-button';

const TAB_ICONS = {
  Home: 'fi-rr-home',
  Plants: 'botanic',
  Rooms: 'bed',
  Stats: 'fi-rr-stats',
};

export interface TabBarProps extends BottomTabBarProps<BottomTabBarOptions> {}

export const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  if (state.index > 0) return null;

  return (
    <View style={styles.wrapper}>
      <AddButton />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, params: route.params });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        if (route.key.includes('Add')) {
          return <View style={styles.item}></View>;
        }

        let iconSize = 28;
        let iconName = '';
        let Icon = UiIcon;
        switch (route.name) {
          case 'Home':
            iconName = 'fi-rr-home';
            break;
          case 'Rooms':
            iconName = 'bed1';
            Icon = FurnitureIcon;
            iconSize = 42;
            break;
          case 'Garden':
            iconName = 'botanic';
            Icon = PlantIcon;
            iconSize = 38;
            break;
          case 'Stats':
            iconName = 'fi-rr-stats';
            break;
          default:
            break;
        }

        return (
          <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
            <View
              key={route.key}
              style={{
                ...styles.item,
                ...(isFocused
                  ? {
                      backgroundColor: COLORS.MAIN_LIGHT,
                    }
                  : {}),
              }}
            >
              <Icon name={iconName} size={iconSize} color={COLORS.MAIN_DARK} />
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING.MEDIUM,
    bottom: 0,
    position: 'absolute',
    height: 80,
    width: '100%',
    backgroundColor: COLORS.LIGHT,
    borderTopLeftRadius: 3 * BORDER_RADIUS,
    borderTopRightRadius: 3 * BORDER_RADIUS,
    borderColor: COLORS.HALF_LIGHT,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  item: {
    borderRadius: 360,
    padding: 12,
  },
});
