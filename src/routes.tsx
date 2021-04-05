import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './screens/home-screen';
import { StatisticsScreen } from './screens/statistics-screen';
import { NotificationsScreen } from './screens/notifications-screen';
import { SettingsScreen } from './screens/settings-screen';
import { AddPlantScreen } from './screens/add-plant-screen';
import { PlantScreen } from './screens/plant-screen';
import { RoomScreen } from './screens/room-screen';
import { GardenScreen } from './screens/garden-screen';

import { AddButton } from './components/add-button';

import { COLORS, UiIcon } from './styles';

const TAB_ICONS = {
  Home: 'fi-rr-home',
  Stats: 'fi-rr-stats',
  Notifications: 'fi-rr-bell',
  Settings: 'fi-rr-settings-sliders',
};

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeNavigator = () => (
  <HomeStack.Navigator initialRouteName="Home" headerMode="none">
    <HomeStack.Screen name="GardeScreen" component={GardenScreen} />
    <HomeStack.Screen name="PlantScreen" component={PlantScreen} />
    <HomeStack.Screen name="RoomScreen" component={RoomScreen} />
    <HomeStack.Screen name="NotificationsScreen" component={NotificationsScreen} />
  </HomeStack.Navigator>
);

const TabNavigator = () => (
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
          <UiIcon name={TAB_ICONS[route.name as keyof typeof TAB_ICONS]} size={28} color={color} />
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
      options={{ tabBarButton: (props) => <AddButton {...props} /> }}
      component={HomeScreen}
    />
    <Tab.Screen name="Notifications" component={NotificationsScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

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
    <RootStack.Navigator initialRouteName="Tab" headerMode="none">
      <RootStack.Screen name="Tab" component={TabNavigator} />
      <RootStack.Screen name="HomeNavigator" component={HomeNavigator} />
      <RootStack.Screen name="AddPlant" component={AddPlantScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
