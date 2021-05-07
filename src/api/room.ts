import { Room } from '../types';
import { fetch } from './fetch';

export const getRooms = (): Promise<{ rooms: Room[] }> =>
  fetch('GET', 'room').then(({ data }) => ({
    rooms: data.map((room: Room) => ({
      ...room,
      plants: room.plants.map((plant) => ({ ...plant, plantedDate: new Date(plant.plantedDate) })),
    })),
  }));
