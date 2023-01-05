import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Spinner } from './spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Basic: ComponentStory<typeof Spinner> = Template.bind({});
Basic.args = {};
