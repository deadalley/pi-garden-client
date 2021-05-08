import { Plant, PlantSpecification } from '../types';
import { fetch } from './fetch';

export const getPlants = (): Promise<{ plants: Plant[] }> =>
  fetch('GET', 'plant').then(({ data }) => ({
    plants: data.map((plant: any) => ({
      ...plant,
      plantedDate: new Date(plant.plantedDate),
      specification: Object.keys(plant.specification?.[0] ?? {}).reduce(
        (acc, key) => {
          let keyName;
          let value;

          if (key.endsWith('Start')) {
            keyName = key.substr(0, key.length - 5);
            value = 'start';
          } else if (key.endsWith('End')) {
            keyName = key.substr(0, key.length - 3);
            value = 'end';
          }

          if (keyName && value) {
            return {
              ...acc,
              [keyName]: {
                ...(acc[keyName as keyof typeof acc] ?? {}),
                [value]: plant.specification[0][key],
              },
            };
          }

          return acc;
        },

        {} as { [key: string]: object }
      ),
    })),
  }));

export const createPlant = (
  plant: Pick<Plant, 'plantedDate' | 'name' | 'imageUrl'> & {
    room: string;
    specification: { [key in keyof PlantSpecification]: { start: number; end: number } };
  }
): Promise<{ plant: Plant }> =>
  fetch('POST', 'plant', plant).then(({ data }) => {
    return { plant: { ...data, plantedDate: new Date(data.plantedDate) } };
  });
