import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DateInput } from './date-input';

export default {
  title: 'Components/DateInput',
  component: DateInput,
} as ComponentMeta<typeof DateInput>;

const Template: ComponentStory<typeof DateInput> = (args) => <DateInput {...args} />;

export const Basic: ComponentStory<typeof DateInput> = Template.bind({});
Basic.args = {};
