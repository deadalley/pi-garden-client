import { Resource } from '@rest-hooks/rest';

import mocks from '../mocks';
import { Plant, PlantSpecification, Room } from '../types';
import { parsePlant, unparseSpecification } from '../utils/plant';

export default class PlantResource extends Resource {
  readonly id: string = '';
  readonly room: string = '';
  readonly name: string = '';
  readonly plantedDate: Date = new Date();
  readonly specification: PlantSpecification = {} as PlantSpecification;
  readonly image: string = '';

  static schema = {
    plantedDate: Date,
  };

  pk() {
    return this.id;
  }

  static urlRoot = `http://192.168.0.91:1337/plant`;

  static async fetch(input: RequestInfo, init: RequestInit) {
    return mocks.plants;
    // if (init.body) {
    //   const bodyObject: Plant = JSON.parse(init.body as string);
    //   init.body = JSON.stringify({
    //     ...bodyObject,
    //     specification: unparseSpecification(bodyObject.specification),
    //   });
    // }
    // const jsonResponse = await super.fetch(input, init);

    // return Array.isArray(jsonResponse)
    //   ? jsonResponse.map((plant: any) => parsePlant(plant))
    //   : parsePlant(jsonResponse);
  }
}
