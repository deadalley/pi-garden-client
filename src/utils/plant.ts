import { PartialPlantSpecification, Plant, PlantSpecification } from '../types';

export const unparseSpecification = (specification: PlantSpecification) =>
  Object.keys(specification).reduce((acc, key) => {
    return {
      ...acc,
      [`${key}Start`]: specification[key as keyof typeof specification].start,
      [`${key}End`]: specification[key as keyof typeof specification].end,
    };
  }, {});

export const parseSpecification = (specification: object): PartialPlantSpecification =>
  Object.keys(specification ?? {}).reduce(
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
            [value]: specification[key as keyof typeof specification],
          },
        };
      }

      return acc;
    },

    {} as PartialPlantSpecification
  );

export const parsePlant = (plant: Omit<Plant, 'specification'> & { specification: any[] }) => ({
  ...plant,
  plantedDate: new Date(plant.plantedDate),
  specification: parseSpecification(plant.specification),
});
