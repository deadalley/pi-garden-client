import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Switch } from './switch';

export default {
  title: 'Components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Basic: ComponentStory<typeof Switch> = Template.bind({});
Basic.args = {
  enabled: true,
};
