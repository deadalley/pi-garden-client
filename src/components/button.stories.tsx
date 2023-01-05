import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './button';
import { View } from 'react-native';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <View style={{ width: 300 }}>
    <Button {...args}>Click Me!</Button>
  </View>
);

export const Basic: ComponentStory<typeof Button> = Template.bind({});
Basic.args = {
  inline: false,
  small: false,
  dark: false,
  inverted: false,
};
