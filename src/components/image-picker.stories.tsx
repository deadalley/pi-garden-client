import React, { useState } from 'react';
import { ImageURISource } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ImagePicker } from './image-picker';

export default {
  title: 'Components/ImagePicker',
  component: ImagePicker,
} as ComponentMeta<typeof ImagePicker>;

const Template: ComponentStory<typeof ImagePicker> = (args) => {
  const [image, setImage] = useState<ImageURISource | ImageURISource[] | number | undefined>();

  return <ImagePicker {...args} image={image} onImagePicked={(image) => setImage(image)} />;
};

export const Rooms: ComponentStory<typeof ImagePicker> = Template.bind({});
Rooms.args = {
  imageSet: 'rooms',
};

export const Plants: ComponentStory<typeof ImagePicker> = Template.bind({});
Plants.args = {
  imageSet: 'plants',
};
