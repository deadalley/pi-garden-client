import { Plant, Room } from '../types';
import plants from './plants.json';
import rooms from './rooms.json';

const mocks = ({ plants, rooms } as unknown) as {
  plants: Plant[];
  rooms: Room[];
};
export default mocks;
