import React from 'react';

import { Bold } from '../../components/typography';
import { Room, SensorName } from '../../types';

export const renderSensors = (room: Room) =>
  room.sensors.map(({ type }, index) => (
    <>
      <Bold>{SensorName[type]}</Bold>
      {index === room.sensors.length - 2 ? ' and ' : index < room.sensors.length - 1 ? ', ' : ''}
    </>
  ));
