import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Image } from './image';
import images from '../images';

export default {
  title: 'Components/Image',
  component: Image,
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Basic: ComponentStory<typeof Image> = Template.bind({});
Basic.args = {
  image: images.rooms.balcony,
  style: {
    flex: 1,
    resizeMode: 'cover',
    width: '200px',
    height: '200px',
  },
};
