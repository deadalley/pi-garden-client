import { useStatefulResource } from '@rest-hooks/legacy';
import _ from 'lodash';
import { useMemo } from 'react';
import images from '../images';
import { PlantResource, RoomResource } from '../resources';
import { ExtendedPlant } from '../types';

export function useGetPlants() {
  const { data: plants, loading: loadingPlants } = useStatefulResource(PlantResource.list(), {});
  const { data: rooms, loading } = useStatefulResource(RoomResource.list(), {});

  const extendedPlants: ExtendedPlant[] = useMemo(() => {
    if (!plants) return [];
    const roomIndex = _.keyBy(rooms, 'id');
    return plants?.map((p) => ({
      ...p,
      image: p.image as keyof typeof images.plants,
      roomName: roomIndex[p.room as keyof typeof roomIndex]?.name || '',
    }));
  }, [plants, rooms]);

  return { loading: loading || loadingPlants, data: extendedPlants };
}
