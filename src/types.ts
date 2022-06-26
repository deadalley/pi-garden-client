import images from './images';
import ReadingResource from './resources/reading';

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
  bedroom2 = 'dressing-table',
  bedroom3 = 'bed',
  bedroom4 = 'bed4',
  bedroom5 = 'full-length-mirror',
  bedroom6 = 'bedside-table1',
  bedroom7 = 'bunk-bed',
  chair = 'chair',
  diningRoom = 'table',
  diningRoom2 = 'chair1',
  diningRoom3 = 'table1',
  diningRoom4 = 'chandelier',
  garden = 'vase',
  garden2 = 'vase1',
  kitchen = 'dinning-table',
  livingRoom = 'armchair',
  livingRoom2 = 'ceiling-lamp',
  livingRoom3 = 'tv-set',
  livingRoom4 = 'chair2',
  livingRoom5 = 'curtain',
  livingRoom6 = 'painting',
  livingRoom7 = 'pillow',
  office = 'office-chair',
  office2 = 'stool',
  office3 = 'computer-desktop',
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

export interface RoomExtended extends Room {
  lastReadings: LastReadings;
}

export interface Plant {
  id: string;
  room: string;
  name: string;
  // mood: Mood;
  plantedDate: Date;
  specification: PlantSpecification;
  notifications?: Notification[];
  image: keyof typeof images.plants;
}

export interface ExtendedPlant extends Plant {
  roomName: string;
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

export type PartialPlantSpecification = {
  [key in keyof PlantSpecification]: { start: number; end: number };
};

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

export enum NotificationSettingsOption {
  all = 'all',
  threshold = 'threshold',
  none = 'none',
}

export interface LastReadings {
  [SensorType.brightness]: ReadingResource;
  [SensorType.humidity]: ReadingResource;
  [SensorType.soil]: ReadingResource;
  [SensorType.temperature]: ReadingResource;
}
