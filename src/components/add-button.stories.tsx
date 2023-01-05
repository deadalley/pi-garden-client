import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AddButton } from './add-button';

export default {
  title: 'Components/AddButton',
  component: AddButton,
} as ComponentMeta<typeof AddButton>;

export const Basic: ComponentStory<typeof AddButton> = (args) => <AddButton {...args} />;
Basic.args = {};
