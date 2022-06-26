import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './screens/home-screen';
import { StatisticsScreen } from './screens/statistics-screen';
import { NotificationsScreen } from './screens/notifications-screen';
import { AddPlantScreen } from './screens/add-plant-screen';
import { AddRoomScreen } from './screens/add-room-screen';
import { PlantScreen } from './screens/plant-screen';
import { RoomScreen } from './screens/room-screen';
import { SensorScreen } from './screens/sensor-screen';
import { GardenScreen } from './screens/garden-screen';
import { RoomsScreen } from './screens/rooms-screen';
import { PlantStatisticsScreen } from './screens/plant-statistics-screen';
import { PlantSettingsScreen } from './screens/plant-settings-screen';
import { RoomSettingsScreen } from './screens/room-settings-screen';

import { TabBar } from './components/tab-bar';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeNavigator = () => (
  <HomeStack.Navigator initialRouteName="Home" headerMode="none">
    <HomeStack.Screen name="GardenScreen" component={GardenScreen} />
    <HomeStack.Screen name="RoomsScreen" component={RoomsScreen} />
    <HomeStack.Screen name="PlantScreen" component={PlantScreen} />
    <HomeStack.Screen name="RoomScreen" component={RoomScreen} />
    <HomeStack.Screen name="SensorScreen" component={SensorScreen} />
    <HomeStack.Screen name="NotificationsScreen" component={NotificationsScreen} />
    <HomeStack.Screen name="PlantStatisticsScreen" component={PlantStatisticsScreen} />
    <HomeStack.Screen name="PlantSettingsScreen" component={PlantSettingsScreen} />
    <HomeStack.Screen name="RoomSettingsScreen" component={RoomSettingsScreen} />
  </HomeStack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator tabBar={TabBar}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Garden" component={GardenScreen} />
    <Tab.Screen name="AddButton" component={HomeScreen} />
    <Tab.Screen name="Rooms" component={RoomsScreen} />
    <Tab.Screen name="Stats" component={StatisticsScreen} />
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
