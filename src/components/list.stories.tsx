import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { List } from './list';
import images from '../images';

export default {
  title: 'Components/List',
  component: List,
} as ComponentMeta<typeof List>;

const items = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }, { label: 'Item 4' }];

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

export const Basic: ComponentStory<typeof List> = Template.bind({});
Basic.args = {
  title: 'A List',
  items,
};

export const Icons: ComponentStory<typeof List> = Template.bind({});
Icons.args = {
  title: 'A List',
  items: items.map((item) => ({ ...item, iconType: 'ui', iconName: 'fi-sr-zoom-out' })),
};

export const Images: ComponentStory<typeof List> = Template.bind({});
Images.args = {
  title: 'A List',
  items: items.map((item) => ({ ...item, imageSet: 'rooms', image: images.rooms.bedroom01 })),
};
