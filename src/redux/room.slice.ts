import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LastReadings, RoomExtended } from '../types';

interface OnboardingState {
  rooms: RoomExtended[];
}

const initialState: OnboardingState = {
  rooms: [],
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomLastReadings: (state: OnboardingState, action: PayloadAction<LastReadings>) => {
      const key: keyof LastReadings = Object.keys(action.payload)[0] as keyof LastReadings;
      const roomId = action.payload[key].sensor.room;

      if (!state.rooms.length) {
        state.rooms = [{ id: roomId, lastReadings: action.payload } as RoomExtended];
        return;
      }

      const index = state.rooms.findIndex(({ id }) => id === roomId);
      state.rooms.splice(index, 1, {
        ...state.rooms[index],
        lastReadings: action.payload,
      });
    },
  },
});

export const { setRoomLastReadings } = roomSlice.actions;

export default roomSlice.reducer;
