import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SensorIcon } from './sensor-icon';

export default {
  title: 'Components/SensorIcon',
  component: SensorIcon,
} as ComponentMeta<typeof SensorIcon>;

const Template: ComponentStory<typeof SensorIcon> = (args) => <SensorIcon {...args} />;

export const Basic: ComponentStory<typeof SensorIcon> = Template.bind({});
Basic.args = {
  value: '32',
  iconName: 'fi-rr-add',
};
