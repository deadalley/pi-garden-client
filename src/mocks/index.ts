import { Plant, Room } from '../types';
import plants from './plants.json';
import rooms from './rooms.json';

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

const mocks = ({ plants, rooms, commonPlantTypes } as unknown) as {
  plants: Plant[];
  rooms: Room[];
  commonPlantTypes: string[];
};
export default mocks;
