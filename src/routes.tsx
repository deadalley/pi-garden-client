import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from './screens/home-screen';
import { StatisticsScreen } from './screens/statistics-screen';
import { NotificationsScreen } from './screens/notifications-screen';
import { SettingsScreen } from './screens/settings-screen';
import { COLORS, UiIcon } from './styles';
import { AddButton } from './components/add-button';

const TAB_ICONS = {
  Home: 'fi-rr-home',
  Stats: 'fi-rr-stats',
  Notfications: 'fi-rr-bell',
  Settings: 'fi-rr-settings-sliders',
};

const Tab = createBottomTabNavigator();

const TabBar = ({ state, descriptors, navigation }: any) => (
  <View style={{ flexDirection: 'row' }}>
    {state.routes.map((route: any, index: number) => {
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
          navigation.navigate(route.name);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={{ flex: 1 }}
        >
          <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>{label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <View
            style={{
              ...(focused
                ? { padding: 12, borderRadius: 360, backgroundColor: COLORS.MAIN_LIGHTER }
                : {}),
            }}
          >
            <UiIcon
              name={TAB_ICONS[route.name as keyof typeof TAB_ICONS]}
              size={28}
              color={color}
            />
          </View>
        ),
      })}
      tabBarOptions={{
        activeTintColor: COLORS.MAIN_DARK,
        inactiveTintColor: COLORS.MAIN_DARK,
        showLabel: false,
        style: { height: 68 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stats" component={StatisticsScreen} />
      <Tab.Screen
        name="Add"
        options={{ tabBarButton: () => <AddButton /> }}
        component={HomeScreen}
      />
      <Tab.Screen name="Notfications" component={NotificationsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
