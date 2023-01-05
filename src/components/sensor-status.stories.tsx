import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SensorStatus } from './sensor-status';
import { SensorType, SensorStatus as SensorStatusEnum } from '../types';

export default {
  title: 'Components/SensorStatus',
  component: SensorStatus,
} as ComponentMeta<typeof SensorStatus>;

const Template: ComponentStory<typeof SensorStatus> = (args) => <SensorStatus {...args} />;

export const Basic: ComponentStory<typeof SensorStatus> = Template.bind({});
Basic.args = {
  sensor: {
    id: 'sensorId',
    type: SensorType.temperature,
    status: SensorStatusEnum.online,
    unit: 'K',
  },
};
