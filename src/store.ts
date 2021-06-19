import { configureStore } from '@reduxjs/toolkit';

import onboardingReducer from './redux/onboarding.slice';
import roomsReducer from './redux/room.slice';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    rooms: roomsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
