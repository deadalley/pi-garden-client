import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PlantCard } from './plant-card';
import images from '../images';

const Navigator = createStackNavigator();

export default {
  title: 'Components/PlantCard',
  component: PlantCard,
  decorators: [
    (Story) => (
      <Navigator.Navigator initialRouteName="Test" headerMode="none">
        <Navigator.Screen name="Test" component={Story} />
      </Navigator.Navigator>
    ),
  ],
} as ComponentMeta<typeof PlantCard>;

const Template: ComponentStory<typeof PlantCard> = (args) => (
  <View style={{ position: 'relative' }}>
    <PlantCard {...args} />
  </View>
);

export const Basic: ComponentStory<typeof PlantCard> = Template.bind({});
Basic.args = {
  plant: {
    room: 'Kitchen',
    roomName: 'Kitchen',
    id: 'plantId',
    plantedDate: new Date('2020-01-10'),
    name: 'plant',
    image: images.rooms.bedroom01,
    specification: {
      temperature: { start: 23, end: 29 },
      humidity: { start: 23, end: 29 },
      soil: { start: 23, end: 29 },
      brightness: { start: 23, end: 29 },
    },
  },
};
