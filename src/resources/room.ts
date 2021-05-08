import { Resource } from '@rest-hooks/rest';

import { Avatar, Plant, Room, Sensor } from '../types';

export default class RoomResource extends Resource {
  readonly id: string = '';
  readonly name: string = '';
  readonly sensors: Sensor[] = [];
  readonly plants: Plant[] = [];
  readonly avatar: Avatar = Avatar.bedroom;

  pk() {
    return this.id;
  }

  static urlRoot = `http://192.168.0.91:1337/room`;

  static async fetch(input: RequestInfo, init: RequestInit) {
    const jsonResponse = await super.fetch(input, init);

    return jsonResponse.map((room: Room) => ({
      ...room,
      plants: room.plants.map((plant) => ({ ...plant, plantedDate: new Date(plant.plantedDate) })),
    }));
  }
}
