import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NotificationBadge } from './notification-badge';

export default {
  title: 'Components/NotificationBadge',
  component: NotificationBadge,
} as ComponentMeta<typeof NotificationBadge>;

const Template: ComponentStory<typeof NotificationBadge> = (args) => (
  <NotificationBadge {...args} />
);

export const Basic: ComponentStory<typeof NotificationBadge> = Template.bind({});
Basic.args = {};
