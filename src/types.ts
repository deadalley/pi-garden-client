export enum Mood {
  happy = 'happy',
  sad = 'sad',
}

export const MoodIcon = {
  [Mood.happy]: 'happy',
  [Mood.sad]: 'sad',
};

export enum SensorType {
  temperature = 'temperature',
  humidity = 'humidity',
  soil = 'soil',
  brightness = 'brightness',
}

export const SensorTypeIcon = {
  [SensorType.temperature]: 'temperature',
  [SensorType.humidity]: 'light',
  [SensorType.soil]: 'windy-4',
  [SensorType.brightness]: 'sun-1',
};

export enum Avatar {
  bedroom = 'bedside-table',
  kitchen = 'dinning-table',
  garden = 'vase',
}

export enum SensorStatus {
  online = 'online',
  warnings = 'warnings',
  offline = 'offline',
}

export const SensorName = {
  [SensorType.temperature]: 'Temperature',
  [SensorType.humidity]: 'Humidity',
  [SensorType.soil]: 'Soil Moisture',
  [SensorType.brightness]: 'Brightness',
};

export const SensorStatusMap = {
  [SensorStatus.online]: 'Online',
  [SensorStatus.warnings]: 'Online',
  [SensorStatus.offline]: 'Offline',
};

export const StatusColorMap = {
  [SensorStatus.online]: 'GREEN',
  [SensorStatus.warnings]: 'ORANGE',
  [SensorStatus.offline]: 'RED',
};

export interface Sensor {
  id: string;
  type: SensorType;
  status: SensorStatus;
  unit: string;
}

export interface Room {
  id: string;
  name: string;
  sensors: Sensor[];
  plants: Plant[];
  avatar: Avatar;
}

export interface Plant {
  id: string;
  room: Room;
  name: string;
  mood: Mood;
  plantedDate: Date;
  specification: PlantSpecification;
}

export interface PlantExtended extends Plant {
  hasNotification?: boolean;
}

export interface PlantSpecification {
  temperature: { start: number; end: number };
  humidity: { start: number; end: number };
  soil: { start: number; end: number };
  brightness: { start: number; end: number };
}

export interface Reading {
  sensor: Sensor;
  createdAt: Date;
  value: number;
}

export interface Notification {
  timestamp: Date;
  plant: Plant;
  text: string;
  sensor: Sensor;
  value: number;
}
