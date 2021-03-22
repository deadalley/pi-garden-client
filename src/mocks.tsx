import { Mood, Avatar, SensorType, SensorStatus, SensorName } from './types';

export const ROOM_MOCK_1 = {
  id: '546B',
  name: 'Bedroom',
  avatar: Avatar.bedroom,
  sensors: [
    {
      type: SensorType.temperature,
      name: SensorName[SensorType.temperature],
      status: SensorStatus.online,
    },
    {
      type: SensorType.brightness,
      name: SensorName[SensorType.brightness],
      status: SensorStatus.warnings,
    },
    {
      type: SensorType.soil,
      name: SensorName[SensorType.soil],
      status: SensorStatus.offline,
    },
    {
      type: SensorType.humidity,
      name: SensorName[SensorType.humidity],
      status: SensorStatus.online,
    },
  ],
};

export const ROOM_MOCK_2 = {
  id: '5463B',
  name: 'Kitchen',
  avatar: Avatar.kitchen,
  sensors: [
    {
      type: SensorType.temperature,
      name: SensorName[SensorType.temperature],
      status: SensorStatus.offline,
    },
    {
      type: SensorType.humidity,
      name: SensorName[SensorType.humidity],
      status: SensorStatus.online,
    },
  ],
};

export const PLANT_MOCK = {
  id: '123',
  name: 'Strawberry',
  mood: Mood.happy,
  room: ROOM_MOCK_1,
  hasNotification: true,
};
