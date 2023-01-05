import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PlantCard } from './plant-card';

export default {
  title: 'Components/PlantCard',
  component: PlantCard,
} as ComponentMeta<typeof PlantCard>;

const Template: ComponentStory<typeof PlantCard> = (args) => <PlantCard {...args} />;

export const Basic: ComponentStory<typeof PlantCard> = Template.bind({});
Basic.args = {
  plant: {
    room: 'Kitchen',
    roomName: 'Kitchen',
    id: 'plantId',
    plantedDate: new Date('2020-01-10'),
    name: 'Tomato',
    image: 'plant01',
    specification: {
      temperature: { start: 23, end: 29 },
      humidity: { start: 23, end: 29 },
      soil: { start: 23, end: 29 },
      brightness: { start: 23, end: 29 },
    },
  },
};
