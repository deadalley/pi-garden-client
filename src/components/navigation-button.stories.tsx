import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NavigationButton } from './navigation-button';

export default {
  title: 'Components/NavigationButton',
  component: NavigationButton,
} as ComponentMeta<typeof NavigationButton>;

const Template: ComponentStory<typeof NavigationButton> = (args) => (
  <NavigationButton {...args}>Click Me!</NavigationButton>
);

export const Basic: ComponentStory<typeof NavigationButton> = Template.bind({});
Basic.args = {
  position: 'left',
  disabled: false,
};
