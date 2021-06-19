import { Resource } from '@rest-hooks/rest';

import { Room, Sensor, SensorType } from '../types';

interface ExpandedSensor extends Sensor {
  room: Room['id'];
}

export default class ReadingResource extends Resource {
  readonly id: string = '';
  readonly value: number = 0;
  readonly sensor: ExpandedSensor = {} as ExpandedSensor;

  pk() {
    return this.id;
  }

  static urlRoot = `http://192.168.0.91:1337/reading`;

  static async fetch(input: RequestInfo, init: RequestInit) {
    const jsonResponse = await super.fetch(input, init);

    return Array.isArray(jsonResponse)
      ? jsonResponse.map((reading: any) => ({
          ...reading,
          createdAt: new Date(reading.createdAt),
          updatedAt: new Date(reading.updatedAt),
        }))
      : Object.keys(jsonResponse).reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              ...jsonResponse[key],
              createdAt: new Date(jsonResponse[key].createdAt),
              updatedAt: new Date(jsonResponse[key].updatedAt),
            },
          }),
          {}
        );
  }

  static last<T extends typeof Resource>(this: T) {
    const endpoint = this.detail();
    return endpoint.extend({
      url({ id }: { id: string }) {
        return `http://192.168.0.91:1337/room/${id}/reading/last`;
      },
      fetch({ id }: { id: string }) {
        return endpoint.fetch.call(this as any, { id });
      },
      schema: {
        [SensorType.brightness]: this,
        [SensorType.humidity]: this,
        [SensorType.soil]: this,
        [SensorType.temperature]: this,
      },
    });
  }
}
