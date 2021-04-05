import { createIconSetFromIcoMoon } from '@expo/vector-icons';

export const EmojiIcon = createIconSetFromIcoMoon(
  require('../../assets/fonts/emoji.json'),
  'Emoji',
  'emoji.ttf'
);

export const FurnitureIcon = createIconSetFromIcoMoon(
  require('../../assets/fonts/furniture-icons.json'),
  'FurnitureIcons',
  'furniture-icons.ttf'
);

export const NatureIcon = createIconSetFromIcoMoon(
  require('../../assets/fonts/nature-icons.json'),
  'NatureIcons',
  'nature-icons.ttf'
);

export const PlantIcon = createIconSetFromIcoMoon(
  require('../../assets/fonts/plant-icons.json'),
  'PlantIcons',
  'plant-icons.ttf'
);

export const UiIcon = createIconSetFromIcoMoon(
  require('../../assets/fonts/uicons.json'),
  'Uicons',
  'uicons.ttf'
);

export const WeatherIcon = createIconSetFromIcoMoon(
  require('../../assets/fonts/weather-icons.json'),
  'WeatherIcons',
  'weather-icons.ttf'
);
