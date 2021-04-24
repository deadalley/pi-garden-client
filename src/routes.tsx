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
import { AddRoomScreen } from './screens/add-room-screen';
import { PlantScreen } from './screens/plant-screen';
import { RoomScreen } from './screens/room-screen';
import { GardenScreen } from './screens/garden-screen';
import { RoomsScreen } from './screens/rooms-screen';
import { PlantStatisticsScreen } from './screens/plant-statistics-screen';
import { PlantSettingsScreen } from './screens/plant-settings-screen';

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
    <HomeStack.Screen name="GardenScreen" component={GardenScreen} />
    <HomeStack.Screen name="RoomsScreen" component={RoomsScreen} />
    <HomeStack.Screen name="PlantScreen" component={PlantScreen} />
    <HomeStack.Screen name="RoomScreen" component={RoomScreen} />
    <HomeStack.Screen name="NotificationsScreen" component={NotificationsScreen} />
    <HomeStack.Screen name="PlantStatisticsScreen" component={PlantStatisticsScreen} />
    <HomeStack.Screen name="PlantSettingsScreen" component={PlantSettingsScreen} />
  </HomeStack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => (
        <View
          style={{
            ...(route.name === 'Stats' ? { marginRight: 26 } : {}),
            ...(route.name === 'Notifications' ? { marginLeft: 26 } : {}),
            ...(focused
              ? {
                  padding: 12,
                  borderRadius: 360,
                  backgroundColor: COLORS.MAIN_LIGHTER,
                }
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

export default () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="Tab" headerMode="none">
      <RootStack.Screen name="Tab" component={TabNavigator} />
      <RootStack.Screen name="HomeNavigator" component={HomeNavigator} />
      <RootStack.Screen name="AddPlant" component={AddPlantScreen} />
      <RootStack.Screen name="AddRoom" component={AddRoomScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
