import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconLabel } from './icon-label';

export default {
  title: 'Components/IconLabel',
  component: IconLabel,
} as ComponentMeta<typeof IconLabel>;

const Template: ComponentStory<typeof IconLabel> = (args) => <IconLabel {...args} />;

export const Basic: ComponentStory<typeof IconLabel> = Template.bind({});
Basic.args = {
  label: 'Click Me!',
  iconName: 'fi-rr-add',
  iconType: 'ui',
};
