import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './button';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Click Me!</Button>;

export const Basic: ComponentStory<typeof Button> = Template.bind({});
Basic.args = {
  inline: false,
  small: false,
  dark: false,
  inverted: false,
};
