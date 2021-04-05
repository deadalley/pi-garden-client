import React from 'react';

import { Bold } from '../../components/typography';
import { Plant, PlantSpecification, Room, SensorName, SensorType } from '../../types';

export const renderSensors = (room: Room) =>
  room.sensors.map(({ name }, index) => (
    <>
      <Bold>{name}</Bold>
      {index === room.sensors.length - 2 ? ' and ' : index < room.sensors.length - 1 ? ', ' : ''}
    </>
  ));
