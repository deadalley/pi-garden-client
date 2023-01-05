import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Navigation } from './navigation';

export default {
  title: 'Components/Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => (
  <View style={{ position: 'relative', width: 400 }}>
    <Navigation {...args} />
  </View>
);

export const Basic: ComponentStory<typeof Navigation> = Template.bind({});
Basic.args = {
  currentIndex: 0,
  finishLabel: 'Finish',
  hasPrevious: true,
  hasNext: true,
  canNext: true,
  isLast: false,
  skip: false,
};
