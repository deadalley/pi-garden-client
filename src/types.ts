export enum Mood {
  happy = 'happy',
  sad = 'sad',
}

export enum SensorType {
  temperature = 'temperature',
  humidity = 'humidity',
  soil = 'soil',
  brightness = 'brightness',
}

export const SensorTypeIcon = {
  [SensorType.temperature]: 'fi-rr-comment-alt',
  [SensorType.humidity]: 'fi-rr-cloud',
  [SensorType.soil]: 'fi-rr-compress',
  [SensorType.brightness]: 'fi-rr-computer',
};

export enum Avatar {
  bedroom = 'fi-rr-alarm-clock',
}

export interface Sensor {
  type: SensorType;
}

export interface Room {
  id: string;
  name: string;
  sensors: Sensor[];
  avatar: Avatar;
}

export interface Plant {
  id: string;
  room: Room;
  name: string;
  mood: Mood;
}
