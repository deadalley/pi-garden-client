import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Screen } from './screen';

const Navigator = createStackNavigator();

export default {
  title: 'Components/Screen',
  component: Screen,
  decorators: [
    (Story) => (
      <Navigator.Navigator initialRouteName="Test" headerMode="none">
        <Navigator.Screen name="Test" component={Story} />
      </Navigator.Navigator>
    ),
  ],
} as ComponentMeta<typeof Screen>;

const Template: ComponentStory<typeof Screen> = (args) => <Screen {...args} />;

export const Basic: ComponentStory<typeof Screen> = Template.bind({});
Basic.args = {
  title: 'Screen',
  subTitle: 'subtitle',
  editable: false,
};
