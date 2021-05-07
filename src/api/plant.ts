import { Plant } from '../types';
import { fetch } from './fetch';

export const getPlants = (): Promise<{ plants: Plant[] }> =>
  fetch('GET', 'plant').then(({ data }) => ({
    plants: data.map((plant: any) => ({
      ...plant,
      specification: Object.keys(plant.specification[0]).reduce(
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
      plantedDate: new Date(plant.plantedDate),
    })),
  }));
