import {
  Mood,
  Avatar,
  SensorType,
  SensorStatus,
  SensorName,
  Room,
  PlantExtended,
  Notification,
} from './types';

export const ROOM_MOCK_1: Room = {
  id: '546B',
  name: 'Bedroom',
  avatar: Avatar.bedroom,
  plants: [
    {
      id: '123',
      name: 'Strawberry',
      mood: Mood.happy,
      plantedDate: new Date('2020-01-01T00:00:00Z'),
      specification: {
        temperature: { start: 4, end: 90 },
        humidity: { start: 4, end: 90 },
        soil: { start: 4, end: 90 },
        brightness: { start: 4, end: 90 },
      },
      hasNotification: true,
    },
    {
      id: '123',
      name: 'Strawberry',
      mood: Mood.happy,
      plantedDate: new Date('2020-01-01T00:00:00Z'),
      specification: {
        temperature: { start: 4, end: 90 },
        humidity: { start: 4, end: 90 },
        soil: { start: 4, end: 90 },
        brightness: { start: 4, end: 90 },
      },
      hasNotification: true,
    },
    {
      id: '123',
      name: 'Strawberry',
      mood: Mood.happy,
      plantedDate: new Date('2020-01-01T00:00:00Z'),
      specification: {
        temperature: { start: 4, end: 90 },
        humidity: { start: 4, end: 90 },
        soil: { start: 4, end: 90 },
        brightness: { start: 4, end: 90 },
      },
      hasNotification: true,
    },
    {
      id: '123',
      name: 'Strawberry',
      mood: Mood.happy,
      plantedDate: new Date('2020-01-01T00:00:00Z'),
      specification: {
        temperature: { start: 4, end: 90 },
        humidity: { start: 4, end: 90 },
        soil: { start: 4, end: 90 },
        brightness: { start: 4, end: 90 },
      },
      hasNotification: true,
    },
    {
      id: '123',
      name: 'Strawberry',
      mood: Mood.happy,
      plantedDate: new Date('2020-01-01T00:00:00Z'),
      specification: {
        temperature: { start: 4, end: 90 },
        humidity: { start: 4, end: 90 },
        soil: { start: 4, end: 90 },
        brightness: { start: 4, end: 90 },
      },
      hasNotification: true,
    },
  ],
  sensors: [
    {
      type: SensorType.temperature,
      name: SensorName[SensorType.temperature],
      status: SensorStatus.online,
      unit: '°C',
    },
    {
      type: SensorType.brightness,
      name: SensorName[SensorType.brightness],
      status: SensorStatus.warnings,
      unit: '%',
    },
    {
      type: SensorType.soil,
      name: SensorName[SensorType.soil],
      status: SensorStatus.offline,
      unit: '%',
    },
    {
      type: SensorType.humidity,
      name: SensorName[SensorType.humidity],
      status: SensorStatus.online,
      unit: '%',
    },
  ],
};

export const ROOM_MOCK_2: Room = {
  id: '5463B',
  name: 'Kitchen',
  avatar: Avatar.kitchen,
  plants: [
    {
      id: '123',
      name: 'Strawberry',
      mood: Mood.happy,
      plantedDate: new Date('2020-01-01T00:00:00Z'),
      specification: {
        temperature: { start: 4, end: 90 },
        humidity: { start: 4, end: 90 },
        soil: { start: 4, end: 90 },
        brightness: { start: 4, end: 90 },
      },
      hasNotification: true,
    },
  ],
  sensors: [
    {
      type: SensorType.temperature,
      name: SensorName[SensorType.temperature],
      status: SensorStatus.offline,
      unit: '°C',
    },
    {
      type: SensorType.humidity,
      name: SensorName[SensorType.humidity],
      status: SensorStatus.online,
      unit: '%',
    },
  ],
};

export const PLANT_MOCK: PlantExtended = {
  id: '123',
  name: 'Strawberry',
  mood: Mood.happy,
  room: ROOM_MOCK_1,
  plantedDate: new Date('2020-01-01T00:00:00Z'),
  specification: {
    temperature: { start: 4, end: 90 },
    humidity: { start: 4, end: 90 },
    soil: { start: 4, end: 90 },
    brightness: { start: 4, end: 90 },
  },
  hasNotification: true,
};

export const NOTIFICATION: Notification = {
  timestamp: new Date(),
  plant: PLANT_MOCK,
  text: "I'm cold!",
  sensor: ROOM_MOCK_1.sensors[0],
  value: 4,
};

export const commonPlantTypes = [
  'Strawberry',
  'Potato',
  'Basil',
  'Tomato',
  'Bell Pepper',
  'Pepper',
  'Jalapeño',
  'Lettuce',
  'Rocket',
  'Cactus',
];
