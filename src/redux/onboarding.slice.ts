import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SessionService } from '../services/session.service';

interface OnboardingState {
  onboardingComplete: boolean;
}

const initialState: OnboardingState = {
  onboardingComplete: false,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnboardingComplete: (state: OnboardingState, action: PayloadAction<boolean>) => {
      state.onboardingComplete = action.payload;
      SessionService.storeItem('onboardingComplete', action.payload);
    },
  },
});

export const { setOnboardingComplete } = onboardingSlice.actions;

export default onboardingSlice.reducer;
