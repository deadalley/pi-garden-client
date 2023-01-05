import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RoomCard } from './room-card';
import images from '../images';
import { Avatar } from '../types';

const Navigator = createStackNavigator();

export default {
  title: 'Components/RoomCard',
  component: RoomCard,
  decorators: [
    (Story) => (
      <Navigator.Navigator initialRouteName="Test" headerMode="none">
        <Navigator.Screen name="Test" component={Story} />
      </Navigator.Navigator>
    ),
  ],
} as ComponentMeta<typeof RoomCard>;

const Template: ComponentStory<typeof RoomCard> = (args) => (
  <View style={{ position: 'relative' }}>
    <RoomCard {...args} />
  </View>
);

export const Basic: ComponentStory<typeof RoomCard> = Template.bind({});
Basic.args = {
  room: {
    id: 'roomId',
    name: 'Kitchen',
    image: images.rooms.balcony,
    sensors: [],
    plants: [],
    avatar: Avatar.bedroom,
  },
};
