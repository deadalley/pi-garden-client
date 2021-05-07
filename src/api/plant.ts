import { Plant } from '../types';
import { fetch } from './fetch';

export const getPlants = (): Promise<{ plants: Plant[] }> =>
  fetch('GET', 'plant').then(({ data }) => ({
    plants: data.map((plant: Plant) => ({
      ...plant,
      plantedDate: new Date(plant.plantedDate),
    })),
  }));
