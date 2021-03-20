export enum Mood {
  happy = 'happy',
  sad = 'sad',
}

export interface Room {
  name: string;
}

export interface Plant {
  id: string;
  room: Room;
  name: string;
  mood: Mood;
}
